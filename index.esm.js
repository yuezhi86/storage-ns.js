function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function a(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=r(e);if(t){var a=r(this).constructor;n=Reflect.construct(o,arguments,a)}else n=o.apply(this,arguments);return i(this,n)}}var c=function n(r){var o=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";e(this,n),t(this,"set",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;window[o.apiName].setItem(o._getKey(e),JSON.stringify({value:t,updateTime:Date.now(),expireTime:n}))})),t(this,"all",(function(){var e=window[o.apiName];return Object.keys(e).reduce((function(t,n){return o._hasKey(n)&&(t[o._delNamespace(n)]=JSON.parse(e[n])),t}),{})})),t(this,"allValue",(function(){var e=o.all(),t={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=e[n];null!==r&&(t[o._delNamespace(n)]=r.value)}return t})),t(this,"get",(function(e){return JSON.parse(window[o.apiName].getItem(o._getKey(e)))})),t(this,"getValue",(function(e){var t=o.get(e);return null===t?null:t.value})),t(this,"has",(function(e){return!!o.get(e)})),t(this,"delete",(function(e){window[o.apiName].removeItem(o._getKey(e))})),t(this,"clear",(function(){Object.keys(o.all()).forEach((function(e){o.delete(e)}))})),t(this,"expired",(function(e){var t=o.get(e);return null===t?null:t.expireTime>0&&Date.now()>t.expireTime})),t(this,"clearExpired",(function(){var e=0,t=o.all();for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){var r=t[n];null!==r&&r.expireTime>0&&Date.now()>r.expireTime&&(e++,o.delete(n))}return e})),t(this,"_hasKey",(function(e){var t=o.namespace?"^".concat(o.namespace,"\\."):"^".concat(e,"$");return new RegExp(t).test(e)})),t(this,"_getKey",(function(e){return o.namespace?"".concat(o.namespace,".").concat(e):"".concat(e)})),t(this,"_delNamespace",(function(e){return"".concat(e).replace("".concat(o.namespace,"."),"")})),this.apiName=r,this.namespace=i},u=function(t){n(o,c);var r=a(o);function o(t){return e(this,o),r.call(this,"localStorage",t)}return o}(),l=function(t){n(o,c);var r=a(o);function o(t){return e(this,o),r.call(this,"sessionStorage",t)}return o}();export default c;export{u as LocalStorage,l as SessionStorage};
