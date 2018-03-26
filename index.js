const express = require('express');
require('./services/passport');

const app = express();

//single line to require the function in the authRoutes file, return it and call it immediately with the app argument
require('./routes/authRoutes')(app);

//Dynamic port binding
//telling node to listen to  PORT variable OR 5000 if PORT is not set
const PORT = process.env.PORT || 5000;

app.listen(PORT);
