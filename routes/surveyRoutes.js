const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); //integrated in nodejs

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('Survey');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false })
      .sort({
        lastResponded: 'desc',
        dateSent: 'desc'
      });
    res.send(surveys);
  });
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });
  //the string google is set in the Passport-Google Strategy
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const recipNumber = recipients.split(',').length;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //Email sending
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= recipNumber;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err.message);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    // const events = _.map(req.body, event => {
    //   const match = p.test(new URL(event.url).pathname);
    //   if (match) {
    //     return {
    //       email: event.email,
    //       surveyId: match.surveyId,
    //       choice: match.choice
    //     };
    //   }
    // });
    // const compactEvents = _.compact(events);
    // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

    //using the chain function defined inside lodash that allows to put a series of operations together without having to specify the object that has to be operated on
    _.chain(req.body)
      .map(event => {
        const pathname = new URL(event.url).pathname;
        const match = p.test(pathname);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            //ES6 key interpolation: [choice] means that js engine will decide on the fly if incrementing the yes or no property
            $inc: { [choice]: 1 },
            //the $ matches with the $elemMatch used in the query
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });
};
