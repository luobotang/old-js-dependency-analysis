window.addEventListener('DOMContentLoaded', function (e) {

	function ResultsView(el) {
		this.el = el || document.querySelector('.results-container')
		this.initEvents()
	}

	ResultsView.prototype.initEvents = function () {
		this.el.addEventListener('click', function (e) {
			var target = e.target
			if (target.matches('a[href^="#"]')) {
				// try to scroll target element to the center of visible area
				var elTarget = document.getElementById(target.href.substr(1))
				if (elTarget) {
					if (elTarget.scrollIntoViewIfNeeded) {
						elTarget.scrollIntoViewIfNeeded(true)
						return false
					} else if (elTarget.scrollIntoView) {
						elTarget.scrollIntoView()
						return false
					} else {
						// let the browser do the scroll
					}
				}
			} else {
				while (target && target !== this) {
					if (target.matches('.result-group__head')) {
						target.parentNode.classList.toggle('hide-result-group-body')
						break
					} else if (target.matches('.result__head')) {
						target.parentNode.classList.toggle('result-detail-show')
						break
					}
					target = target.parentNode
				}
			}
		})
	}

	function VarSearchView(el) {
		this.el = el || document.querySelector('.var-search-container')
		this.initEvents()
		this.initData()
	}

	VarSearchView.prototype.initData = function () {
		try {
			this.vars = JSON.parse(document.querySelector('#link-result-vars').innerHTML)
		} catch (e) {
			this.vars = {}
		}
		
		try {
			this.unresolvedVars = JSON.parse(document.querySelector('#link-result-unresolved-vars').innerHTML)
		} catch (e) {
			this.unresolvedVars = []
		}
	}

	VarSearchView.prototype.initEvents = function () {
		var _this = this
		this.el.querySelector('input').addEventListener('keydown', function (e) {
			if (e.key === 'Enter') {
				_this.search(this.value.trim())
			}
		})
	}

	VarSearchView.prototype.search = function (name) {
		var elMatchedVars = this.el.querySelector('.matched-vars')
		if (this.unresolvedVars.indexOf(name) > -1) {
			elMatchedVars.innerHTML = this.renderUnressolvedVar(name)
		} else if (this.vars[name]) {
			elMatchedVars.innerHTML = this.renderVarFiles(this.vars[name])
		} else if (name === '') {
			elMatchedVars.innerHTML = ''
		} else {
			elMatchedVars.innerHTML = this.renderEmptyMatched(name)
		}
	}

	VarSearchView.prototype.renderUnressolvedVar = function (name) {
		return (
			'<li class="message">' +
				'变量 ' + name + ' 未定义，但已在文件中使用' +
			'</li>'
		)
	}

	VarSearchView.prototype.renderVarFiles = function (varsFiles) {
		return varsFiles.map(function (file) {
			return (
			'<li>' +
				'<a href="#' + fileNameToAchorName(file) + '">' + file + '</a>' +
			'</li>'
			)
		}).join('')
	}

	VarSearchView.prototype.renderEmptyMatched = function (name) {
		return (
			'<li class="message">' +
				'变量 ' + name + ' 未使用' +
			'</li>'
		)
	}

	/* helpers */

	function findClosest(el, selector) {
		while (el) {
			if (el.matches && el.matches(selector)) {
				return el
			}
			el = el.parentNode
		}
		return null
	}

	function fileNameToAchorName(fileName) {
		return 'file_' + fileName.replace(/\\/g, '_').replace(/\.js$/, '')
	}

	/* main */

	new ResultsView()
	new VarSearchView()

}, false)