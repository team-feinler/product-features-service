const app = require('./index.js');

const port = 4000;

app.listen(port, () => {
  console.log (`Listening on port ${port}`);
});
