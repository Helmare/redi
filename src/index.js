require('dotenv').config();
const express = require('express');

// Setup app
const app = express();
app.use(require('helmet')());

// Setup redirects.


// Fallback
app.use((req, res) => {
  res.redirect('https://hazdryx.me');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to PORT: ${port}`);
});