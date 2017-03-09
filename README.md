# fake-raf

A fake `requestAnimationFrame`, i.e. a stub for unit testing.

* Very simple
* Supports TypeScript

## Usage

```js
import * as fakeRaf from "fake-raf";

fakeRaf.use(); // install global mock

function loop() {
  // do stuff here
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

fakeRaf.step(); // call all listeners
fakeRaf.step();
fakeRaf.step();

fakeRaf.restore(); // restore the real `requestAnimationFrame`
```
