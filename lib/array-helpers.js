exports.unionByReduce = function (ret, val) {
  if (ret.indexOf(val) === -1) {
    ret.push(val)
  }
  return ret
}

exports.diff = function (arr1, arr2) {
  var items_only_in_1
  var items_only_in_2

  items_only_in_1 = arr1.filter(function (i) {
    return arr2.indexOf(i) === -1
  })

  items_only_in_2 = arr2.filter(function (i) {
    return arr1.indexOf(i) === -1
  })

  return [items_only_in_1, items_only_in_2]
}