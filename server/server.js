const express = require('express');
const BodyParser = require('body-parser');

//const product = require('./routes/routes');
const app = express();

//app.use('/products', product);

app.get("/", (req, res) => {
  res.json({ message: "xi wo de niu zi" });
});

let port = 1234;

app.listen(port, ()=> {
  console.log('Server is up on' + port);
})
