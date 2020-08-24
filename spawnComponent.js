const path = require('path');
const {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} = require('fs');

const red = str =>
  `\x1b[31m${str}\x1b[0m`;

const blue = str =>
  `\x1b[36m${str}\x1b[0m`;

const capitalize = str =>
  str[0].toUpperCase() + str.slice(1);

const isComponentName = name =>
  /^[A-Z][A-Za-z0-9]*$/.test(name);

const render = (str, env) =>
  str.replace(/__([A-Za-z][A-Za-z0-9_]*)__/g, (match, p1) =>
    env[p1] == null ? match : env[p1]
  );

const spawnFile = ({ outDir, templateDir, templateName }, env) => {
  const outFileName = path.join(outDir, render(templateName, env));
  const outContent = readFileSync(path.join(templateDir, templateName));

  writeFileSync(outFileName, render(outContent.toString(), env));
};

module.exports = ({ componentName, templateDir, baseOutDir }) => {
  // Map 'name' -> 'Name'
  // Note that 'index' is excluded too
  const name = capitalize(componentName);

  if (!isComponentName(name)) {
    return console.error('Invalid component name %s', red(name));
  }

  const outDir = path.join(baseOutDir, name);

  if (existsSync(outDir)) {
    return console.error('%s component already exists', red(name));
  }

  mkdirSync(outDir, { recursive: true });

  readdirSync(templateDir).forEach(templateName =>
    spawnFile({ outDir, templateDir, templateName }, { name })
  );

  console.log('%s component was created successfully', blue(name));
};
