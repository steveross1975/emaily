const express = require('express');
const app = express();

//route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

//Dynamic port binding
//telling node to listen to  PORT variable OR 5000 if PORT is not set
const PORT = process.env.PORT || 5000;

app.listen(PORT);
