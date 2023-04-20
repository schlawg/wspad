"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/cash-dom@8.1.2/node_modules/cash-dom/dist/cash.js
  var require_cash = __commonJS({
    "node_modules/.pnpm/cash-dom@8.1.2/node_modules/cash-dom/dist/cash.js"(exports, module) {
      (function() {
        "use strict";
        var doc = document;
        var win = window;
        var docEle = doc.documentElement;
        var createElement = doc.createElement.bind(doc);
        var div = createElement("div");
        var table = createElement("table");
        var tbody = createElement("tbody");
        var tr = createElement("tr");
        var isArray = Array.isArray, ArrayPrototype = Array.prototype;
        var concat = ArrayPrototype.concat, filter = ArrayPrototype.filter, indexOf = ArrayPrototype.indexOf, map = ArrayPrototype.map, push = ArrayPrototype.push, slice = ArrayPrototype.slice, some = ArrayPrototype.some, splice = ArrayPrototype.splice;
        var idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/;
        var classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/;
        var htmlRe = /<.+>/;
        var tagRe = /^\w+$/;
        function find(selector, context) {
          var isFragment = isDocumentFragment(context);
          return !selector || !isFragment && !isDocument(context) && !isElement(context) ? [] : !isFragment && classRe.test(selector) ? context.getElementsByClassName(selector.slice(1).replace(/\\/g, "")) : !isFragment && tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
        }
        var Cash = (
          /** @class */
          function() {
            function Cash2(selector, context) {
              if (!selector)
                return;
              if (isCash(selector))
                return selector;
              var eles = selector;
              if (isString(selector)) {
                var ctx = (isCash(context) ? context[0] : context) || doc;
                eles = idRe.test(selector) && "getElementById" in ctx ? ctx.getElementById(selector.slice(1).replace(/\\/g, "")) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, ctx);
                if (!eles)
                  return;
              } else if (isFunction(selector)) {
                return this.ready(selector);
              }
              if (eles.nodeType || eles === win)
                eles = [eles];
              this.length = eles.length;
              for (var i = 0, l = this.length; i < l; i++) {
                this[i] = eles[i];
              }
            }
            Cash2.prototype.init = function(selector, context) {
              return new Cash2(selector, context);
            };
            return Cash2;
          }()
        );
        var fn = Cash.prototype;
        var cash = fn.init;
        cash.fn = cash.prototype = fn;
        fn.length = 0;
        fn.splice = splice;
        if (typeof Symbol === "function") {
          fn[Symbol["iterator"]] = ArrayPrototype[Symbol["iterator"]];
        }
        function isCash(value) {
          return value instanceof Cash;
        }
        function isWindow(value) {
          return !!value && value === value.window;
        }
        function isDocument(value) {
          return !!value && value.nodeType === 9;
        }
        function isDocumentFragment(value) {
          return !!value && value.nodeType === 11;
        }
        function isElement(value) {
          return !!value && value.nodeType === 1;
        }
        function isBoolean(value) {
          return typeof value === "boolean";
        }
        function isFunction(value) {
          return typeof value === "function";
        }
        function isString(value) {
          return typeof value === "string";
        }
        function isUndefined(value) {
          return value === void 0;
        }
        function isNull(value) {
          return value === null;
        }
        function isNumeric(value) {
          return !isNaN(parseFloat(value)) && isFinite(value);
        }
        function isPlainObject(value) {
          if (typeof value !== "object" || value === null)
            return false;
          var proto = Object.getPrototypeOf(value);
          return proto === null || proto === Object.prototype;
        }
        cash.isWindow = isWindow;
        cash.isFunction = isFunction;
        cash.isArray = isArray;
        cash.isNumeric = isNumeric;
        cash.isPlainObject = isPlainObject;
        function each(arr, callback, _reverse) {
          if (_reverse) {
            var i = arr.length;
            while (i--) {
              if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
            }
          } else if (isPlainObject(arr)) {
            var keys = Object.keys(arr);
            for (var i = 0, l = keys.length; i < l; i++) {
              var key = keys[i];
              if (callback.call(arr[key], key, arr[key]) === false)
                return arr;
            }
          } else {
            for (var i = 0, l = arr.length; i < l; i++) {
              if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
            }
          }
          return arr;
        }
        cash.each = each;
        fn.each = function(callback) {
          return each(this, callback);
        };
        fn.empty = function() {
          return this.each(function(i, ele) {
            while (ele.firstChild) {
              ele.removeChild(ele.firstChild);
            }
          });
        };
        function text(text2) {
          if (isUndefined(text2))
            return this[0] ? this[0].textContent : "";
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            ele.textContent = text2;
          });
        }
        ;
        fn.text = text;
        function extend() {
          var sources = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
          }
          var deep = isBoolean(sources[0]) ? sources.shift() : false;
          var target = sources.shift();
          var length = sources.length;
          if (!target)
            return {};
          if (!length)
            return extend(deep, cash, target);
          for (var i = 0; i < length; i++) {
            var source = sources[i];
            for (var key in source) {
              if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
                if (!target[key] || target[key].constructor !== source[key].constructor)
                  target[key] = new source[key].constructor();
                extend(deep, target[key], source[key]);
              } else {
                target[key] = source[key];
              }
            }
          }
          return target;
        }
        cash.extend = extend;
        fn.extend = function(plugins) {
          return extend(fn, plugins);
        };
        var splitValuesRe = /\S+/g;
        function getSplitValues(str) {
          return isString(str) ? str.match(splitValuesRe) || [] : [];
        }
        fn.toggleClass = function(cls, force) {
          var classes = getSplitValues(cls);
          var isForce = !isUndefined(force);
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            each(classes, function(i2, c) {
              if (isForce) {
                force ? ele.classList.add(c) : ele.classList.remove(c);
              } else {
                ele.classList.toggle(c);
              }
            });
          });
        };
        fn.addClass = function(cls) {
          return this.toggleClass(cls, true);
        };
        fn.removeAttr = function(attr2) {
          var attrs = getSplitValues(attr2);
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            each(attrs, function(i2, a) {
              ele.removeAttribute(a);
            });
          });
        };
        function attr(attr2, value) {
          if (!attr2)
            return;
          if (isString(attr2)) {
            if (arguments.length < 2) {
              if (!this[0] || !isElement(this[0]))
                return;
              var value_1 = this[0].getAttribute(attr2);
              return isNull(value_1) ? void 0 : value_1;
            }
            if (isUndefined(value))
              return this;
            if (isNull(value))
              return this.removeAttr(attr2);
            return this.each(function(i, ele) {
              if (!isElement(ele))
                return;
              ele.setAttribute(attr2, value);
            });
          }
          for (var key in attr2) {
            this.attr(key, attr2[key]);
          }
          return this;
        }
        fn.attr = attr;
        fn.removeClass = function(cls) {
          if (arguments.length)
            return this.toggleClass(cls, false);
          return this.attr("class", "");
        };
        fn.hasClass = function(cls) {
          return !!cls && some.call(this, function(ele) {
            return isElement(ele) && ele.classList.contains(cls);
          });
        };
        fn.get = function(index) {
          if (isUndefined(index))
            return slice.call(this);
          index = Number(index);
          return this[index < 0 ? index + this.length : index];
        };
        fn.eq = function(index) {
          return cash(this.get(index));
        };
        fn.first = function() {
          return this.eq(0);
        };
        fn.last = function() {
          return this.eq(-1);
        };
        function computeStyle(ele, prop, isVariable) {
          if (!isElement(ele))
            return;
          var style2 = win.getComputedStyle(ele, null);
          return isVariable ? style2.getPropertyValue(prop) || void 0 : style2[prop] || ele.style[prop];
        }
        function computeStyleInt(ele, prop) {
          return parseInt(computeStyle(ele, prop), 10) || 0;
        }
        function getExtraSpace(ele, xAxis) {
          return computeStyleInt(ele, "border".concat(xAxis ? "Left" : "Top", "Width")) + computeStyleInt(ele, "padding".concat(xAxis ? "Left" : "Top")) + computeStyleInt(ele, "padding".concat(xAxis ? "Right" : "Bottom")) + computeStyleInt(ele, "border".concat(xAxis ? "Right" : "Bottom", "Width"));
        }
        var defaultDisplay = {};
        function getDefaultDisplay(tagName) {
          if (defaultDisplay[tagName])
            return defaultDisplay[tagName];
          var ele = createElement(tagName);
          doc.body.insertBefore(ele, null);
          var display = computeStyle(ele, "display");
          doc.body.removeChild(ele);
          return defaultDisplay[tagName] = display !== "none" ? display : "block";
        }
        function isHidden(ele) {
          return computeStyle(ele, "display") === "none";
        }
        function matches(ele, selector) {
          var matches2 = ele && (ele["matches"] || ele["webkitMatchesSelector"] || ele["msMatchesSelector"]);
          return !!matches2 && !!selector && matches2.call(ele, selector);
        }
        function getCompareFunction(comparator) {
          return isString(comparator) ? function(i, ele) {
            return matches(ele, comparator);
          } : isFunction(comparator) ? comparator : isCash(comparator) ? function(i, ele) {
            return comparator.is(ele);
          } : !comparator ? function() {
            return false;
          } : function(i, ele) {
            return ele === comparator;
          };
        }
        fn.filter = function(comparator) {
          var compare = getCompareFunction(comparator);
          return cash(filter.call(this, function(ele, i) {
            return compare.call(ele, i, ele);
          }));
        };
        function filtered(collection, comparator) {
          return !comparator ? collection : collection.filter(comparator);
        }
        fn.detach = function(comparator) {
          filtered(this, comparator).each(function(i, ele) {
            if (ele.parentNode) {
              ele.parentNode.removeChild(ele);
            }
          });
          return this;
        };
        var fragmentRe = /^\s*<(\w+)[^>]*>/;
        var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
        var containers = {
          "*": div,
          tr: tbody,
          td: tr,
          th: tr,
          thead: table,
          tbody: table,
          tfoot: table
        };
        function parseHTML(html2) {
          if (!isString(html2))
            return [];
          if (singleTagRe.test(html2))
            return [createElement(RegExp.$1)];
          var fragment = fragmentRe.test(html2) && RegExp.$1;
          var container = containers[fragment] || containers["*"];
          container.innerHTML = html2;
          return cash(container.childNodes).detach().get();
        }
        cash.parseHTML = parseHTML;
        fn.has = function(selector) {
          var comparator = isString(selector) ? function(i, ele) {
            return find(selector, ele).length;
          } : function(i, ele) {
            return ele.contains(selector);
          };
          return this.filter(comparator);
        };
        fn.not = function(comparator) {
          var compare = getCompareFunction(comparator);
          return this.filter(function(i, ele) {
            return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele);
          });
        };
        function pluck(arr, prop, deep, until) {
          var plucked = [];
          var isCallback = isFunction(prop);
          var compare = until && getCompareFunction(until);
          for (var i = 0, l = arr.length; i < l; i++) {
            if (isCallback) {
              var val_1 = prop(arr[i]);
              if (val_1.length)
                push.apply(plucked, val_1);
            } else {
              var val_2 = arr[i][prop];
              while (val_2 != null) {
                if (until && compare(-1, val_2))
                  break;
                plucked.push(val_2);
                val_2 = deep ? val_2[prop] : null;
              }
            }
          }
          return plucked;
        }
        function getValue(ele) {
          if (ele.multiple && ele.options)
            return pluck(filter.call(ele.options, function(option) {
              return option.selected && !option.disabled && !option.parentNode.disabled;
            }), "value");
          return ele.value || "";
        }
        function val(value) {
          if (!arguments.length)
            return this[0] && getValue(this[0]);
          return this.each(function(i, ele) {
            var isSelect = ele.multiple && ele.options;
            if (isSelect || checkableRe.test(ele.type)) {
              var eleValue_1 = isArray(value) ? map.call(value, String) : isNull(value) ? [] : [String(value)];
              if (isSelect) {
                each(ele.options, function(i2, option) {
                  option.selected = eleValue_1.indexOf(option.value) >= 0;
                }, true);
              } else {
                ele.checked = eleValue_1.indexOf(ele.value) >= 0;
              }
            } else {
              ele.value = isUndefined(value) || isNull(value) ? "" : value;
            }
          });
        }
        fn.val = val;
        fn.is = function(comparator) {
          var compare = getCompareFunction(comparator);
          return some.call(this, function(ele, i) {
            return compare.call(ele, i, ele);
          });
        };
        cash.guid = 1;
        function unique(arr) {
          return arr.length > 1 ? filter.call(arr, function(item, index, self) {
            return indexOf.call(self, item) === index;
          }) : arr;
        }
        cash.unique = unique;
        fn.add = function(selector, context) {
          return cash(unique(this.get().concat(cash(selector, context).get())));
        };
        fn.children = function(comparator) {
          return filtered(cash(unique(pluck(this, function(ele) {
            return ele.children;
          }))), comparator);
        };
        fn.parent = function(comparator) {
          return filtered(cash(unique(pluck(this, "parentNode"))), comparator);
        };
        fn.index = function(selector) {
          var child = selector ? cash(selector)[0] : this[0];
          var collection = selector ? this : cash(child).parent().children();
          return indexOf.call(collection, child);
        };
        fn.closest = function(comparator) {
          var filtered2 = this.filter(comparator);
          if (filtered2.length)
            return filtered2;
          var $parent = this.parent();
          if (!$parent.length)
            return filtered2;
          return $parent.closest(comparator);
        };
        fn.siblings = function(comparator) {
          return filtered(cash(unique(pluck(this, function(ele) {
            return cash(ele).parent().children().not(ele);
          }))), comparator);
        };
        fn.find = function(selector) {
          return cash(unique(pluck(this, function(ele) {
            return find(selector, ele);
          })));
        };
        var HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        var scriptTypeRe = /^$|^module$|\/(java|ecma)script/i;
        var scriptAttributes = ["type", "src", "nonce", "noModule"];
        function evalScripts(node, doc2) {
          var collection = cash(node);
          collection.filter("script").add(collection.find("script")).each(function(i, ele) {
            if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) {
              var script_1 = createElement("script");
              script_1.text = ele.textContent.replace(HTMLCDATARe, "");
              each(scriptAttributes, function(i2, attr2) {
                if (ele[attr2])
                  script_1[attr2] = ele[attr2];
              });
              doc2.head.insertBefore(script_1, null);
              doc2.head.removeChild(script_1);
            }
          });
        }
        function insertElement(anchor, target, left, inside, evaluate) {
          if (inside) {
            anchor.insertBefore(target, left ? anchor.firstChild : null);
          } else {
            if (anchor.nodeName === "HTML") {
              anchor.parentNode.replaceChild(target, anchor);
            } else {
              anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
            }
          }
          if (evaluate) {
            evalScripts(target, anchor.ownerDocument);
          }
        }
        function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
          each(selectors, function(si, selector) {
            each(cash(selector), function(ti, target) {
              each(cash(anchors), function(ai, anchor) {
                var anchorFinal = inverse ? target : anchor;
                var targetFinal = inverse ? anchor : target;
                var indexFinal = inverse ? ti : ai;
                insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
              }, reverseLoop3);
            }, reverseLoop2);
          }, reverseLoop1);
          return anchors;
        }
        fn.after = function() {
          return insertSelectors(arguments, this, false, false, false, true, true);
        };
        fn.append = function() {
          return insertSelectors(arguments, this, false, false, true);
        };
        function html(html2) {
          if (!arguments.length)
            return this[0] && this[0].innerHTML;
          if (isUndefined(html2))
            return this;
          var hasScript = /<script[\s>]/.test(html2);
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            if (hasScript) {
              cash(ele).empty().append(html2);
            } else {
              ele.innerHTML = html2;
            }
          });
        }
        fn.html = html;
        fn.appendTo = function(selector) {
          return insertSelectors(arguments, this, true, false, true);
        };
        fn.wrapInner = function(selector) {
          return this.each(function(i, ele) {
            var $ele = cash(ele);
            var contents = $ele.contents();
            contents.length ? contents.wrapAll(selector) : $ele.append(selector);
          });
        };
        fn.before = function() {
          return insertSelectors(arguments, this, false, true);
        };
        fn.wrapAll = function(selector) {
          var structure = cash(selector);
          var wrapper = structure[0];
          while (wrapper.children.length)
            wrapper = wrapper.firstElementChild;
          this.first().before(structure);
          return this.appendTo(wrapper);
        };
        fn.wrap = function(selector) {
          return this.each(function(i, ele) {
            var wrapper = cash(selector)[0];
            cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
          });
        };
        fn.insertAfter = function(selector) {
          return insertSelectors(arguments, this, true, false, false, false, false, true);
        };
        fn.insertBefore = function(selector) {
          return insertSelectors(arguments, this, true, true);
        };
        fn.prepend = function() {
          return insertSelectors(arguments, this, false, true, true, true, true);
        };
        fn.prependTo = function(selector) {
          return insertSelectors(arguments, this, true, true, true, false, false, true);
        };
        fn.contents = function() {
          return cash(unique(pluck(this, function(ele) {
            return ele.tagName === "IFRAME" ? [ele.contentDocument] : ele.tagName === "TEMPLATE" ? ele.content.childNodes : ele.childNodes;
          })));
        };
        fn.next = function(comparator, _all, _until) {
          return filtered(cash(unique(pluck(this, "nextElementSibling", _all, _until))), comparator);
        };
        fn.nextAll = function(comparator) {
          return this.next(comparator, true);
        };
        fn.nextUntil = function(until, comparator) {
          return this.next(comparator, true, until);
        };
        fn.parents = function(comparator, _until) {
          return filtered(cash(unique(pluck(this, "parentElement", true, _until))), comparator);
        };
        fn.parentsUntil = function(until, comparator) {
          return this.parents(comparator, until);
        };
        fn.prev = function(comparator, _all, _until) {
          return filtered(cash(unique(pluck(this, "previousElementSibling", _all, _until))), comparator);
        };
        fn.prevAll = function(comparator) {
          return this.prev(comparator, true);
        };
        fn.prevUntil = function(until, comparator) {
          return this.prev(comparator, true, until);
        };
        fn.map = function(callback) {
          return cash(concat.apply([], map.call(this, function(ele, i) {
            return callback.call(ele, i, ele);
          })));
        };
        fn.clone = function() {
          return this.map(function(i, ele) {
            return ele.cloneNode(true);
          });
        };
        fn.offsetParent = function() {
          return this.map(function(i, ele) {
            var offsetParent = ele.offsetParent;
            while (offsetParent && computeStyle(offsetParent, "position") === "static") {
              offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || docEle;
          });
        };
        fn.slice = function(start, end) {
          return cash(slice.call(this, start, end));
        };
        var dashAlphaRe = /-([a-z])/g;
        function camelCase(str) {
          return str.replace(dashAlphaRe, function(match, letter) {
            return letter.toUpperCase();
          });
        }
        fn.ready = function(callback) {
          var cb = function() {
            return setTimeout(callback, 0, cash);
          };
          if (doc.readyState !== "loading") {
            cb();
          } else {
            doc.addEventListener("DOMContentLoaded", cb);
          }
          return this;
        };
        fn.unwrap = function() {
          this.parent().each(function(i, ele) {
            if (ele.tagName === "BODY")
              return;
            var $ele = cash(ele);
            $ele.replaceWith($ele.children());
          });
          return this;
        };
        fn.offset = function() {
          var ele = this[0];
          if (!ele)
            return;
          var rect = ele.getBoundingClientRect();
          return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
          };
        };
        fn.position = function() {
          var ele = this[0];
          if (!ele)
            return;
          var isFixed = computeStyle(ele, "position") === "fixed";
          var offset = isFixed ? ele.getBoundingClientRect() : this.offset();
          if (!isFixed) {
            var doc_1 = ele.ownerDocument;
            var offsetParent = ele.offsetParent || doc_1.documentElement;
            while ((offsetParent === doc_1.body || offsetParent === doc_1.documentElement) && computeStyle(offsetParent, "position") === "static") {
              offsetParent = offsetParent.parentNode;
            }
            if (offsetParent !== ele && isElement(offsetParent)) {
              var parentOffset = cash(offsetParent).offset();
              offset.top -= parentOffset.top + computeStyleInt(offsetParent, "borderTopWidth");
              offset.left -= parentOffset.left + computeStyleInt(offsetParent, "borderLeftWidth");
            }
          }
          return {
            top: offset.top - computeStyleInt(ele, "marginTop"),
            left: offset.left - computeStyleInt(ele, "marginLeft")
          };
        };
        var propMap = {
          /* GENERAL */
          class: "className",
          contenteditable: "contentEditable",
          /* LABEL */
          for: "htmlFor",
          /* INPUT */
          readonly: "readOnly",
          maxlength: "maxLength",
          tabindex: "tabIndex",
          /* TABLE */
          colspan: "colSpan",
          rowspan: "rowSpan",
          /* IMAGE */
          usemap: "useMap"
        };
        fn.prop = function(prop, value) {
          if (!prop)
            return;
          if (isString(prop)) {
            prop = propMap[prop] || prop;
            if (arguments.length < 2)
              return this[0] && this[0][prop];
            return this.each(function(i, ele) {
              ele[prop] = value;
            });
          }
          for (var key in prop) {
            this.prop(key, prop[key]);
          }
          return this;
        };
        fn.removeProp = function(prop) {
          return this.each(function(i, ele) {
            delete ele[propMap[prop] || prop];
          });
        };
        var cssVariableRe = /^--/;
        function isCSSVariable(prop) {
          return cssVariableRe.test(prop);
        }
        var prefixedProps = {};
        var style = div.style;
        var vendorsPrefixes = ["webkit", "moz", "ms"];
        function getPrefixedProp(prop, isVariable) {
          if (isVariable === void 0) {
            isVariable = isCSSVariable(prop);
          }
          if (isVariable)
            return prop;
          if (!prefixedProps[prop]) {
            var propCC = camelCase(prop);
            var propUC = "".concat(propCC[0].toUpperCase()).concat(propCC.slice(1));
            var props = "".concat(propCC, " ").concat(vendorsPrefixes.join("".concat(propUC, " "))).concat(propUC).split(" ");
            each(props, function(i, p) {
              if (p in style) {
                prefixedProps[prop] = p;
                return false;
              }
            });
          }
          return prefixedProps[prop];
        }
        var numericProps = {
          animationIterationCount: true,
          columnCount: true,
          flexGrow: true,
          flexShrink: true,
          fontWeight: true,
          gridArea: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnStart: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowStart: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          widows: true,
          zIndex: true
        };
        function getSuffixedValue(prop, value, isVariable) {
          if (isVariable === void 0) {
            isVariable = isCSSVariable(prop);
          }
          return !isVariable && !numericProps[prop] && isNumeric(value) ? "".concat(value, "px") : value;
        }
        function css(prop, value) {
          if (isString(prop)) {
            var isVariable_1 = isCSSVariable(prop);
            prop = getPrefixedProp(prop, isVariable_1);
            if (arguments.length < 2)
              return this[0] && computeStyle(this[0], prop, isVariable_1);
            if (!prop)
              return this;
            value = getSuffixedValue(prop, value, isVariable_1);
            return this.each(function(i, ele) {
              if (!isElement(ele))
                return;
              if (isVariable_1) {
                ele.style.setProperty(prop, value);
              } else {
                ele.style[prop] = value;
              }
            });
          }
          for (var key in prop) {
            this.css(key, prop[key]);
          }
          return this;
        }
        ;
        fn.css = css;
        function attempt(fn2, arg) {
          try {
            return fn2(arg);
          } catch (_a) {
            return arg;
          }
        }
        var JSONStringRe = /^\s+|\s+$/;
        function getData(ele, key) {
          var value = ele.dataset[key] || ele.dataset[camelCase(key)];
          if (JSONStringRe.test(value))
            return value;
          return attempt(JSON.parse, value);
        }
        function setData(ele, key, value) {
          value = attempt(JSON.stringify, value);
          ele.dataset[camelCase(key)] = value;
        }
        function data(name, value) {
          if (!name) {
            if (!this[0])
              return;
            var datas = {};
            for (var key in this[0].dataset) {
              datas[key] = getData(this[0], key);
            }
            return datas;
          }
          if (isString(name)) {
            if (arguments.length < 2)
              return this[0] && getData(this[0], name);
            if (isUndefined(value))
              return this;
            return this.each(function(i, ele) {
              setData(ele, name, value);
            });
          }
          for (var key in name) {
            this.data(key, name[key]);
          }
          return this;
        }
        fn.data = data;
        function getDocumentDimension(doc2, dimension) {
          var docEle2 = doc2.documentElement;
          return Math.max(doc2.body["scroll".concat(dimension)], docEle2["scroll".concat(dimension)], doc2.body["offset".concat(dimension)], docEle2["offset".concat(dimension)], docEle2["client".concat(dimension)]);
        }
        each([true, false], function(i, outer) {
          each(["Width", "Height"], function(i2, prop) {
            var name = "".concat(outer ? "outer" : "inner").concat(prop);
            fn[name] = function(includeMargins) {
              if (!this[0])
                return;
              if (isWindow(this[0]))
                return outer ? this[0]["inner".concat(prop)] : this[0].document.documentElement["client".concat(prop)];
              if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
              return this[0]["".concat(outer ? "offset" : "client").concat(prop)] + (includeMargins && outer ? computeStyleInt(this[0], "margin".concat(i2 ? "Top" : "Left")) + computeStyleInt(this[0], "margin".concat(i2 ? "Bottom" : "Right")) : 0);
            };
          });
        });
        each(["Width", "Height"], function(index, prop) {
          var propLC = prop.toLowerCase();
          fn[propLC] = function(value) {
            if (!this[0])
              return isUndefined(value) ? void 0 : this;
            if (!arguments.length) {
              if (isWindow(this[0]))
                return this[0].document.documentElement["client".concat(prop)];
              if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
              return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
            }
            var valueNumber = parseInt(value, 10);
            return this.each(function(i, ele) {
              if (!isElement(ele))
                return;
              var boxSizing = computeStyle(ele, "boxSizing");
              ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === "border-box" ? getExtraSpace(ele, !index) : 0));
            });
          };
        });
        var displayProperty = "___cd";
        fn.toggle = function(force) {
          return this.each(function(i, ele) {
            if (!isElement(ele))
              return;
            var show = isUndefined(force) ? isHidden(ele) : force;
            if (show) {
              ele.style.display = ele[displayProperty] || "";
              if (isHidden(ele)) {
                ele.style.display = getDefaultDisplay(ele.tagName);
              }
            } else {
              ele[displayProperty] = computeStyle(ele, "display");
              ele.style.display = "none";
            }
          });
        };
        fn.hide = function() {
          return this.toggle(false);
        };
        fn.show = function() {
          return this.toggle(true);
        };
        var eventsNamespace = "___ce";
        var eventsNamespacesSeparator = ".";
        var eventsFocus = { focus: "focusin", blur: "focusout" };
        var eventsHover = { mouseenter: "mouseover", mouseleave: "mouseout" };
        var eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
        function getEventNameBubbling(name) {
          return eventsHover[name] || eventsFocus[name] || name;
        }
        function parseEventName(eventName) {
          var parts = eventName.split(eventsNamespacesSeparator);
          return [parts[0], parts.slice(1).sort()];
        }
        fn.trigger = function(event, data2) {
          if (isString(event)) {
            var _a = parseEventName(event), nameOriginal = _a[0], namespaces = _a[1];
            var name_1 = getEventNameBubbling(nameOriginal);
            if (!name_1)
              return this;
            var type = eventsMouseRe.test(name_1) ? "MouseEvents" : "HTMLEvents";
            event = doc.createEvent(type);
            event.initEvent(name_1, true, true);
            event.namespace = namespaces.join(eventsNamespacesSeparator);
            event.___ot = nameOriginal;
          }
          event.___td = data2;
          var isEventFocus = event.___ot in eventsFocus;
          return this.each(function(i, ele) {
            if (isEventFocus && isFunction(ele[event.___ot])) {
              ele["___i".concat(event.type)] = true;
              ele[event.___ot]();
              ele["___i".concat(event.type)] = false;
            }
            ele.dispatchEvent(event);
          });
        };
        function getEventsCache(ele) {
          return ele[eventsNamespace] = ele[eventsNamespace] || {};
        }
        function addEvent(ele, name, namespaces, selector, callback) {
          var eventCache = getEventsCache(ele);
          eventCache[name] = eventCache[name] || [];
          eventCache[name].push([namespaces, selector, callback]);
          ele.addEventListener(name, callback);
        }
        function hasNamespaces(ns1, ns2) {
          return !ns2 || !some.call(ns2, function(ns) {
            return ns1.indexOf(ns) < 0;
          });
        }
        function removeEvent(ele, name, namespaces, selector, callback) {
          var cache = getEventsCache(ele);
          if (!name) {
            for (name in cache) {
              removeEvent(ele, name, namespaces, selector, callback);
            }
          } else if (cache[name]) {
            cache[name] = cache[name].filter(function(_a) {
              var ns = _a[0], sel = _a[1], cb = _a[2];
              if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel)
                return true;
              ele.removeEventListener(name, cb);
            });
          }
        }
        fn.off = function(eventFullName, selector, callback) {
          var _this = this;
          if (isUndefined(eventFullName)) {
            this.each(function(i, ele) {
              if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
              removeEvent(ele);
            });
          } else if (!isString(eventFullName)) {
            for (var key in eventFullName) {
              this.off(key, eventFullName[key]);
            }
          } else {
            if (isFunction(selector)) {
              callback = selector;
              selector = "";
            }
            each(getSplitValues(eventFullName), function(i, eventFullName2) {
              var _a = parseEventName(eventFullName2), nameOriginal = _a[0], namespaces = _a[1];
              var name = getEventNameBubbling(nameOriginal);
              _this.each(function(i2, ele) {
                if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                  return;
                removeEvent(ele, name, namespaces, selector, callback);
              });
            });
          }
          return this;
        };
        fn.remove = function(comparator) {
          filtered(this, comparator).detach().off();
          return this;
        };
        fn.replaceWith = function(selector) {
          return this.before(selector).remove();
        };
        fn.replaceAll = function(selector) {
          cash(selector).replaceWith(this);
          return this;
        };
        function on(eventFullName, selector, data2, callback, _one) {
          var _this = this;
          if (!isString(eventFullName)) {
            for (var key in eventFullName) {
              this.on(key, selector, data2, eventFullName[key], _one);
            }
            return this;
          }
          if (!isString(selector)) {
            if (isUndefined(selector) || isNull(selector)) {
              selector = "";
            } else if (isUndefined(data2)) {
              data2 = selector;
              selector = "";
            } else {
              callback = data2;
              data2 = selector;
              selector = "";
            }
          }
          if (!isFunction(callback)) {
            callback = data2;
            data2 = void 0;
          }
          if (!callback)
            return this;
          each(getSplitValues(eventFullName), function(i, eventFullName2) {
            var _a = parseEventName(eventFullName2), nameOriginal = _a[0], namespaces = _a[1];
            var name = getEventNameBubbling(nameOriginal);
            var isEventHover = nameOriginal in eventsHover;
            var isEventFocus = nameOriginal in eventsFocus;
            if (!name)
              return;
            _this.each(function(i2, ele) {
              if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
              var finalCallback = function(event) {
                if (event.target["___i".concat(event.type)])
                  return event.stopImmediatePropagation();
                if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
                  return;
                if (!selector && (isEventFocus && (event.target !== ele || event.___ot === name) || isEventHover && event.relatedTarget && ele.contains(event.relatedTarget)))
                  return;
                var thisArg = ele;
                if (selector) {
                  var target = event.target;
                  while (!matches(target, selector)) {
                    if (target === ele)
                      return;
                    target = target.parentNode;
                    if (!target)
                      return;
                  }
                  thisArg = target;
                }
                Object.defineProperty(event, "currentTarget", {
                  configurable: true,
                  get: function() {
                    return thisArg;
                  }
                });
                Object.defineProperty(event, "delegateTarget", {
                  configurable: true,
                  get: function() {
                    return ele;
                  }
                });
                Object.defineProperty(event, "data", {
                  configurable: true,
                  get: function() {
                    return data2;
                  }
                });
                var returnValue = callback.call(thisArg, event, event.___td);
                if (_one) {
                  removeEvent(ele, name, namespaces, selector, finalCallback);
                }
                if (returnValue === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              };
              finalCallback.guid = callback.guid = callback.guid || cash.guid++;
              addEvent(ele, name, namespaces, selector, finalCallback);
            });
          });
          return this;
        }
        fn.on = on;
        function one(eventFullName, selector, data2, callback) {
          return this.on(eventFullName, selector, data2, callback, true);
        }
        ;
        fn.one = one;
        var queryEncodeSpaceRe = /%20/g;
        var queryEncodeCRLFRe = /\r?\n/g;
        function queryEncode(prop, value) {
          return "&".concat(encodeURIComponent(prop), "=").concat(encodeURIComponent(value.replace(queryEncodeCRLFRe, "\r\n")).replace(queryEncodeSpaceRe, "+"));
        }
        var skippableRe = /file|reset|submit|button|image/i;
        var checkableRe = /radio|checkbox/i;
        fn.serialize = function() {
          var query = "";
          this.each(function(i, ele) {
            each(ele.elements || [ele], function(i2, ele2) {
              if (ele2.disabled || !ele2.name || ele2.tagName === "FIELDSET" || skippableRe.test(ele2.type) || checkableRe.test(ele2.type) && !ele2.checked)
                return;
              var value = getValue(ele2);
              if (!isUndefined(value)) {
                var values = isArray(value) ? value : [value];
                each(values, function(i3, value2) {
                  query += queryEncode(ele2.name, value2);
                });
              }
            });
          });
          return query.slice(1);
        };
        if (typeof exports !== "undefined") {
          module.exports = cash;
        } else {
          win["cash"] = win["$"] = cash;
        }
      })();
    }
  });

  // dist/main.js
  var import_cash_dom = __toESM(require_cash());
  var websocket;
  window.onload = init;
  function init() {
    (0, import_cash_dom.default)("#text").on("input", (e) => {
      send(e.target.value);
    });
    connect();
  }
  function connect() {
    const wsHost = "ws://" + window.location.host + "/_ws" + window.location.pathname;
    websocket = new WebSocket(wsHost);
    websocket.onmessage = function(evt) {
      onMessage(evt);
    };
    websocket.onerror = function(evt) {
      onError(evt);
    };
  }
  function send(text) {
    websocket.send(text);
  }
  function onMessage(e) {
    (0, import_cash_dom.default)("#text")[0].value = e.data;
  }
  function onError(e) {
    console.log(e);
  }
})();
