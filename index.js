(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory); // AMD. Register as an anonymous module.
  } else if (typeof exports === 'object') {
    module.exports = factory(); // NodeJS
  } else { // Browser globals (root is window)
  root.fakeRaf = factory();
  }
}(this, function () {

var original;

var requesters = [];

function fakeRaf(fn) {
  requesters.push(fn);
}

function use() {
  original = window.requestAnimationFrame;
  window.requestAnimationFrame = fakeRaf;
}

function restore() {
  window.requestAnimationFrame = original;
}

function step() {
  var cur = requesters;
  requesters = [];
  cur.forEach(function(f) { f(16); });
}

return {use: use, restore: restore, step: step};

}));
