"use strict";
(() => {
  // node_modules/email-link.js/index.js
  function enableEmailLinks(selector, dataAttributeName) {
    selector = selector || "a[data-email-address]";
    dataAttributeName = dataAttributeName || "emailAddress";
    document.querySelectorAll(selector).forEach((link) => {
      let email = link.dataset[dataAttributeName];
      if (email === "" || !email) email = link.innerHTML;
      if (!email.includes(" ") || email.includes("@")) return;
      if (link.innerHTML === email) {
        link.innerHTML = email.replace(" ", "<span>@</span>");
      }
      link.href = `javascript:location.href = "mailto:${email}".replace(" ", "@")`;
    });
  }
  var email_link_default = {
    enableEmailLinks
  };

  // node_modules/@webcomponents/custom-elements/custom-elements.min.js
  (function() {
    "use strict";
    var n = window.Document.prototype.createElement, p = window.Document.prototype.createElementNS, aa = window.Document.prototype.importNode, ba = window.Document.prototype.prepend, ca = window.Document.prototype.append, da = window.DocumentFragment.prototype.prepend, ea = window.DocumentFragment.prototype.append, q = window.Node.prototype.cloneNode, r = window.Node.prototype.appendChild, t = window.Node.prototype.insertBefore, u = window.Node.prototype.removeChild, v = window.Node.prototype.replaceChild, w = Object.getOwnPropertyDescriptor(
      window.Node.prototype,
      "textContent"
    ), y = window.Element.prototype.attachShadow, z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), A = window.Element.prototype.getAttribute, B = window.Element.prototype.setAttribute, C = window.Element.prototype.removeAttribute, D = window.Element.prototype.toggleAttribute, E = window.Element.prototype.getAttributeNS, F = window.Element.prototype.setAttributeNS, G = window.Element.prototype.removeAttributeNS, H = window.Element.prototype.insertAdjacentElement, fa = window.Element.prototype.insertAdjacentHTML, ha = window.Element.prototype.prepend, ia = window.Element.prototype.append, ja = window.Element.prototype.before, ka = window.Element.prototype.after, la = window.Element.prototype.replaceWith, ma = window.Element.prototype.remove, na = window.HTMLElement, I = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), oa = window.HTMLElement.prototype.insertAdjacentElement, pa = window.HTMLElement.prototype.insertAdjacentHTML;
    var qa = /* @__PURE__ */ new Set();
    "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(a) {
      return qa.add(a);
    });
    function ra(a) {
      var b = qa.has(a);
      a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
      return !b && a;
    }
    var sa = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
    function J(a) {
      var b = a.isConnected;
      if (void 0 !== b) return b;
      if (sa(a)) return true;
      for (; a && !(a.__CE_isImportDocument || a instanceof Document); ) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
      return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }
    function K(a) {
      var b = a.children;
      if (b) return Array.prototype.slice.call(b);
      b = [];
      for (a = a.firstChild; a; a = a.nextSibling) a.nodeType === Node.ELEMENT_NODE && b.push(a);
      return b;
    }
    function L(a, b) {
      for (; b && b !== a && !b.nextSibling; ) b = b.parentNode;
      return b && b !== a ? b.nextSibling : null;
    }
    function M(a, b, d) {
      for (var f = a; f; ) {
        if (f.nodeType === Node.ELEMENT_NODE) {
          var c = f;
          b(c);
          var e = c.localName;
          if ("link" === e && "import" === c.getAttribute("rel")) {
            f = c.import;
            void 0 === d && (d = /* @__PURE__ */ new Set());
            if (f instanceof Node && !d.has(f)) for (d.add(f), f = f.firstChild; f; f = f.nextSibling) M(f, b, d);
            f = L(a, c);
            continue;
          } else if ("template" === e) {
            f = L(a, c);
            continue;
          }
          if (c = c.__CE_shadowRoot) for (c = c.firstChild; c; c = c.nextSibling) M(c, b, d);
        }
        f = f.firstChild ? f.firstChild : L(a, f);
      }
    }
    ;
    function N() {
      var a = !(null === O || void 0 === O || !O.noDocumentConstructionObserver), b = !(null === O || void 0 === O || !O.shadyDomFastWalk);
      this.m = [];
      this.g = [];
      this.j = false;
      this.shadyDomFastWalk = b;
      this.I = !a;
    }
    function P(a, b, d, f) {
      var c = window.ShadyDOM;
      if (a.shadyDomFastWalk && c && c.inUse) {
        if (b.nodeType === Node.ELEMENT_NODE && d(b), b.querySelectorAll) for (a = c.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) d(a[b]);
      } else M(b, d, f);
    }
    function ta(a, b) {
      a.j = true;
      a.m.push(b);
    }
    function ua(a, b) {
      a.j = true;
      a.g.push(b);
    }
    function Q(a, b) {
      a.j && P(a, b, function(d) {
        return R(a, d);
      });
    }
    function R(a, b) {
      if (a.j && !b.__CE_patched) {
        b.__CE_patched = true;
        for (var d = 0; d < a.m.length; d++) a.m[d](b);
        for (d = 0; d < a.g.length; d++) a.g[d](b);
      }
    }
    function S(a, b) {
      var d = [];
      P(a, b, function(c) {
        return d.push(c);
      });
      for (b = 0; b < d.length; b++) {
        var f = d[b];
        1 === f.__CE_state ? a.connectedCallback(f) : T(a, f);
      }
    }
    function U(a, b) {
      var d = [];
      P(a, b, function(c) {
        return d.push(c);
      });
      for (b = 0; b < d.length; b++) {
        var f = d[b];
        1 === f.__CE_state && a.disconnectedCallback(f);
      }
    }
    function V(a, b, d) {
      d = void 0 === d ? {} : d;
      var f = d.J, c = d.upgrade || function(g) {
        return T(a, g);
      }, e = [];
      P(a, b, function(g) {
        a.j && R(a, g);
        if ("link" === g.localName && "import" === g.getAttribute("rel")) {
          var h = g.import;
          h instanceof Node && (h.__CE_isImportDocument = true, h.__CE_registry = document.__CE_registry);
          h && "complete" === h.readyState ? h.__CE_documentLoadHandled = true : g.addEventListener("load", function() {
            var k = g.import;
            if (!k.__CE_documentLoadHandled) {
              k.__CE_documentLoadHandled = true;
              var l = /* @__PURE__ */ new Set();
              f && (f.forEach(function(m) {
                return l.add(m);
              }), l.delete(k));
              V(a, k, { J: l, upgrade: c });
            }
          });
        } else e.push(g);
      }, f);
      for (b = 0; b < e.length; b++) c(e[b]);
    }
    function T(a, b) {
      try {
        var d = b.ownerDocument, f = d.__CE_registry;
        var c = f && (d.defaultView || d.__CE_isImportDocument) ? W(f, b.localName) : void 0;
        if (c && void 0 === b.__CE_state) {
          c.constructionStack.push(b);
          try {
            try {
              if (new c.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              c.constructionStack.pop();
            }
          } catch (k) {
            throw b.__CE_state = 2, k;
          }
          b.__CE_state = 1;
          b.__CE_definition = c;
          if (c.attributeChangedCallback && b.hasAttributes()) {
            var e = c.observedAttributes;
            for (c = 0; c < e.length; c++) {
              var g = e[c], h = b.getAttribute(g);
              null !== h && a.attributeChangedCallback(b, g, null, h, null);
            }
          }
          J(b) && a.connectedCallback(b);
        }
      } catch (k) {
        X(k);
      }
    }
    N.prototype.connectedCallback = function(a) {
      var b = a.__CE_definition;
      if (b.connectedCallback) try {
        b.connectedCallback.call(a);
      } catch (d) {
        X(d);
      }
    };
    N.prototype.disconnectedCallback = function(a) {
      var b = a.__CE_definition;
      if (b.disconnectedCallback) try {
        b.disconnectedCallback.call(a);
      } catch (d) {
        X(d);
      }
    };
    N.prototype.attributeChangedCallback = function(a, b, d, f, c) {
      var e = a.__CE_definition;
      if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
        e.attributeChangedCallback.call(a, b, d, f, c);
      } catch (g) {
        X(g);
      }
    };
    function va(a, b, d, f) {
      var c = b.__CE_registry;
      if (c && (null === f || "http://www.w3.org/1999/xhtml" === f) && (c = W(c, d))) try {
        var e = new c.constructorFunction();
        if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + d + "': The returned value was not constructed with the HTMLElement constructor.");
        if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + d + "': The constructed element's namespace must be the HTML namespace.");
        if (e.hasAttributes()) throw Error("Failed to construct '" + d + "': The constructed element must not have any attributes.");
        if (null !== e.firstChild) throw Error("Failed to construct '" + d + "': The constructed element must not have any children.");
        if (null !== e.parentNode) throw Error("Failed to construct '" + d + "': The constructed element must not have a parent node.");
        if (e.ownerDocument !== b) throw Error("Failed to construct '" + d + "': The constructed element's owner document is incorrect.");
        if (e.localName !== d) throw Error("Failed to construct '" + d + "': The constructed element's local name is incorrect.");
        return e;
      } catch (g) {
        return X(g), b = null === f ? n.call(b, d) : p.call(b, f, d), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, R(a, b), b;
      }
      b = null === f ? n.call(b, d) : p.call(b, f, d);
      R(a, b);
      return b;
    }
    function X(a) {
      var b = "", d = "", f = 0, c = 0;
      a instanceof Error ? (b = a.message, d = a.sourceURL || a.fileName || "", f = a.line || a.lineNumber || 0, c = a.column || a.columnNumber || 0) : b = "Uncaught " + String(a);
      var e = void 0;
      void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", { cancelable: true, message: b, filename: d, lineno: f, colno: c, error: a }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", false, true, b, d, f), e.preventDefault = function() {
        Object.defineProperty(this, "defaultPrevented", { configurable: true, get: function() {
          return true;
        } });
      });
      void 0 === e.error && Object.defineProperty(e, "error", { configurable: true, enumerable: true, get: function() {
        return a;
      } });
      window.dispatchEvent(e);
      e.defaultPrevented || console.error(a);
    }
    ;
    function wa() {
      var a = this;
      this.g = void 0;
      this.F = new Promise(function(b) {
        a.l = b;
      });
    }
    wa.prototype.resolve = function(a) {
      if (this.g) throw Error("Already resolved.");
      this.g = a;
      this.l(a);
    };
    function xa(a) {
      var b = document;
      this.l = void 0;
      this.h = a;
      this.g = b;
      V(this.h, this.g);
      "loading" === this.g.readyState && (this.l = new MutationObserver(this.G.bind(this)), this.l.observe(this.g, { childList: true, subtree: true }));
    }
    function ya(a) {
      a.l && a.l.disconnect();
    }
    xa.prototype.G = function(a) {
      var b = this.g.readyState;
      "interactive" !== b && "complete" !== b || ya(this);
      for (b = 0; b < a.length; b++) for (var d = a[b].addedNodes, f = 0; f < d.length; f++) V(this.h, d[f]);
    };
    function Y(a) {
      this.s = /* @__PURE__ */ new Map();
      this.u = /* @__PURE__ */ new Map();
      this.C = /* @__PURE__ */ new Map();
      this.A = false;
      this.B = /* @__PURE__ */ new Map();
      this.o = function(b) {
        return b();
      };
      this.i = false;
      this.v = [];
      this.h = a;
      this.D = a.I ? new xa(a) : void 0;
    }
    Y.prototype.H = function(a, b) {
      var d = this;
      if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");
      za(this, a);
      this.s.set(a, b);
      this.v.push(a);
      this.i || (this.i = true, this.o(function() {
        return Aa(d);
      }));
    };
    Y.prototype.define = function(a, b) {
      var d = this;
      if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
      za(this, a);
      Ba(this, a, b);
      this.v.push(a);
      this.i || (this.i = true, this.o(function() {
        return Aa(d);
      }));
    };
    function za(a, b) {
      if (!ra(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
      if (W(a, b)) throw Error("A custom element with name '" + (b + "' has already been defined."));
      if (a.A) throw Error("A custom element is already being defined.");
    }
    function Ba(a, b, d) {
      a.A = true;
      var f;
      try {
        var c = d.prototype;
        if (!(c instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
        var e = function(m) {
          var x = c[m];
          if (void 0 !== x && !(x instanceof Function)) throw Error("The '" + m + "' callback must be a function.");
          return x;
        };
        var g = e("connectedCallback");
        var h = e("disconnectedCallback");
        var k = e("adoptedCallback");
        var l = (f = e("attributeChangedCallback")) && d.observedAttributes || [];
      } catch (m) {
        throw m;
      } finally {
        a.A = false;
      }
      d = {
        localName: b,
        constructorFunction: d,
        connectedCallback: g,
        disconnectedCallback: h,
        adoptedCallback: k,
        attributeChangedCallback: f,
        observedAttributes: l,
        constructionStack: []
      };
      a.u.set(b, d);
      a.C.set(d.constructorFunction, d);
      return d;
    }
    Y.prototype.upgrade = function(a) {
      V(this.h, a);
    };
    function Aa(a) {
      if (false !== a.i) {
        a.i = false;
        for (var b = [], d = a.v, f = /* @__PURE__ */ new Map(), c = 0; c < d.length; c++) f.set(d[c], []);
        V(a.h, document, { upgrade: function(k) {
          if (void 0 === k.__CE_state) {
            var l = k.localName, m = f.get(l);
            m ? m.push(k) : a.u.has(l) && b.push(k);
          }
        } });
        for (c = 0; c < b.length; c++) T(a.h, b[c]);
        for (c = 0; c < d.length; c++) {
          for (var e = d[c], g = f.get(e), h = 0; h < g.length; h++) T(a.h, g[h]);
          (e = a.B.get(e)) && e.resolve(void 0);
        }
        d.length = 0;
      }
    }
    Y.prototype.get = function(a) {
      if (a = W(this, a)) return a.constructorFunction;
    };
    Y.prototype.whenDefined = function(a) {
      if (!ra(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
      var b = this.B.get(a);
      if (b) return b.F;
      b = new wa();
      this.B.set(a, b);
      var d = this.u.has(a) || this.s.has(a);
      a = -1 === this.v.indexOf(a);
      d && a && b.resolve(void 0);
      return b.F;
    };
    Y.prototype.polyfillWrapFlushCallback = function(a) {
      this.D && ya(this.D);
      var b = this.o;
      this.o = function(d) {
        return a(function() {
          return b(d);
        });
      };
    };
    function W(a, b) {
      var d = a.u.get(b);
      if (d) return d;
      if (d = a.s.get(b)) {
        a.s.delete(b);
        try {
          return Ba(a, b, d());
        } catch (f) {
          X(f);
        }
      }
    }
    Y.prototype.define = Y.prototype.define;
    Y.prototype.upgrade = Y.prototype.upgrade;
    Y.prototype.get = Y.prototype.get;
    Y.prototype.whenDefined = Y.prototype.whenDefined;
    Y.prototype.polyfillDefineLazy = Y.prototype.H;
    Y.prototype.polyfillWrapFlushCallback = Y.prototype.polyfillWrapFlushCallback;
    function Z(a, b, d) {
      function f(c) {
        return function(e) {
          for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];
          h = [];
          for (var k = [], l = 0; l < g.length; l++) {
            var m = g[l];
            m instanceof Element && J(m) && k.push(m);
            if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) h.push(m);
            else h.push(m);
          }
          c.apply(this, g);
          for (g = 0; g < k.length; g++) U(a, k[g]);
          if (J(this)) for (g = 0; g < h.length; g++) k = h[g], k instanceof Element && S(a, k);
        };
      }
      void 0 !== d.prepend && (b.prepend = f(d.prepend));
      void 0 !== d.append && (b.append = f(d.append));
    }
    ;
    function Ca(a) {
      Document.prototype.createElement = function(b) {
        return va(a, this, b, null);
      };
      Document.prototype.importNode = function(b, d) {
        b = aa.call(this, b, !!d);
        this.__CE_registry ? V(a, b) : Q(a, b);
        return b;
      };
      Document.prototype.createElementNS = function(b, d) {
        return va(a, this, d, b);
      };
      Z(a, Document.prototype, { prepend: ba, append: ca });
    }
    ;
    function Da(a) {
      function b(f) {
        return function(c) {
          for (var e = [], g = 0; g < arguments.length; ++g) e[g] = arguments[g];
          g = [];
          for (var h = [], k = 0; k < e.length; k++) {
            var l = e[k];
            l instanceof Element && J(l) && h.push(l);
            if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) g.push(l);
            else g.push(l);
          }
          f.apply(this, e);
          for (e = 0; e < h.length; e++) U(a, h[e]);
          if (J(this)) for (e = 0; e < g.length; e++) h = g[e], h instanceof Element && S(a, h);
        };
      }
      var d = Element.prototype;
      void 0 !== ja && (d.before = b(ja));
      void 0 !== ka && (d.after = b(ka));
      void 0 !== la && (d.replaceWith = function(f) {
        for (var c = [], e = 0; e < arguments.length; ++e) c[e] = arguments[e];
        e = [];
        for (var g = [], h = 0; h < c.length; h++) {
          var k = c[h];
          k instanceof Element && J(k) && g.push(k);
          if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) e.push(k);
          else e.push(k);
        }
        h = J(this);
        la.apply(this, c);
        for (c = 0; c < g.length; c++) U(a, g[c]);
        if (h) for (U(a, this), c = 0; c < e.length; c++) g = e[c], g instanceof Element && S(a, g);
      });
      void 0 !== ma && (d.remove = function() {
        var f = J(this);
        ma.call(this);
        f && U(a, this);
      });
    }
    ;
    function Ea(a) {
      function b(c, e) {
        Object.defineProperty(c, "innerHTML", { enumerable: e.enumerable, configurable: true, get: e.get, set: function(g) {
          var h = this, k = void 0;
          J(this) && (k = [], P(a, this, function(x) {
            x !== h && k.push(x);
          }));
          e.set.call(this, g);
          if (k) for (var l = 0; l < k.length; l++) {
            var m = k[l];
            1 === m.__CE_state && a.disconnectedCallback(m);
          }
          this.ownerDocument.__CE_registry ? V(a, this) : Q(a, this);
          return g;
        } });
      }
      function d(c, e) {
        c.insertAdjacentElement = function(g, h) {
          var k = J(h);
          g = e.call(this, g, h);
          k && U(a, h);
          J(g) && S(a, h);
          return g;
        };
      }
      function f(c, e) {
        function g(h, k) {
          for (var l = []; h !== k; h = h.nextSibling) l.push(h);
          for (k = 0; k < l.length; k++) V(a, l[k]);
        }
        c.insertAdjacentHTML = function(h, k) {
          h = h.toLowerCase();
          if ("beforebegin" === h) {
            var l = this.previousSibling;
            e.call(this, h, k);
            g(l || this.parentNode.firstChild, this);
          } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);
          else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);
          else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);
          else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
        };
      }
      y && (Element.prototype.attachShadow = function(c) {
        c = y.call(this, c);
        if (a.j && !c.__CE_patched) {
          c.__CE_patched = true;
          for (var e = 0; e < a.m.length; e++) a.m[e](c);
        }
        return this.__CE_shadowRoot = c;
      });
      z && z.get ? b(Element.prototype, z) : I && I.get ? b(HTMLElement.prototype, I) : ua(a, function(c) {
        b(c, { enumerable: true, configurable: true, get: function() {
          return q.call(this, true).innerHTML;
        }, set: function(e) {
          var g = "template" === this.localName, h = g ? this.content : this, k = p.call(document, this.namespaceURI, this.localName);
          for (k.innerHTML = e; 0 < h.childNodes.length; ) u.call(h, h.childNodes[0]);
          for (e = g ? k.content : k; 0 < e.childNodes.length; ) r.call(h, e.childNodes[0]);
        } });
      });
      Element.prototype.setAttribute = function(c, e) {
        if (1 !== this.__CE_state) return B.call(this, c, e);
        var g = A.call(this, c);
        B.call(this, c, e);
        e = A.call(this, c);
        a.attributeChangedCallback(this, c, g, e, null);
      };
      Element.prototype.setAttributeNS = function(c, e, g) {
        if (1 !== this.__CE_state) return F.call(
          this,
          c,
          e,
          g
        );
        var h = E.call(this, c, e);
        F.call(this, c, e, g);
        g = E.call(this, c, e);
        a.attributeChangedCallback(this, e, h, g, c);
      };
      Element.prototype.removeAttribute = function(c) {
        if (1 !== this.__CE_state) return C.call(this, c);
        var e = A.call(this, c);
        C.call(this, c);
        null !== e && a.attributeChangedCallback(this, c, e, null, null);
      };
      D && (Element.prototype.toggleAttribute = function(c, e) {
        if (1 !== this.__CE_state) return D.call(this, c, e);
        var g = A.call(this, c), h = null !== g;
        e = D.call(this, c, e);
        h !== e && a.attributeChangedCallback(this, c, g, e ? "" : null, null);
        return e;
      });
      Element.prototype.removeAttributeNS = function(c, e) {
        if (1 !== this.__CE_state) return G.call(this, c, e);
        var g = E.call(this, c, e);
        G.call(this, c, e);
        var h = E.call(this, c, e);
        g !== h && a.attributeChangedCallback(this, e, g, h, c);
      };
      oa ? d(HTMLElement.prototype, oa) : H && d(Element.prototype, H);
      pa ? f(HTMLElement.prototype, pa) : fa && f(Element.prototype, fa);
      Z(a, Element.prototype, { prepend: ha, append: ia });
      Da(a);
    }
    ;
    var Fa = {};
    function Ga(a) {
      function b() {
        var d = this.constructor;
        var f = document.__CE_registry.C.get(d);
        if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
        var c = f.constructionStack;
        if (0 === c.length) return c = n.call(document, f.localName), Object.setPrototypeOf(c, d.prototype), c.__CE_state = 1, c.__CE_definition = f, R(a, c), c;
        var e = c.length - 1, g = c[e];
        if (g === Fa) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
        c[e] = Fa;
        Object.setPrototypeOf(g, d.prototype);
        R(a, g);
        return g;
      }
      b.prototype = na.prototype;
      Object.defineProperty(HTMLElement.prototype, "constructor", { writable: true, configurable: true, enumerable: false, value: b });
      window.HTMLElement = b;
    }
    ;
    function Ha(a) {
      function b(d, f) {
        Object.defineProperty(d, "textContent", { enumerable: f.enumerable, configurable: true, get: f.get, set: function(c) {
          if (this.nodeType === Node.TEXT_NODE) f.set.call(this, c);
          else {
            var e = void 0;
            if (this.firstChild) {
              var g = this.childNodes, h = g.length;
              if (0 < h && J(this)) {
                e = Array(h);
                for (var k = 0; k < h; k++) e[k] = g[k];
              }
            }
            f.set.call(this, c);
            if (e) for (c = 0; c < e.length; c++) U(a, e[c]);
          }
        } });
      }
      Node.prototype.insertBefore = function(d, f) {
        if (d instanceof DocumentFragment) {
          var c = K(d);
          d = t.call(this, d, f);
          if (J(this)) for (f = 0; f < c.length; f++) S(a, c[f]);
          return d;
        }
        c = d instanceof Element && J(d);
        f = t.call(this, d, f);
        c && U(a, d);
        J(this) && S(a, d);
        return f;
      };
      Node.prototype.appendChild = function(d) {
        if (d instanceof DocumentFragment) {
          var f = K(d);
          d = r.call(this, d);
          if (J(this)) for (var c = 0; c < f.length; c++) S(a, f[c]);
          return d;
        }
        f = d instanceof Element && J(d);
        c = r.call(this, d);
        f && U(a, d);
        J(this) && S(a, d);
        return c;
      };
      Node.prototype.cloneNode = function(d) {
        d = q.call(this, !!d);
        this.ownerDocument.__CE_registry ? V(a, d) : Q(a, d);
        return d;
      };
      Node.prototype.removeChild = function(d) {
        var f = d instanceof Element && J(d), c = u.call(this, d);
        f && U(a, d);
        return c;
      };
      Node.prototype.replaceChild = function(d, f) {
        if (d instanceof DocumentFragment) {
          var c = K(d);
          d = v.call(this, d, f);
          if (J(this)) for (U(a, f), f = 0; f < c.length; f++) S(a, c[f]);
          return d;
        }
        c = d instanceof Element && J(d);
        var e = v.call(this, d, f), g = J(this);
        g && U(a, f);
        c && U(a, d);
        g && S(a, d);
        return e;
      };
      w && w.get ? b(Node.prototype, w) : ta(a, function(d) {
        b(d, { enumerable: true, configurable: true, get: function() {
          for (var f = [], c = this.firstChild; c; c = c.nextSibling) c.nodeType !== Node.COMMENT_NODE && f.push(c.textContent);
          return f.join("");
        }, set: function(f) {
          for (; this.firstChild; ) u.call(this, this.firstChild);
          null != f && "" !== f && r.call(this, document.createTextNode(f));
        } });
      });
    }
    ;
    var O = window.customElements;
    function Ia() {
      var a = new N();
      Ga(a);
      Ca(a);
      Z(a, DocumentFragment.prototype, { prepend: da, append: ea });
      Ha(a);
      Ea(a);
      window.CustomElementRegistry = Y;
      a = new Y(a);
      document.__CE_registry = a;
      Object.defineProperty(window, "customElements", { configurable: true, enumerable: true, value: a });
    }
    O && !O.forcePolyfill && "function" == typeof O.define && "function" == typeof O.get || Ia();
    window.__CE_installPolyfill = Ia;
  }).call(self);

  // src/custom_element.ts
  var CustomElement = class extends HTMLElement {
    _childMutationObserver;
    _attributeMutationObserver;
    sRoot;
    /**
     * Constructor as required for custom elements. This makes sure that the
     * element will only be rendered once the document has finished loading.
     * Because otherwise rendering will most likely start too soon. It also
     * registers a MutationObserver to rerender the element if its content
     * has changed.
     */
    constructor(withoutShadowRoot) {
      super();
      this._childMutationObserver = null;
      this._attributeMutationObserver = null;
      this.sRoot = !withoutShadowRoot ? this.attachShadow({ mode: "open" }) : null;
    }
    /**
     * To be called by all sub-classes at the very end of the constructor to
     * start rendering the element.
     */
    postConstruct() {
      if (document.readyState === "complete") {
        this.render();
      } else {
        window.addEventListener("load", () => this.render());
      }
    }
    /**
     * Internal method to call the subclasses `render()` method. It makes sure
     * to disable all MutationObservers before calling `render()` and enabling
     * them again afterwards, because otherwise we would have an infinite loop.
     *
     * If a custom element wants to rerender its content it also must call this
     * method to prevent an infinite loop.
     * 
     * Also adds global stylesheets for theming to the custom element.
     */
    async render() {
      this._disableObservers();
      await this._render();
      if (this.sRoot) {
        let globalLinkElement = document.createElement("link");
        globalLinkElement.rel = "stylesheet";
        globalLinkElement.href = "global.css";
        this.sRoot.appendChild(globalLinkElement);
        let fontelloLinkElement = document.createElement("link");
        fontelloLinkElement.rel = "stylesheet";
        fontelloLinkElement.href = "fontello/css/fontello.css";
        this.sRoot.appendChild(fontelloLinkElement);
      }
      this._enableObservers();
    }
    /**
     * Internal callback to completely render the custom element. Needs to be
     * overwritten by the sub-classes. Never call it manually!
     */
    _render() {
    }
    /**
     * Internal method to call the subclasses `_onAttributeChanged()` method.
     * It makes sure to disable all MutationObservers before calling
     * `_onAttributeChanged()` and enabling them again afterwards, because
     * otherwise we could produce an infinite loop.
     *
     * @param mutations Array of all detected changes,
     *   see: https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
     */
    async onAttributeChanged(mutations) {
      this._disableObservers();
      this._onAttributeChanged(mutations);
      this._enableObservers();
    }
    /**
     * Internal callback to be overwritten by subclasses. This allows a custom
     * element to detect, when one of its HTML attributes has changed. The
     * default behavior, if the method is not overridden, is to simply rerender
     * the element. Elements may however override this method to implement a
     * smarter logic to save rendering time.
     */
    _onAttributeChanged(_mutations) {
      return this.render();
    }
    /**
     * Disable all mutation observers to prevent an infinite loop while modifying
     * the DOM tree. This doesn't need to be called inside the inherited `_render()`
     * method. But it can be called on other places by the subclasses to prevent
     * infinite loops.
     */
    _disableObservers() {
      if (this._childMutationObserver) this._childMutationObserver.disconnect();
      if (this._attributeMutationObserver) this._attributeMutationObserver.disconnect();
    }
    /**
     * Reenable all mutation observers again. This doesn't need to be called inside
     * the inherited `_render()` method. But it can be called on other places by
     * the subclasses where they also called `_disableObservers()` to reenable
     * them again.
     */
    _enableObservers() {
      this._disableObservers();
      this._childMutationObserver = new MutationObserver((mutations, observer) => this.render());
      this._childMutationObserver.observe(this, { childList: true, subtree: true, characterData: true });
      this._attributeMutationObserver = new MutationObserver((mutations, observer) => this.onAttributeChanged(mutations));
      this._attributeMutationObserver.observe(this, { attributes: true, attributeOldValue: true, subtree: false });
    }
    /**
     * Utility method to copy all HTML attributes of the src element over
     * to the dst element. To be called by the sub-classes, when needed.
     */
    copyAttributes(src, dst) {
      for (let i = 0; i < src.attributes.length; i++) {
        let item = src.attributes[i];
        dst.setAttribute(item.name, item.value);
      }
    }
    /**
     * Utility method to be called by sub-classes to adapt to the current
     * screen size. The way this works is to use a <wpvs-detect-screen-size>
     * element, that must already be present on the page, to query the current
     * screen type and to switch between two display modes based on whether the
     * size is lower or greater-than-equal a given break point size. The chosen
     * display mode is then set as a CSS class to the given container element.
     *
     * The config object takes the following properties, which are all optional:
     *
     * +-------------------+--------------+------------------------------------+
     * | PROPERTY          | DEFAULT      | DESCRIPTION                        |
     * +-------------------+--------------+------------------------------------+
     * | defaultBreakpoint | "tablet"     | The minimum screen size needed to  |
     * |                   |              | to apply the `aboveMode` CSS class |
     * +-------------------+--------------+------------------------------------+
     * | defaultMode       | "responsive" | The default mode to assume, when   |
     * |                   |              | the element's `data-mode`          |
     * |                   |              | attribute is not set.              |
     * +-------------------+--------------+------------------------------------+
     * | responsiveMode    | "responsive" | The `data-mode` attribute value    |
     * |                   |              | which allows the element to choose |
     * |                   |              | it's display mode itself based on  |
     * |                   |              | current viewport size.             |
     * +-------------------+--------------+------------------------------------+
     * | belowMode         | "vertical"   | The CSS class to apply, when the   |
     * |                   |              | viewport size is below the break   |
     * |                   |              | point.                             |
     * +-------------------+--------------+------------------------------------+
     * | aboveMode         | "horizontal" | The CSS class to apply, when the   |
     * |                   |              | viewport size is equal to or       |
     * |                   |              | greater than the break point.      |
     * +-------------------+--------------+------------------------------------+
     *
     * The default is to allow for `data-mode` the following values
     *
     *  * "responsive" (default)
     *  * "vertical" (small screens)
     *  * "horizontal" (large screens)
     *
     * and to switch to large display for screen class "tablet" and above.
     *
     * @param containerElement
     * HTML element to apply the detected CSS classes to.
     *
     * @param detectScreenSizeElement
     * Already existing element <wpvs-detect-screen-size> to be queried for the
     * viewport size.
     *
     * @param config
     * Configuration object, see above
     *
     * @returns The chosen display mode
     */
    adaptToScreenSize(containerElement, detectScreenSizeElement, config) {
      if (!containerElement) return;
      if (!config) config = {};
      let defaultBreakpoint = config.defaultBreakpoint ?? "tablet";
      let defaultMode = config.defaultMode ?? "responsive";
      let responsiveMode = config.responsiveMode ?? "responsive";
      let belowMode = config.belowMode ?? "vertical";
      let aboveMode = config.aboveMode ?? "horizontal";
      this.dataset.mode = (this.dataset.mode || defaultMode).toLowerCase();
      if (this.dataset.mode == responsiveMode && !detectScreenSizeElement) {
        this.dataset.mode = aboveMode;
      }
      this.dataset.breakpoint = (this.dataset.breakpoint || defaultBreakpoint).toLowerCase();
      let displayMode = "";
      switch (this.dataset.mode) {
        case responsiveMode:
          if (detectScreenSizeElement.compareScreenSize(this.dataset.breakpoint) < 0) {
            displayMode = belowMode;
          } else {
            displayMode = aboveMode;
          }
          break;
        case aboveMode:
        case belowMode:
          displayMode = this.dataset.mode;
          break;
        default:
          displayMode = aboveMode;
      }
      containerElement.classList.remove(aboveMode);
      containerElement.classList.remove(belowMode);
      containerElement.classList.add(displayMode);
      return displayMode;
    }
  };
  var custom_element_default = CustomElement;

  // src/wpvs-columns/wpvs-columns.html
  var wpvs_columns_default = "<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n/* Use column layout */\n.container {\n    display: block;\n    margin: 0;\n    padding: 0;\n\n    column-count: 1; /* Set via JavaScript */\n    column-gap: 2em;\n    orphans: 2;\n    widows: 2;\n}\n\n.container h1,\n.container h2,\n.container h3,\n.container h4,\n.container h5,\n.container h6 {\n    break-after: avoid;\n}\n</style>\n";

  // src/wpvs-columns/wpvs-columns.ts
  var WpvsColumnsElement = class _WpvsColumnsElement extends custom_element_default {
    static #templates;
    static #detectScreenSizeElement = null;
    containerElement;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_columns_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      if (!_WpvsColumnsElement.#detectScreenSizeElement) {
        _WpvsColumnsElement.#detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");
      }
      if (_WpvsColumnsElement.#detectScreenSizeElement) {
        _WpvsColumnsElement.#detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
      }
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      this.sRoot.replaceChildren();
      let styleElement = _WpvsColumnsElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      this.containerElement = document.createElement("container");
      this.containerElement.classList.add("container");
      this.containerElement.append(...this.childNodes);
      this.sRoot.appendChild(this.containerElement);
      this._updateDisplayMode();
    }
    /**
     * Update element content when attribute values change.
     * @param mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "data-mode":
          case "data-breakpoint":
          case "data-columns":
            this._updateDisplayMode();
            break;
        }
      }
    }
    /**
     * Decide whether to display the two titles horizontally or vertically.
     * This depends on the current value of the `data-mode` and `data-breakpoint`
     * attributes as described in the class documentation above.
     */
    _updateDisplayMode() {
      let containerElement = this.sRoot.querySelector(".container");
      if (!containerElement) return;
      let columns = this.dataset.columns || 3;
      let mode = this.adaptToScreenSize(containerElement, _WpvsColumnsElement.#detectScreenSizeElement);
      if (mode != "horizontal") {
        columns = 1;
      }
      this.containerElement.style.columnCount = String(columns);
    }
  };
  window.customElements.define("wpvs-columns", WpvsColumnsElement);

  // src/wpvs-container/wpvs-container.html
  var wpvs_container_default = "<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n.container {\n    margin: 0;\n    padding: 0;\n\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-items: stretch;\n    gap: 1rem;\n}\n\n.container > * {\n    margin: 0;\n}\n\n.container.horizontal {\n    flex-direction: row;\n}\n</style>\n";

  // src/wpvs-container/wpvs-container.ts
  var WpvsContainerElement = class _WpvsContainerElement extends custom_element_default {
    static #templates;
    static #detectScreenSizeElement = null;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_container_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      if (!_WpvsContainerElement.#detectScreenSizeElement) {
        _WpvsContainerElement.#detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");
      }
      if (_WpvsContainerElement.#detectScreenSizeElement) {
        _WpvsContainerElement.#detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
      }
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      this.sRoot.replaceChildren();
      let styleElement = _WpvsContainerElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      let containerElement = document.createElement("container");
      containerElement.classList.add("container");
      containerElement.append(...this.childNodes);
      this.sRoot.appendChild(containerElement);
      this._updateDisplayMode();
    }
    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "data-mode":
          case "data-breakpoint":
            this._updateDisplayMode();
            break;
        }
      }
    }
    /**
     * Decide whether to display the two titles horizontally or vertically.
     * This depends on the current value of the `data-mode` and `data-breakpoint`
     * attributes as described in the class documentation above.
     */
    _updateDisplayMode() {
      let containerElement = this.sRoot.querySelector(".container");
      if (!containerElement) return;
      let mode = this.adaptToScreenSize(containerElement, _WpvsContainerElement.#detectScreenSizeElement);
    }
  };
  window.customElements.define("wpvs-container", WpvsContainerElement);

  // src/wpvs-detect-screen-size/wpvs-detect-screen-size.ts
  var WpvsDetectScreenSizeElement = class extends custom_element_default {
    divPhone;
    divTablet;
    divScreen;
    divHires;
    _prevScreenSize = "";
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super(true);
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      this.replaceChildren();
      this.divPhone = document.createElement("div");
      this.divPhone.classList.add("screen-size-phone");
      this.appendChild(this.divPhone);
      this.divTablet = document.createElement("div");
      this.divTablet.classList.add("screen-size-screen");
      this.appendChild(this.divTablet);
      this.divScreen = document.createElement("div");
      this.divScreen.classList.add("screen-size-tablet");
      this.appendChild(this.divScreen);
      this.divHires = document.createElement("div");
      this.divHires.classList.add("screen-size-hires");
      this.appendChild(this.divHires);
      this._raiseScreenSizeChanged();
      this._prevScreenSize = this.screenSize;
      this.dataset.screenSize = this.screenSize;
      window.addEventListener("resize", (event) => {
        if (this.screenSize == this._prevScreenSize) return;
        this._raiseScreenSizeChanged();
        this._prevScreenSize = this.screenSize;
        this.dataset.screenSize = this.screenSize;
      });
    }
    /**
     * Getter method to retrieve the current screen size. Returns one of the
     * following strings: phone, tablet, screen, hires, unknown.
     */
    get screenSize() {
      if (window.getComputedStyle(this.divPhone).display.toLowerCase() != "none") {
        return "phone";
      } else if (getComputedStyle(this.divTablet).display.toLowerCase() != "none") {
        return "tablet";
      } else if (getComputedStyle(this.divScreen).display.toLowerCase() != "none") {
        return "screen";
      } else if (getComputedStyle(this.divHires).display.toLowerCase() != "none") {
        return "hires";
      } else {
        return "unknown";
      }
    }
    /**
     * Compares the given screen size name to the current screen size.
     *
     * @param screenSize Screen size to compare (`phone`, `tablet`, …)
     * @returns -1 if current screen size is smaller,
     *   1 if the current screen size is larger,
     *   0 otherwise (both are equal or an unknown string as given)
     */
    compareScreenSize(screenSize) {
      let ordering = ["phone", "tablet", "screen", "hires"];
      let currentIndex = ordering.indexOf(this.screenSize);
      let givenIndex = ordering.indexOf(screenSize);
      if (currentIndex < 0 || givenIndex < 0 || currentIndex == givenIndex) {
        return 0;
      } else if (currentIndex < givenIndex) {
        return -1;
      } else {
        return 1;
      }
    }
    /**
     * Internal method to raise a "screen-size-changed" custom event. The
     * event will carry the attribute "screenSize" with the current size
     * in its detail data.
     */
    _raiseScreenSizeChanged() {
      let event = new CustomEvent("screen-size-changed", {
        detail: {
          screenSize: this.screenSize
        }
      });
      this.dispatchEvent(event);
    }
  };
  window.customElements.define("wpvs-detect-screen-size", WpvsDetectScreenSizeElement);

  // src/wpvs-header/wpvs-header.html
  var wpvs_header_default = '<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n.container {\n    padding: 1rem;\n\n    color: var(--header-fg);\n    background: var(--header-bg);\n    box-shadow: 0 1px 1px 0.5px rgba(0,0,0, 0.1);\n}\n\n.line1 {\n    display: flex;\n    flex-wrap: wrap;\n    margin-bottom: 0.25em;\n}\n\n.site-title {\n    flex-grow: 1;\n\n    font-family: "3dumbregular", fantasy;\n    font-size: 120%;\n    font-weight: bold;\n    color: var(--logo-color);\n}\n\n.page-title {\n    font-size: 120%;\n    font-weight: bold;\n}\n\n.content {\n}\n\n/* Horizontal mode (large screen) */\n.container.horizontal {\n    box-shadow: 0 2px 2px 1px rgba(0,0,0, 0.1);\n    font-size: 125%;\n}\n</style>\n\n<template id="header-template">\n    <header class="container">\n        <div class="line1">\n            <div class="site-title"></div>\n            <div class="page-title"></div>\n        </div>\n        <div class="content"></div>\n    </header>\n</template>\n';

  // src/wpvs-header/wpvs-header.ts
  var WpvsHeaderElement = class _WpvsHeaderElement extends custom_element_default {
    static #templates;
    static #detectScreenSizeElement = null;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_header_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      if (!_WpvsHeaderElement.#detectScreenSizeElement) {
        _WpvsHeaderElement.#detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");
      }
      if (_WpvsHeaderElement.#detectScreenSizeElement) {
        _WpvsHeaderElement.#detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
      }
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      let headerTemplate = _WpvsHeaderElement.#templates.querySelector("#header-template").cloneNode(true);
      this.sRoot.replaceChildren(...headerTemplate.content.childNodes);
      let styleElement = _WpvsHeaderElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      this._renderSiteTitle();
      this._renderPageTitle();
      this.sRoot.querySelector(".content").replaceChildren(...this.childNodes);
      this._updateDisplayMode();
    }
    /**
     * Update the visible site title based on the `data-site-title` attribute.
     */
    _renderSiteTitle() {
      let element = this.sRoot.querySelector(".site-title");
      if (!element) return;
      element.textContent = this.dataset.siteTitle ?? "";
    }
    /**
     * Update the visible site title based on the `data-page-title` attribute.
     */
    _renderPageTitle() {
      let element = this.sRoot.querySelector(".page-title");
      if (!element) return;
      element.textContent = this.dataset.pageTitle ?? "";
    }
    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "data-site-title":
            this._renderSiteTitle();
            break;
          case "data-page-title":
            this._renderPageTitle();
            break;
          case "data-mode":
          case "data-breakpoint":
            this._updateDisplayMode();
            break;
        }
      }
    }
    /**
     * Decide whether to display the two titles horizontally or vertically.
     * This depends on the current value of the `data-mode` and `data-breakpoint`
     * attributes as described in the class documentation above.
     */
    _updateDisplayMode() {
      let containerElement = this.sRoot.querySelector(".container");
      if (!containerElement) return;
      let mode = this.adaptToScreenSize(containerElement, _WpvsHeaderElement.#detectScreenSizeElement);
    }
  };
  window.customElements.define("wpvs-header", WpvsHeaderElement);

  // src/wpvs-icon-link/wpvs-icon-link.ts
  var WpvsIconLinkElement = class extends custom_element_default {
    /**
     * Constructor as required for custom elements.
     */
    constructor() {
      super();
      this.postConstruct();
    }
    /**
     * Render link content
     */
    async _render() {
      this.sRoot.replaceChildren();
      let aElement = document.createElement("a");
      aElement.href = this.getAttribute("href") || "";
      aElement.target = this.getAttribute("target") || "";
      this.sRoot.appendChild(aElement);
      aElement.style.display = "flex";
      aElement.style.flexDirection = "row";
      aElement.style.justifyContent = "flex-start";
      aElement.style.alignItems = "top";
      if (this.getAttribute("icon")) {
        let iElement = document.createElement("i");
        iElement.classList.add(this.getAttribute("icon"));
        aElement.appendChild(iElement);
      }
      if (this.getAttribute("label")) {
        let spanElement = document.createElement("span");
        spanElement.style.flex = "1";
        spanElement.textContent = this.getAttribute("label");
        aElement.appendChild(spanElement);
      }
    }
    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "icon":
          case "label":
          case "href":
          case "target":
            this._render();
            break;
        }
      }
    }
  };
  window.customElements.define("wpvs-icon-link", WpvsIconLinkElement);

  // src/wpvs-image/wpvs-image.html
  var wpvs_image_default = "<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\nimg {\n    display: inline-block;\n\n    box-shadow: 0 1px 1px 0.5px rgba(0,0,0, 0.03);\n    border: 1px solid var(--separator-fg);\n    border-radius: 0.1em;\n}\n\nimg.horizontal {\n    height: 15em;\n    width: auto;\n}\n\nimg.vertical {\n    width: 100% !important;\n    height: auto !important;\n}\n</style>\n";

  // src/wpvs-image/wpvs-image.ts
  var WpvsImageElement = class _WpvsImageElement extends custom_element_default {
    static #templates;
    static #detectScreenSizeElement = null;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_image_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      if (!_WpvsImageElement.#detectScreenSizeElement) {
        _WpvsImageElement.#detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");
      }
      if (_WpvsImageElement.#detectScreenSizeElement) {
        _WpvsImageElement.#detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
      }
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    async _render() {
      this.sRoot.replaceChildren();
      let styleElement = _WpvsImageElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      if (!this.dataset.src) return;
      let imageElement = document.createElement("img");
      imageElement.src = this.dataset.src;
      imageElement.alt = this.dataset.alt ?? "";
      if (this.dataset.height) {
        imageElement.style.height = this.dataset.height;
      }
      this.sRoot.appendChild(imageElement);
      this._updateDisplayMode();
    }
    /**
     * Update element content when attribute values change.
     * @param mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "data-breakpoint":
            this._updateDisplayMode();
            break;
        }
      }
    }
    /**
     * Decide how to display the image. This depends on the current value of
     * the `data-mode` and `data-breakpoint` attributes as described in the
     * class documentation above.
     */
    _updateDisplayMode() {
      let containerElement = this.sRoot.querySelector("img");
      if (!containerElement) return;
      let mode = this.adaptToScreenSize(containerElement, _WpvsImageElement.#detectScreenSizeElement);
    }
  };
  window.customElements.define("wpvs-image", WpvsImageElement);

  // src/wpvs-info/wpvs-info.html
  var wpvs_info_default = "<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n.container {\n    margin: 1rem 0 1rem 0;\n    padding: 0.5rem;\n\n    color: var(--info-fg);\n    background: var(--info-bg);\n    box-shadow: 0 1px 1px 0.5px rgba(0,0,0, 0.03);\n    border: 1px solid var(--separator-fg);\n    border-radius: 0.1em;\n\n    max-width: 60em;\n}\n</style>\n";

  // src/wpvs-info/wpvs-info.ts
  var WpvsInfoElement = class _WpvsInfoElement extends custom_element_default {
    static #templates;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_info_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    async _render() {
      this.sRoot.replaceChildren();
      let styleElement = _WpvsInfoElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      let containerElement = document.createElement("div");
      containerElement.classList.add("container");
      containerElement.append(...this.childNodes);
      this.sRoot.appendChild(containerElement);
    }
  };
  window.customElements.define("wpvs-info", WpvsInfoElement);

  // src/wpvs-material/wpvs-material.html
  var wpvs_material_default = '<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n/* Container border */\n.container {\n    cursor: pointer;\n    border: 1px solid transparent;\n}\n\n.container.expanded {\n    background: var(--card-bg);\n    box-shadow: 0 1px 1px 0.5px rgba(0,0,0, 0.03);\n    border: 1px solid var(--separator-fg);\n    padding: 1em;\n}\n\n/* Icon and label */\n.header {\n    display: flex;\n    justify-content: flex-start;\n    align-items: flex-start;\n    gap: 0.25em;\n}\n\n.header > .name {\n    flex: 1;\n}\n\n.header i {\n    display: inline-block;\n    background: var(--card_circle_bg);\n    color: var(--card_circle_fg);\n    border-radius: 100%;\n    padding: 0.1em;\n}\n\n.container:hover > .header > .name {\n    text-decoration: underline;\n}\n\n.container.expanded > .header > .name {\n    text-decoration: none !important;\n    font-weight: bold;\n}\n\n/* Card content */\n.body {\n    overflow: hidden;\n    width: 0;\n    height: 0;\n}\n\n.container.expanded .body {\n    width: auto;\n    height: auto;\n}\n</style>\n\n<template id="container-template">\n    <div class="container">\n        <div class="header">\n            <i></i>\n            <span class="name"></span>\n        </div>\n\n        <div class="body"></div>\n    </div>\n</template>\n';

  // src/wpvs-material/wpvs-material.ts
  var WpvsMaterialElement = class _WpvsMaterialElement extends custom_element_default {
    static #templates;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_material_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the HTML templates.
     */
    constructor() {
      super();
      this.postConstruct();
    }
    /**
     * Render link content
     */
    async _render() {
      let containerTemplate = _WpvsMaterialElement.#templates.querySelector("#container-template").cloneNode(true);
      this.sRoot.replaceChildren(...containerTemplate.content.childNodes);
      let containerElement = this.sRoot.querySelector(".container");
      let styleElement = _WpvsMaterialElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      this._renderHeader();
      let bodyElement = containerElement.querySelector(".body");
      bodyElement.replaceChildren(...this.childNodes);
      if (this.getAttribute("always-open") === "true") {
        containerElement.classList.add("expanded");
      } else {
        let headerElement = containerElement.querySelector(".header");
        headerElement.addEventListener("click", () => {
          if (containerElement.classList.contains("expanded")) {
            containerElement.classList.remove("expanded");
          } else {
            containerElement.classList.add("expanded");
          }
        });
      }
    }
    /**
     * Update the card header based on the `icon` and `name` attributes.
     */
    _renderHeader() {
      let headerElement = this.sRoot.querySelector(".container > .header");
      if (!headerElement) return;
      headerElement.querySelector("i").className = this.getAttribute("icon") || "";
      headerElement.querySelector(".name").textContent = this.getAttribute("name") || "";
    }
    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "icon":
          case "name":
            this._renderHeader();
            break;
        }
      }
    }
  };
  window.customElements.define("wpvs-material", WpvsMaterialElement);

  // src/wpvs-material-card/wpvs-material-card.html
  var wpvs_material_card_default = '<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n.container {\n    color: var(--card-fg);\n    background: var(--card-bg);\n    box-shadow: 0 1px 1px 0.5px rgba(0,0,0, 0.03);\n    border: 1px solid var(--separator-fg);\n    border-radius: 0.1em;\n}\n\n.type,\n.name,\n.meta {\n    padding: 0.5rem;\n}\n\n.type {\n    color: var(--card-light-fg);\n    font-size: 90%;\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n}\n\n.name {\n    font-weight: bold;\n    padding-bottom: 0 !important;\n}\n\n.meta {\n    display: flex;\n    flex-wrap: wrap;\n    font-size: 90%;\n    padding-bottom: 0 !important;\n    gap: 1em;\n}\n\n.value {\n    color: var(--card-light-fg);\n}\n</style>\n\n<template id="card-template">\n    <div class="container">\n        <div class="name"></div>\n        <div class="type"></div>\n        <div class="meta"></div>\n        <div class="links"></div>\n    </div>\n</template>\n\n<template id="meta-template">\n    <div>\n        <span class="label"></span>\n        <span class="value"></span>\n    </div>\n</template>\n\n<template id="link-template">\n    <a class="button" href="" target="_blank">\n        <i></i>\n        <span class="label"></span>\n    </a>\n</template>\n';

  // src/wpvs-material-card/wpvs-material-card.ts
  var WpvsMaterialCardElement = class _WpvsMaterialCardElement extends custom_element_default {
    static #templates;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_material_card_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      let cardTemplate = _WpvsMaterialCardElement.#templates.querySelector("#card-template").cloneNode(true);
      this.sRoot.replaceChildren(...cardTemplate.content.childNodes);
      let styleElement = _WpvsMaterialCardElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      this._renderCardType();
      this._renderCardName();
      let metaTemplate = _WpvsMaterialCardElement.#templates.querySelector("#meta-template");
      let metaParentElement = this.sRoot.querySelector(".meta");
      for (let metaElement of this.querySelectorAll("material-meta")) {
        let metaChildElement = metaTemplate.content.firstElementChild.cloneNode(true);
        metaParentElement.appendChild(metaChildElement);
        metaChildElement.querySelector(".label").textContent = metaElement.dataset.label + ":";
        metaChildElement.querySelector(".value").textContent = metaElement.dataset.value ?? "";
      }
      let linkTemplate = _WpvsMaterialCardElement.#templates.querySelector("#link-template");
      let linkParentElement = this.sRoot.querySelector(".links");
      for (let linkElement of this.querySelectorAll("material-link")) {
        let aElement = linkTemplate.content.firstElementChild.cloneNode(true);
        linkParentElement.appendChild(aElement);
        aElement.href = linkElement.dataset.href ?? "";
        aElement.querySelector("i").classList.add(linkElement.dataset.icon ?? "");
        aElement.querySelector(".label").textContent = linkElement.dataset.label ?? "";
      }
    }
    /**
     * Update the card type header based on the `data-type` attribute.
     */
    _renderCardType() {
      let element = this.sRoot.querySelector(".type");
      if (!element) return;
      element.textContent = this.dataset.type ?? "";
    }
    /**
     * Update the card name header based on the `data-name` attribute.
     */
    _renderCardName() {
      let element = this.sRoot.querySelector(".name");
      if (!element) return;
      element.textContent = this.dataset.name ?? "";
    }
    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "data-type":
            this._renderCardType();
            break;
          case "data-name":
            this._renderCardName();
            break;
        }
      }
    }
  };
  window.customElements.define("wpvs-material-card", WpvsMaterialCardElement);

  // src/wpvs-metadata/wpvs-metadata.html
  var wpvs_metadata_default = '<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n/* Arrange with flexbox */\n.container {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    column-gap: 1em;\n\n    margin-top: 0.5em;\n    margin-bottom: 1em;\n\n    font-size: 90%;\n    color: var(--card-fg);\n}\n\n.value {\n    color: var(--card-light-fg);\n}\n</style>\n\n<template id="container-template">\n    <div class="container"></div>\n</template>\n\n<template id="value-template">\n    <div>\n        <span class="label"></span>\n        <span class="value"></span>\n    </div>\n</template>\n';

  // src/wpvs-metadata/wpvs-metadata.ts
  var WpvsMetadataElement = class _WpvsMetadataElement extends custom_element_default {
    static #templates;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_metadata_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the HTML templates.
     */
    constructor() {
      super();
      this.postConstruct();
    }
    /**
     * Render link content
     */
    async _render() {
      let containerTemplate = _WpvsMetadataElement.#templates.querySelector("#container-template").cloneNode(true);
      this.sRoot.replaceChildren(...containerTemplate.content.childNodes);
      let containerElement = this.sRoot.querySelector(".container");
      let styleElement = _WpvsMetadataElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      let valueTemplate = _WpvsMetadataElement.#templates.querySelector("#value-template");
      for (let valueElement of this.querySelectorAll("metadata-value")) {
        let valueChildElement = valueTemplate.content.firstElementChild.cloneNode(true);
        containerElement.appendChild(valueChildElement);
        valueChildElement.querySelector(".label").textContent = (valueElement.getAttribute("label") || "") + ":";
        valueChildElement.querySelector(".value").textContent = valueElement.getAttribute("value") || "";
      }
    }
  };
  window.customElements.define("wpvs-metadata", WpvsMetadataElement);

  // src/wpvs-nav-bar/wpvs-nav-bar.html
  var wpvs_nav_bar_default = '<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\na, a:visited {\n    color: var(--normal-fg) !important;\n    text-decoration: none;\n}\n\na:hover {\n    color: var(--link-hover-fg) !important;\n}\n\nul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n\n    display: flex;\n    flex-wrap: wrap;\n}\n\nli {\n    margin-right: 0.5em;\n}\n\nli::after {\n    content: "/";\n    color: var(--separator-fg);\n    margin-left: 0.5em;\n}\n\nli:last-child::after {\n    content: "";\n    margin-left: 0;\n}\n</style>\n\n<template>\n    <nav class="container">\n        <ul>\n        </ul>\n    </nav>\n</template>\n';

  // src/wpvs-nav-bar/wpvs-nav-bar.ts
  var WpvsNavBarElement = class _WpvsNavBarElement extends custom_element_default {
    static #templates;
    static #detectScreenSizeElement = null;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_nav_bar_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      if (!_WpvsNavBarElement.#detectScreenSizeElement) {
        _WpvsNavBarElement.#detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");
      }
      if (_WpvsNavBarElement.#detectScreenSizeElement) {
        _WpvsNavBarElement.#detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
      }
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      this.sRoot.replaceChildren();
      let headerTemplate = _WpvsNavBarElement.#templates.querySelector("template").cloneNode(true);
      this.sRoot.replaceChildren(...headerTemplate.content.childNodes);
      let styleElement = _WpvsNavBarElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      let ulElement = this.sRoot.querySelector("ul");
      for (let i = 0; i < this.children.length; i++) {
        let liElement = document.createElement("li");
        liElement.appendChild(this.children[i].cloneNode(true));
        ulElement.appendChild(liElement);
      }
      this._updateDisplayMode();
    }
    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "data-mode":
          case "data-breakpoint":
            this._updateDisplayMode();
            break;
        }
      }
    }
    /**
     * Decide whether to display the two titles horizontally or vertically.
     * This depends on the current value of the `data-mode` and `data-breakpoint`
     * attributes as described in the class documentation above.
     */
    _updateDisplayMode() {
      let containerElement = this.sRoot.querySelector(".container");
      if (!containerElement) return;
      let mode = this.adaptToScreenSize(containerElement, _WpvsNavBarElement.#detectScreenSizeElement);
    }
  };
  window.customElements.define("wpvs-nav-bar", WpvsNavBarElement);

  // src/wpvs-page/wpvs-page.ts
  var WpvsPageElement = class extends custom_element_default {
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    async _render() {
      this.sRoot.replaceChildren();
      if (this.dataset.src) {
        let pageContent = await fetch(this.dataset.src, { cache: "no-cache" });
        this.sRoot.innerHTML = await pageContent.text();
      }
    }
  };
  window.customElements.define("wpvs-page", WpvsPageElement);

  // src/wpvs-router/wpvs-router.ts
  var WpvsRouterElement = class extends custom_element_default {
    _routes;
    _fallback;
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      this._routes = [];
      this._fallback = void 0;
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      this.sRoot.replaceChildren();
      for (let scriptElement of this.querySelectorAll("script")) {
        let callback = (url) => {
          this.sRoot.innerHTML = scriptElement.innerHTML;
          let event = new CustomEvent("route-changed", { detail: { route: url, sRoot: this.sRoot } });
          this.dispatchEvent(event);
        };
        if (scriptElement.dataset.route) {
          this._routes.push({ url: scriptElement.dataset.route, show: callback });
        } else if (scriptElement.dataset.routeFallback) {
          this._fallback = callback;
        }
      }
      window.addEventListener("hashchange", () => this._handleRouting());
      this._handleRouting();
    }
    /**
     * The actual single page router. Analyzes the URL hash tag to find a route and then
     * calls the corresponding callback function. Can you believe it? A full SPA router
     * in six lines with no external dependencies. Want regular expressions? Just change
     * three lines. Look, young folks: That's how you pull it off! :-)
     */
    _handleRouting() {
      let url = location.hash.slice(1);
      if (url.length === 0) url = "/";
      let route = this._routes.find((p) => p.url === url);
      if (route) route.show(url);
      else if (this._fallback) this._fallback(url);
      else console.error(`No route found for URL '${url}'`);
    }
  };
  window.customElements.define("wpvs-router", WpvsRouterElement);

  // src/wpvs-tabs/wpvs-tabs.html
  var wpvs_tabs_default = "<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n/* Mobile version: vertical */\n.button-bar {\n    border: 1px solid var(--primary-bg);\n    border-radius: 0.1em;\n\n    list-style: none;\n    margin: 0 0 1em 0;\n    padding: 0;\n\n    background: var(--secondary-bg);\n    color: var(--secondary-fg);\n\n    overflow: hidden;\n}\n\n.tab-button,\n.dropdown {\n    padding: 0.5em;\n    cursor: pointer;\n    transition: var(--transition-background), var(--transition-color);\n}\n\n.tab-button[active],\n.tab-button:hover {\n    background-color: var(--primary-bg);\n    color: var(--primary-fg);\n}\n\n.page:not([active]) {\n    display: none;\n}\n\n/* Screen version: horizontal */\n.container.horizontal .button-bar-outer {\n    display: inline-block;\n}\n\n.container.horizontal .button-bar {\n    display: flex;\n    flex-wrap: wrap;\n}\n\n/* Dropdown menu for vertical mode */\n.container.horizontal .dropdown {\n    display: none;\n}\n\n.dropdown {\n    display: flex;\n\n    border: 1px solid var(--primary-bg);\n    border-radius: 0.1em;\n\n    background: var(--primary-bg);\n    color: var(--primary-fg);\n}\n\n.dropdown .active-tab-title {\n    flex: 1;\n}\n\n.container.vertical .closed {\n    height: 0;\n    border-width: 0px;\n}\n</style>\n";

  // src/wpvs-tabs/wpvs-tabs.ts
  var WpvsTabsElement = class _WpvsTabsElement extends custom_element_default {
    static #templates;
    static #detectScreenSizeElement = null;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_tabs_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      if (!_WpvsTabsElement.#detectScreenSizeElement) {
        _WpvsTabsElement.#detectScreenSizeElement = document.querySelector("wpvs-detect-screen-size");
      }
      if (_WpvsTabsElement.#detectScreenSizeElement) {
        _WpvsTabsElement.#detectScreenSizeElement.addEventListener("screen-size-changed", () => this._updateDisplayMode());
      }
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      this.sRoot.replaceChildren();
      let styleElement = _WpvsTabsElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      let containerElement = document.createElement("div");
      containerElement.classList.add("container");
      this.sRoot.appendChild(containerElement);
      let dropdownParentElement = document.createElement("div");
      dropdownParentElement.classList.add("dropdown");
      containerElement.appendChild(dropdownParentElement);
      let dropdownTitleElement = document.createElement("div");
      dropdownTitleElement.classList.add("active-tab-title");
      dropdownParentElement.appendChild(dropdownTitleElement);
      let dropdownArrowElement = document.createElement("div");
      dropdownArrowElement.classList.add("arrow");
      dropdownArrowElement.classList.add("icon-down-open");
      dropdownParentElement.appendChild(dropdownArrowElement);
      let divElement = document.createElement("div");
      divElement.classList.add("button-bar-outer");
      containerElement.appendChild(divElement);
      let ulElement = document.createElement("ul");
      ulElement.classList.add("button-bar");
      divElement.appendChild(ulElement);
      dropdownParentElement.addEventListener("click", () => {
        dropdownArrowElement.classList.remove("icon-down-open");
        dropdownArrowElement.classList.remove("icon-up-open");
        if (ulElement.classList.contains("closed")) {
          ulElement.classList.remove("closed");
          dropdownArrowElement.classList.add("icon-up-open");
        } else {
          ulElement.classList.add("closed");
          dropdownArrowElement.classList.add("icon-down-open");
        }
      });
      let index = -1;
      for (let pageElement of this.querySelectorAll("tab-page")) {
        let active = null;
        index++;
        let tabId = pageElement.dataset.tabId || "";
        let pageTitle = pageElement.dataset.title || "";
        let liElement = document.createElement("li");
        ulElement.appendChild(liElement);
        liElement.classList.add("tab-button");
        liElement.textContent = pageTitle;
        liElement.dataset.index = String(index);
        liElement.dataset.tabId = tabId;
        active = pageElement.getAttribute("active");
        if (active != null) liElement.setAttribute("active", active);
        liElement.addEventListener("click", (event) => {
          this._switchToPage(event.target.dataset.index ?? "");
        });
        let divElement2 = document.createElement("div");
        divElement2.classList.add("page");
        divElement2.dataset.index = String(index);
        divElement2.dataset.tabId = tabId;
        divElement2.append(...pageElement.childNodes);
        containerElement.appendChild(divElement2);
        if (active != null) {
          divElement2.setAttribute("active", active);
        }
        this._updateDisplayMode();
      }
      if (this.dataset.activeTab) {
        this._switchToPageById(this.dataset.activeTab);
      }
    }
    /**
     * Update element content when attribute values change.
     * @param mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
      for (let mutation of mutations) {
        switch (mutation.attributeName) {
          case "data-active-tab":
            this._switchToPageById(this.dataset.activeTab ?? "");
            break;
          case "data-mode":
          case "data-breakpoint":
            this._updateDisplayMode();
            break;
        }
      }
    }
    /**
     * Internal method to switch the visible page. This will update all internal
     * DOM elements as well as the <wpvs-tabs> element itself. It also raises
     * a `tab-changed` event.
     *
     * @param index Index of the new visible page, starting with zero
     */
    _switchToPage(index) {
      this.sRoot.querySelectorAll(".tab-button").forEach((e) => e.removeAttribute("active"));
      this.sRoot.querySelectorAll(`.tab-button[data-index="${index}"]`).forEach((e) => e.setAttribute("active", ""));
      this.sRoot.querySelectorAll(".page").forEach((e) => e.removeAttribute("active"));
      this.sRoot.querySelectorAll(`.page[data-index="${index}"]`).forEach((e) => e.setAttribute("active", ""));
      let tabId = "";
      let pageDiv = this.sRoot.querySelector(`.page[data-index="${index}"]`);
      if (pageDiv && pageDiv.dataset.tabId) tabId = pageDiv.dataset.tabId;
      this.dataset.activeTab = tabId;
      let buttonElement = this.sRoot.querySelector(`.tab-button[data-index="${index}"]`);
      if (buttonElement) {
        this.sRoot.querySelectorAll(".active-tab-title").forEach((e) => e.innerHTML = buttonElement.innerHTML);
      }
      let buttonBarElement = this.sRoot.querySelector(".button-bar");
      if (buttonBarElement) buttonBarElement.classList.add("closed");
      let event = new CustomEvent("tab-changed", {
        detail: {
          index,
          tabId
        }
      });
      this.dispatchEvent(event);
    }
    /**
     * This is a tiny wrapper around _switchToPage(index) to open a page by
     * its id instead of the index.
     *
     * @param id `data-tab-id` attribute of the wanted page
     */
    _switchToPageById(id) {
      let pageDiv = this.sRoot.querySelector(`.page[data-tab-id="${id}"]`);
      if (pageDiv && pageDiv.dataset.index) {
        this._switchToPage(pageDiv.dataset.index);
      }
    }
    /**
     * Decide whether to display the page buttons horizontally or vertically.
     * This depends on the current value of the `data-mode` and `data-breakpoint`
     * attributes as described in the class documentation above.
     */
    _updateDisplayMode() {
      let containerElement = this.sRoot.querySelector(".container");
      if (!containerElement) return;
      let mode = this.adaptToScreenSize(containerElement, _WpvsTabsElement.#detectScreenSizeElement);
      let buttonBarElement = this.sRoot.querySelector(".button-bar");
      if (buttonBarElement) {
        if (mode == "horizontal") {
          buttonBarElement.classList.remove("closed");
        } else {
          buttonBarElement.classList.add("closed");
        }
      }
    }
  };
  window.customElements.define("wpvs-tabs", WpvsTabsElement);

  // src/wpvs-tile/wpvs-tile.html
  var wpvs_tile_default = '<style>\n/* Display as block element */\n:host {\n    display: block;\n}\n\n:host([hidden]) {\n    display: none;\n}\n\n.container {\n    color: var(--card-fg);\n    background: var(--card-bg);\n    box-shadow: 0 1px 1px 0.5px rgba(0,0,0, 0.03);\n    border: 1px solid var(--separator-fg);\n    border-radius: 0.1em;\n\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n\n    font-size: 130%;\n    font-weight: bold;\n\n    min-width: 15em;\n    height: 10em;\n}\n\n.container:not(.inactive) {\n    cursor: pointer;\n}\n\n.content {\n    color: var(--tile-title-normal-fg);\n    background: var(--tile-title-normal-bg);\n    padding: 0.5rem;\n    transition: var(--transition-background), var(--transition-color);\n}\n\n.container:hover .content {\n    color: var(--tile-title-hover-fg);\n    background: var(--tile-title-hover-bg);\n}\n</style>\n\n<template id="tile-template">\n    <div class="container">\n        <div class="content"></div>\n    </div>\n</template>\n';

  // src/wpvs-tile/wpvs-tile.ts
  var WpvsTileElement = class _WpvsTileElement extends custom_element_default {
    static #templates;
    static {
      this.#templates = document.createElement("div");
      this.#templates.innerHTML = wpvs_tile_default;
    }
    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
      super();
      this.postConstruct();
    }
    /**
     * Render shadow DOM to display the element.
     */
    _render() {
      let cardTemplate = _WpvsTileElement.#templates.querySelector("#tile-template").cloneNode(true);
      this.sRoot.replaceChildren(...cardTemplate.content.childNodes);
      let styleElement = _WpvsTileElement.#templates.querySelector("style").cloneNode(true);
      this.sRoot.appendChild(styleElement);
      let containerElement = this.sRoot.querySelector(".container");
      if (this.dataset.background) {
        containerElement.style.backgroundImage = this.dataset.background;
      }
      let contentElement = this.sRoot.querySelector(".content");
      if (this.childNodes.length) contentElement.replaceChildren(...this.childNodes);
      else contentElement.remove();
      if (this.dataset.href) {
        containerElement.addEventListener("click", () => {
          if (!this.dataset.href) return;
          location.href = this.dataset.href;
        });
      } else {
        containerElement.classList.add("inactive");
      }
    }
  };
  window.customElements.define("wpvs-tile", WpvsTileElement);

  // src/index.ts
  var init = () => {
    email_link_default.enableEmailLinks();
    let routerElement = document.querySelector("wpvs-router");
    routerElement?.addEventListener("route-changed", (event) => {
      let detail = event.detail;
      let siteTitle = "";
      let headerElement = document.querySelector("wpvs-header");
      if (headerElement && headerElement.dataset.siteTitle) siteTitle = headerElement.dataset.siteTitle;
      let pageTitle = "";
      let pageElement = detail.sRoot.querySelector("wpvs-page");
      if (pageElement && pageElement.dataset.title) pageTitle = pageElement.dataset.title;
      if (siteTitle && pageTitle) document.title = `${pageTitle} | ${siteTitle}`;
      else document.title = `${pageTitle}${siteTitle}`;
      if (headerElement) headerElement.dataset.pageTitle = pageTitle;
    });
  };
  if (document.readyState === "complete") init();
  else window.addEventListener("load", init);
})();
//# sourceMappingURL=_bundle.js.map
