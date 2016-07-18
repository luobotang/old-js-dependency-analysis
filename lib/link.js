var helpers = require('./array-helpers')

/*
 * 将有潜在全局变量依赖关系的文件进行标记
 * 例如，文件A声明了全局变量a，而文件B中未声明全局变量a就进行了使用，视为文件B依赖文件A。
 */

/*
 * @param {AnalysisResult[]} results - AnalysisResult defiended at analyze.js
 */
module.exports = function (results) {
  var vars_exports_files = {}
  var unresolvedVars = []

  // 将各个文件的 defineVars 进行标记
  results.forEach(function (result) {
    result.defineVars.forEach(function (_var) {
      var exports_files = vars_exports_files[_var] || (vars_exports_files[_var] = [])
      exports_files.push(result.file)
    })
  })

  // 遍历各个文件的 requireVars，将其所在的文件记录到依赖文件列表中
  results.forEach(function (result) {
    result.requireFiles = []
    result.unresolvedVars = []
    result.requireVars.forEach(function (_var) {
      var exports_files = vars_exports_files[_var]
      if (exports_files) {
        result.requireFiles = result.requireFiles.concat(exports_files)
      } else {
        result.unresolvedVars.push(_var)
        unresolvedVars.push(_var)
      }
    })

    result.requireFiles = result.requireFiles.reduce(helpers.unionByReduce, [])
  })

  return {
    results: results,
    vars: vars_exports_files,
    unresolvedVars: unresolvedVars.reduce(helpers.unionByReduce, []).sort()
  }
}