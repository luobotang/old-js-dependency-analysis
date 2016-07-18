window.addEventListener('DOMContentLoaded', function (e) {

	function ResultsView(el) {
		this.el = el || document.querySelector('.results-container')
		this.initEvents()
	}

	ResultsView.prototype.initEvents = function () {
		this.el.addEventListener('click', function (e) {
			if (e.target.tagName === 'A' && e.target.href) {
				// do nothing
			} else {
				var elResult = findClosest(e.target, '.result')
				if (elResult) {
					elResult.classList.toggle('result-detail-show')
				}
			}
		})
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

	/* main */

	new ResultsView()

}, false)