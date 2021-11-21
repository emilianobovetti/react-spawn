const { existsSync, mkdirSync, readdirSync } = require('fs')

const { red, blue, capitalize, isHookName, spawnFile } = require('./utils')

module.exports = ({ hookName, templateDir, outDir }) => {
  const capitalizedHookName = capitalize(
    hookName.startsWith('use') ? hookName.slice(3) : hookName
  )

  if (!isHookName(capitalizedHookName)) {
    return console.error('Invalid hook name %s', red(hookName))
  }

  const name = `use${capitalizedHookName}`

  if (existsSync(`${outDir}/${name}.js`)) {
    return console.error('%s hook already exists', red(name))
  }

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true })
  }

  readdirSync(templateDir).forEach(templateName =>
    spawnFile({ outDir, templateDir, templateName }, { name })
  )

  console.log('%s hook was created successfully', blue(name))
}
