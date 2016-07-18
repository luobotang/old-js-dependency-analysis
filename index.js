var fs = require('fs')
var path = require('path')
var analyze = require('./lib/analyze')
var link = require('./lib/link')
var renderer = require('./lib/renderer')

var DEFAULT_OPTIONS = {
  deep: true, // go to sub directory
  out: 'html',
  exclude: null,
  maxFileSize: 0 // in KB, 0 => no limit
}

var args = process.argv.slice(2)
var root = args[0]

if (root) {
  var options
  try {
    options = require(path.join(root, 'analysis.config'))
  } catch (e) {
    // ignore
  }
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  var results = analyzeAllJsFile(root, options)
  var linkResult = link(results)
  if (options.out === 'html') {
    fs.writeFileSync('out/results.html', renderer.renderHTML(linkResult))
  } else if (options.out === 'json') {
    fs.writeFileSync('out/results.json', renderer.renderJSON(linkResult))
  } else {
    console.log(results)
  }
} else {
  console.error('require root path')
}

/*
 * @param {string} root - root directory path for analyze
 * @params {object} options - config options
 */
function analyzeAllJsFile(root, options) {
  var ret = []
  var exclude = options.exclude
  var maxFileSize = options.maxFileSize
  fs.readdirSync(root).forEach(function (file) {
    var filePath = path.join(root, file)
    
    if (!isFileExclude(filePath, exclude)) {
      var stats = fs.statSync(filePath)
      if (stats.isDirectory(filePath)) {
        if (options.deep) {
          ret = ret.concat(analyzeAllJsFile(filePath, options))
        }
      } else if (stats.isFile()) {
        if (
          path.extname(filePath) === '.js' &&
          (maxFileSize === 0 || stats.size / 1024 < maxFileSize)
        ) {
          try {
            ret.push(analyze(fs.readFileSync(filePath), filePath))
          } catch (e) {
            console.error('file: ' + filePath)
            console.error(e)
          }
        }
      }
    }
  })
  return ret
}

function isFileExclude(filePath, exclude) {
  if (exclude && exclude.length) {
    return exclude.find(function (pattern) {
      if (typeof pattern === 'string') {
        return filePath.indexOf(pattern) > -1
      }
      else if (pattern instanceof RegExp) {
        return pattern.test(filePath)
      }
    })
  } else {
    return false
  }
}