const router = require('express').Router();
const fs = require('fs');

// GET
router.get('/*', (req, res, next) => {
  try {
    const splitUrl = req.originalUrl.split('/');
    const file = splitUrl[3];
    const folder = splitUrl[2];

    const fileStream = fs.createReadStream(__dirname + `/../storage/${folder}/${file}`);
    res.setHeader('Content-type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment');

    fileStream.on('close', function() {
      fileStream.destroy();
    });

    fileStream.pipe(res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
