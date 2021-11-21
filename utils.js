const path = require('path')
const { readFileSync, writeFileSync } = require('fs')

const render = (str, env) =>
  str.replace(/__([A-Za-z][A-Za-z0-9_]*)__/g, (match, p1) =>
    env[p1] == null ? match : env[p1]
  )

module.exports = {
  red: str => {
    return `\x1b[31m${str}\x1b[0m`
  },

  blue: str => {
    return `\x1b[36m${str}\x1b[0m`
  },

  capitalize: str => {
    return str[0].toUpperCase() + str.slice(1)
  },

  isComponentName: name => {
    return /^[A-Z][A-Za-z0-9]*$/.test(name)
  },

  isHookName: name => {
    return /^[A-Za-z][A-Za-z0-9]*$/.test(name)
  },

  spawnFile: ({ outDir, templateDir, templateName }, env) => {
    const outFileName = path.join(outDir, render(templateName, env))
    const outContent = readFileSync(path.join(templateDir, templateName))

    writeFileSync(outFileName, render(outContent.toString(), env))
  },
}
