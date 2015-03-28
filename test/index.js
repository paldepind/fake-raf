console.log('wtf');

var assert = require('assert');
var fakeRaf = require('../index.js');

describe('fakeRaf', function() {
  it('can load and restore', function() {
    var original = requestAnimationFrame;
    fakeRaf.use();
    assert.notEqual(original, requestAnimationFrame);
    fakeRaf.restore();
    assert.equal(original, requestAnimationFrame);
  });
  it('does not call listener until stepped', function(done) {
    var called = 0;
    fakeRaf.use();
    requestAnimationFrame(function() {
      called++;
    });
    setTimeout(function() {
      assert.equal(called, 0);
      fakeRaf.step();
      assert.equal(called, 1);
      done();
    }, 40);
  });
  it('calls listener only once', function() {
    var called = 0;
    fakeRaf.use();
    requestAnimationFrame(function() {
      called++;
    });
    fakeRaf.step();
    fakeRaf.step();
    fakeRaf.step();
    assert.equal(called, 1);
  });
  it('supports reattaching listeners', function() {
    var called = 0;
    fakeRaf.use();
    function loop() {
      called++;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    fakeRaf.step();
    fakeRaf.step();
    fakeRaf.step();
    assert.equal(called, 3);
  });
});
