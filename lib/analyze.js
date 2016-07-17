var esprima = require('esprima')
var escope = require('escope')

var GlobalVarsInBrowser = require('./global-vars-browser')
var helpers = require('./array-helpers')

module.exports = analyze

/*
 * @type AnalysisResult
 * @property {string} file
 * @property {string[]} defineVars
 * @property {string[]} requireVars
 */

/*
 * @param {string} code - JS src code
 * @param {string} file - filename
 * @return {AnalysisResult}
 */
function analyze(code, file) {
  var ast = esprima.parse(code)
  var scopeManager = escope.analyze(ast, {ignoreEval: true})
  var globalScope = scopeManager.acquire(ast)

  var defineVars = (globalScope.variables || []).map(function (v) {
    return v.name
  }).sort()

  var usedVars = (globalScope.through || []).map(function (ref) {
    return ref.identifier.name
  }).reduce(helpers.unionByReduce, []).filter(excludeGlobalVars).sort()

  var requireVars = helpers.diff(defineVars, usedVars)[1]

  return {
    file: file,
    defineVars: defineVars,
    requireVars: requireVars
  }
}

// used in arr.filter()
function excludeGlobalVars(value) {
  return GlobalVarsInBrowser.indexOf(value) === -1
}