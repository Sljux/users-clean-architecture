const app = require('./http');

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Listening on port ${port}`);
});
