Element.prototype.ac = function (child) { this.appendChild(child); };
Array.prototype.io = function (el) { return this.indexOf(el); };
Element.prototype.ca = function (cls) { this.classList.add(cls); };
Element.prototype.sa = function (attr, val) { this.setAttribute(attr, val); };
Document.prototype.qs = Element.prototype.qs = function (sel) { return this.querySelector(sel); };

const d = {
  i: (id) => document.getElementById(id),
  c: (el) => document.createElement(el),
  q: (qr) => document.querySelectorAll(qr),
  s: (sl) => document.qs(sl),
  e: (ev, fn) => document.addEventListener(ev, fn),
  r: (ev, fn) => document.removeEventListener(ev, fn),
  ns: (ns, el) => document.createElementNS(ns, el)
};