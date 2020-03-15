const router = require('express').Router();
const svgr = require('@svgr/core').default;
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const archiver = require('archiver');
const fs = require('fs');
const uuid = require('uuid').v4;

// POST
router.post('/', async ({ files }, res, next) => {
  try {
    const svgElements = files.map(({ buffer, originalname }) => ({
      name: originalname.slice(0, -4),
      code: buffer.toString(),
    }));

    const fileExt = 'jsx';

    const results = svgElements.map(({ code, name }) => ({
      name,
      code: svgr.sync(
        code,
        { icon: true },
        { componentName: upperFirst(camelCase(name)) },
      ),
    }));

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    const id = uuid();
    fs.mkdirSync(__dirname + `../../storage/${id}`);
    const output = fs.createWriteStream(__dirname + `../../storage/${id}/svg-to-react.zip`);

    archive.on('finish', () => {
      console.log(`Success archived: ${archive.pointer()} bytes`);
    });

    archive.pipe(output);

    results.forEach(({ name, code }) => {
      archive.append(Buffer.from(code), { name: `${name}.${fileExt}` });
    });
    archive.finalize();

    res.status(200).json({path: `/download/${id}/svg-to-react.zip`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
