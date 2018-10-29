const app = require('./app');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server listening on port", PORT);
});
