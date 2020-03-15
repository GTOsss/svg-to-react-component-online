const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const routes = require('./routers');
const multer = require('multer');
const upload = multer();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(upload.array('images', 100));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/upload', routes.upload);
app.use('/download', routes.download);

// 404
app.use((req, res) => {
  res.status(404).send({
    message: 'Page not found',
  });
});

// Express error handling
// eslint-disable-next-line
app.use((err, req, res, next) => { // TODO почему сюда не проваливается ошибка
  console.log(err);
  return res.status(500).json({
    description: 'Internal server error',
    err,
  });
});

module.exports = app;
