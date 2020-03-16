const path = require('path');
const router = require('express').Router();
const svgr = require('@svgr/core').default;
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const lowerCase = require('lodash/lowerCase');
const kebabCase = require('lodash/kebabCase');
const archiver = require('archiver');
const fs = require('fs');
const uuid = require('uuid').v4;
const { createIndexFile, createDemoHtml } = require('../utils/code-generator');

// POST
router.post('/', async ({ files, body }, res, next) => {
  try {
    const plugins = JSON.parse(body.plugins);
    const settings = JSON.parse(body.settings);
    const additionalSettings = JSON.parse(body.additionalSettings);

    const svgElements = files.map(({ buffer, originalname }) => ({
      name: kebabCase(lowerCase(originalname.slice(0, -4))),
      code: buffer.toString(),
    }));

    const svgrOptions = { ...settings, plugins };

    const results = [];
    const filenames = [];

    svgElements.forEach(({ code, name }) => {
      results.push({
        name,
        code: svgr.sync(code, svgrOptions, { componentName: upperFirst(camelCase(name)) }),
      });
      filenames.push(name);
    });

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    const id = uuid();
    fs.mkdirSync(__dirname + `../../storage/${id}`);
    const pathToStorage = path.resolve(__dirname + `/../../storage/${1}/svg-to-react.zip`);
    const output = fs.createWriteStream(pathToStorage);

    archive.on('finish', () => {
      console.log(`Success archived: ${archive.pointer()} bytes`);
    });

    archive.pipe(output);

    const fileExtension = JSON.parse(body.settings).ext;

    results.forEach(({ name, code }) => {
      archive.append(Buffer.from(code), { name: `${name}.${fileExtension}` });
    });
    if (additionalSettings.generateIndexFile) {
      archive.append(Buffer.from(createIndexFile(filenames)), { name: `index.${fileExtension}` });
    }
    if (additionalSettings.generateDemo) {
      archive.append(Buffer.from(createDemoHtml(svgElements)), { name: 'demo.html' });
    }

    archive.finalize();

    res.status(200).json({ path: `/download/${id}/svg-to-react.zip` });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
