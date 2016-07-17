var fs = require('fs')
var path = require('path')
var analyze = require('./lib/analyze')
var link = require('./lib/link')

var args = process.argv.slice(2)
var root = args[0]

if (root) {
  var results = analyzeAllJsFile(root)
  link(results)
  console.log(JSON.stringify(results, null, 2))
} else {
  console.error('require root path')
}

function analyzeAllJsFile(root) {
  var ret = []
  fs.readdirSync(root).forEach(function (file) {
    var filePath = path.join(root, file)
    var stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      ret = ret.concat(analyzeAllJsFile(filePath))
    } else if (stats.isFile()) {
      if (path.extname(filePath) === '.js') {
        ret.push(analyze(fs.readFileSync(filePath), filePath))
      }
    }
  })
  return ret
}
