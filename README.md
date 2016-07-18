# old-js-dependency-analysis

分析基于全局变量方式进行模块拆分的老代码的文件模块依赖关系

## 老代码示例

简单拆分出的公共模块文件，通过全局变量方式暴露接口：

```javascript
// module/EventUtil.js
var EventUtil = {}
EventUtil.addEvent = function (el, event, handler) {
  // ...
}
EventUtil.removeEvent = function (el, event, handler) {
  // ...
}
```

```javascript
// module/CookieUtil.js
var CookieUtil = {}
CookieUtil.set = function () {
  // ...
}
CookieUtil.remove = function () {
  // ...
}
```

页面代码通过全局变量引用模块：

```javascript
// page/index.js
EventUtil.addEvent(document.getElementById('btnSubmit'), 'click', function () {
  // ...
  CookieUtil.set('userName', userName)
})
```

## 依赖关系分析

基于全局变量的模块拆分，对于自动分析模块依赖关系较为困难，通常需要人工进行判断。如果需要对已有的老代码项目进行重构，文件之间的依赖关系可以作为一个重要的参考。

本项目的目标是提供一个自动化的工具，用于分析老代码项目下的文件模块依赖关系。

## 用法

示例：
```hash
node index test
```

分析结果在 ```out/results.html``` 中。

## 测试

```hash
npm test
```