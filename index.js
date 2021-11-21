#!/usr/bin/env node

const path = require('path')
const { existsSync } = require('fs')
const spawnComponent = require('./spawnComponent')
const spawnHook = require('./spawnHook')

const args = require('minimist')(process.argv.slice(2))
const appDir = process.env.PWD
const baseOutDir = path.join(appDir, 'src', 'components')
const hookOutDir = path.join(appDir, 'src', 'hooks')
const appPackage = path.join(appDir, 'package.json')

if (!existsSync(appPackage)) {
  const { name } = require('./package.json')
  console.error(`Please run ${name} from your app root`)
  process.exit(1)
}

if (args.length === 0) {
  console.error('You have to provide a name for at least one component')
  process.exit(1)
}

const templateDir = [
  path.join(appDir, '.spawn-templates'),
  path.join(__dirname, 'default-templates'),
].find(existsSync)

const hookTemplateDir = [
  path.join(appDir, '.spawn-templates-hooks'),
  path.join(__dirname, 'default-hook-template'),
].find(existsSync)

if (templateDir == null) {
  console.error('Template directory not found')
  process.exit(1)
}

if (hookTemplateDir == null) {
  console.error('Hook template directory not found')
  process.exit(1)
}

if (args.h) {
  if (!args._.length && typeof args.h !== 'string') {
    return console.error('You need to provide a name for your hook!')
  }

  if (!args._.length && typeof args.h === 'string') {
    spawnHook({
      hookName: args.h,
      outDir: hookOutDir,
      templateDir: hookTemplateDir,
    })
  }

  for (const arg of args._) {
    spawnHook({
      hookName: arg,
      outDir: hookOutDir,
      templateDir: hookTemplateDir,
    })
  }
} else {
  if (!args._.length)
    return console.error('You need to provide a name for your component!')

  for (const arg of args._) {
    spawnComponent({
      componentName: arg,
      templateDir,
      baseOutDir,
    })
  }
}
