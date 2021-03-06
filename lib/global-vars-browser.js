module.exports = [
  /*
   * from
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
   * exclude objects may not be used in old js code
   */
  "Infinity",
  "NaN",
  "undefined",
  "null",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape",
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError",
  "Number",
  "Math",
  "Date",
  "String",
  "RegExp",
  "Array",
//"JSON"

  /*
   * https://developer.mozilla.org/en-US/docs/Web/API/Window
   */
  "applicationCache",
  "caches",
  "closed",
  //"controllers",
  "crypto",
  "defaultStatus",
  "devicePixelRatio",
  "dialogArguments",
  "directories",
  "document",
  "frameElement",
  "frames",
  "fullScreen",
  "history",
  "indexedDB",
  "innerHeight",
  "innerWidth",
  "isSecureContext",
  "length",
  "localStorage",
  "location",
  "locationbar",
  "menubar",
  "messageManager",
  "mozAnimationStartTime",
  "mozInnerScreenX",
  "mozInnerScreenY",
  "mozPaintCount",
  "name",
  "navigator",
  "onabort",
  "onafterprint",
  "onbeforeprint",
  "onbeforeunload",
  "onblur",
  "onchange",
  "onclick",
  "onclose",
  "oncontextmenu",
  "ondblclick",
  "ondevicelight",
  "ondevicemotion",
  "ondeviceorientation",
  "ondeviceorientationabsolute",
  "ondeviceproximity",
  "ondragdrop",
  "onerror",
  "onfocus",
  "onhashchange",
  "oninput",
  "oninstall",
  "onkeydown",
  "onkeypress",
  "onkeyup",
  "onlanguagechange",
  "onload",
  "onmousedown",
  "onmousemove",
  "onmouseout",
  "onmouseover",
  "onmouseup",
  "onmozbeforepaint",
  "onpaint",
  "onpointercancel",
  "onpointerdown",
  "onpointerenter",
  "onpointerleave",
  "onpointermove",
  "onpointerout",
  "onpointerover",
  "onpointerup",
  "onpopstate",
  "onrejectionhandled",
  "onreset",
  "onresize",
  "onscroll",
  "onselect",
  "onselectstart",
  "onstorage",
  "onsubmit",
  "ontouchcancel",
  "ontouchmove",
  "ontouchstart",
  "onunhandledrejection",
  "onunload",
  "onuserproximity",
  "onvrdisplayconnected",
  "onvrdisplaydisconnected",
  "onvrdisplaypresentchange",
  "opener",
  "outerHeight",
  "outerWidth",
  "parent",
  "performance",
  "personalbar",
  "pkcs11",
  "screen",
  "screenX",
  "screenY",
  "scrollbars",
  "scrollMaxX",
  "scrollMaxY",
  "scrollX",
  "scrollY",
  "self",
  "sessionStorage",
  "sidebar",
  "speechSynthesis",
  "status",
  "statusbar",
  "toolbar",
  "top",
  "URL",
  "window",

  // others find at browser console
  "event",
  "clientInformation",
  "screenTop",
  "offscreenBuffering",
  "screenLeft",
  "onmessage",
  "external",
  "console",
  "$0",
  "$1",
  "$2",
  "$3",
  "$4",
  "dir",

  // more...
  "ActiveXObject",
  "alert",
  "confirm",
  "XMLHttpRequest",
  "open",
  "close",
  "setTimeout",
  "clearTimeout",
  "setInterval",
  "clearInterval"
]