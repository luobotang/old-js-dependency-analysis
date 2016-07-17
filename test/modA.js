var modA = {
  foo: function () {console.log('from a...')}
}

var numA = 1.0

addEvent($gid('box'), 'click', function () {
  modA.foo()
})