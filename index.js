#!/usr/bin/env node

const path = require('path');
const { existsSync } = require('fs');
const spawnComponent = require('./spawnComponent');

const args = process.argv.slice(2);
const appDir = process.env.PWD;
const baseOutDir = path.join(appDir, 'src', 'components');
const appPackage = path.join(appDir, 'package.json');

if (!existsSync(appPackage)) {
  const { name } = require('./package.json');
  console.error(`Please run ${name} from your app root`);
  process.exit(1);
}

if (args.length === 0) {
  console.error('You have to provide a name for at least one component');
  process.exit(1);
}

const templateDir = [
  path.join(appDir, '.spawn-templates'),
  path.join(__dirname, 'default-templates'),
].find(existsSync);

if (templateDir == null) {
  console.error('Template directory not found');
  process.exit(1);
}

for (const arg of args) {
  spawnComponent({
    componentName: arg,
    templateDir,
    baseOutDir,
  });
}
