# old-js-dependency-analysis

分析基于全局变量方式进行模块拆分的老代码的文件模块依赖关系

## 老代码示例

简单拆分出的公共模块，通过全部变量方式暴露接口：

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

```javascript
// page/index.js
EventUtil.addEvent(document.getElementById('btnSubmit'), 'click', function () {
  // ...
  CookieUtil.set('userName', userName)
})
```

## 依赖关系分析

基于全局变量的模块拆分，对于分析模块依赖关系较为困难，通常需要人工进行判断。

如果需要对已有的老代码进行重构，文件之间的依赖关系可以作为一个重要的参考。

本项目的目标是提供一个自动化的工具，用于分析老代码工程下的文件模块依赖关系。

## 用法

示例：
```hash
node index test
```

## 测试

```hash
npm test
```