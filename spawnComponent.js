const path = require('path')
const { existsSync, mkdirSync, readdirSync } = require('fs')

const { red, blue, capitalize, isComponentName, spawnFile } = require('./utils')

module.exports = ({ componentName, templateDir, baseOutDir }) => {
  // Map 'name' -> 'Name'
  // Note that 'index' is excluded too
  const name = capitalize(componentName)

  if (!isComponentName(name)) {
    return console.error('Invalid component name %s', red(name))
  }

  const outDir = path.join(baseOutDir, name)

  if (existsSync(outDir)) {
    return console.error('%s component already exists', red(name))
  }

  mkdirSync(outDir, { recursive: true })

  readdirSync(templateDir).forEach(templateName =>
    spawnFile({ outDir, templateDir, templateName }, { name })
  )

  console.log('%s component was created successfully', blue(name))
}
