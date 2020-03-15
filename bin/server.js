const app = require('../app.js');

app.listen(3000, '', () => {
  console.log(`Server start on localhost:3000`);
});

process.on('unhandledRejection', (err) => {
  if (err) {
    console.log(err);
  }
});

process.on('rejectionHandled', (err) => {
  if (err) {
    console.log(err);
  }
});

process.on('uncaughtException', (err) => {
  if (err) {
    console.log(err);
  }
});
