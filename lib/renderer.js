exports.renderJSON = function (results) {
	return JSON.stringify(results, null, '  ')
}

exports.renderHTML = function (results) {
	return (
	'<!doctype html>' +
	'<html>' +
	'<head>' +
		'<meta charset="UTF-8">' +
		'<title>文件依赖关系分析</title>' +
		'<link rel="stylesheet" type="text/css" href="../asserts/style.css">' +
	'</head>' +
	'<body>' +
		'<div class="results-container">' +
			'<div class="results-box">' +
				groupResults(results).map(renderGroup).join('') +
			'</div>' +
		'</div>' +
		'<script src="../asserts/results.js"></script>' +
	'</body>' +
	'</html>'
	)
}

function groupResults(results) {
	var groups = []
	var groups_map = {}

	results.forEach(function (result) {
		var path = parseFilePath(result.file)
		var directory = path.directory
		result.fileName = path.fileName
		var group = groups_map[directory]
		if (!group) {
			group = groups_map[directory] = []
			group.directory = directory
			groups.push(group)
		}
		group.push(result)
	})

	return groups
}

function renderGroup(group) {
	var directory = group.directory
	return (
	'<div class="result-group">' +
		'<div class="result-group__head">' +
			directory +
		'</div>' +
		'<div class="result-group__body">' +
			group.map(function (result) {
				return renderResult(result)
			}).join('') +
		'</div>' +
	'</div>'
	)
}

function renderResult(result) {
	var requiredFilesCount = result.requireFiles.length
	var requireVarsCount = result.requireVars.length
	var defineVarsCount = result.defineVars.length
	var unresolvedVarsCount = result.unresolvedVars.length
	return (
	'<div class="result">' +
		'<a id="' + fileNameToAchorName(result.file) + '">' + result.fileName + '</a>' +
		'<span class="count">' +
			'(' +
			requiredFilesCount + ', ' +
			requireVarsCount + ', ' +
			defineVarsCount +
			')' +
		'</span>' +
		(
		requireVarsCount ?
		'<div class="result-detail-item">' +
			'<span class="label">require vars:</span>' +
			result.requireVars.join(', ') +
		'</div>' : ''
		) +
		(
		defineVarsCount ?
		'<div class="result-detail-item">' +
			'<span class="label">define vars:</span>' +
			result.defineVars.join(', ') +
		'</div>' : ''
		) +
		(
		unresolvedVarsCount ?
		'<div class="result-detail-item">' +
			'<span class="label">unresolved vars:</span>' +
			result.unresolvedVars.join(', ') +
		'</div>' : ''
		) +
		(
		requiredFilesCount ?
		'<div class="result-detail-item">' +
			'<span class="label">required files:</span>' +
			'<ul>' +
				result.requireFiles.map(function (file) {
					return (
					'<li>' +
						'<a href="#' + fileNameToAchorName(file) + '">' + file + '</a>' +
					'</li>'
					)
				}).join('') +
			'</ul>' +
		'</div>':
		''
		) +
	'</div>'
	)
}

function fileNameToAchorName(fileName) {
	return 'file_' + fileName.replace(/\\/g, '_').replace(/\.js$/, '')
}

function parseFilePath(file) {
	var i = file.lastIndexOf('\\')
	if (i > -1) {
		return {
			directory: file.substr(0, i),
			fileName: file.substr(i + 1)
		}
	} else {
		return {
			directory: '.',
			fileName: file
		}
	}
}