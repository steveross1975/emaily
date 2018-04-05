const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const keys = require('../config/keys');

//each time a class is call with the new keyword, the first function that is executed is the constructor

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super(); //es2015 classes

    this.sgApi = sendgrid(keys.sendgridKey);
    this.from_email = new helper.Email('no-reply@emaily.com'); //specific sendgrid property
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //built-in function in the helper.Mail class
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);

    return response;
  }
}

module.exports = Mailer;
