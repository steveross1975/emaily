const fs = require('fs');
const http = require('http');
const https = require('https');

const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const privateKey = fs.readFileSync('config/privatekey.key', 'utf8');
const certificate = fs.readFileSync('config/certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
mongoose.connect(keys.mongoURI);

const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

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

//Dynamic port binding
//telling node to listen to  PORT variable OR 5000 if PORT is not set
const INSECPORT = process.env.PORT || 5000;
const SECPORT = process.env.PORT || 5443;

//app.listen(PORT);
httpServer.listen(INSECPORT);
httpsServer.listen(SECPORT);
