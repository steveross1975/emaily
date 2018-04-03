const fs = require('fs');
const http = require('http');
const https = require('https');

const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require('./models/Survey');
require('./models/User');
require('./services/passport');

//const privateKey = fs.readFileSync('config/privatekey.key', 'utf8');
//const certificate = fs.readFileSync('config/certificate.crt', 'utf8');
//const credentials = { key: privateKey, cert: certificate };
mongoose.connect(keys.mongoURI, err => {
  if (err) {
    console.log(
      'Error connecting to DB: ' + keys.mongoURI + ' - Error: ' + err
    );
  } else {
    console.log('Connected to DB');
  }
});
const app = express();
app.enable('trust proxy');
const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days before expiration
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
//single line to require the function in the authRoutes file, return it and call it immediately with the app argument
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets like main.js file
  app.use(express.static('client/build'));

  //Express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Dynamic port binding
//telling node to listen to  PORT variable OR 5000 if PORT is not set
const INSECPORT = process.env.PORT || 5000;
//const SECPORT = process.env.PORT || 5443;

//app.listen(PORT);
httpServer.listen(INSECPORT);
//httpsServer.listen(SECPORT);
