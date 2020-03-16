const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const templatesDemo = require('../helpers/code-templates/demo-html');

const getImportString = (filename, componentName) => `import ${componentName} from './${filename}';\n`;

const createIndexFile = (filenames) => {
  const importStrings = [];
  const exportStrings = [];

  filenames.forEach((filename) => {
    const componentName = upperFirst(camelCase(filename));
    importStrings.push(getImportString(filename, componentName));
    exportStrings.push(`  ${componentName},\n`);
  });

  const imports = importStrings.join('');
  const exports = exportStrings.join('');
  return `${imports}\nexport {\n${exports}};\n`;
};

const createDemoHtml = (svgs) => {
  const { element, html, style } = templatesDemo;
  const elements = svgs.map(({ name, code }) =>
    element({ name: upperFirst(camelCase(name)), svg: code }));
  const elementsString = elements.join('');
  const styleString = style({ backgroundColorScreen: '#f4f4f4' });
  return html({ children: elementsString, style: styleString });
};

module.exports = {
  createIndexFile,
  createDemoHtml,
};
