import { EventEmitter } from 'events';

// Exercise 3.2 + 3.3 + 3.4
const ticker = (ms, cb) => {
  const emitter = new EventEmitter();
  let tickCount = 0;
  let tickHandle;
  // Base case
  setTimeout(() => {
    clearTimeout(tickHandle);
    cb(null, tickCount);
  }, ms);
  // Tick Recursion
  const tick = () => {
    const timestamp = Date.now();
    if (timestamp % 5 === 0) {
      const err = new Error('Bad Timestamp');
      emitter.emit('error', err);
      cb(err);
    }
    emitter.emit('tick');
    tickCount += 1;
    tickHandle = setTimeout(tick, 50);
  };
  tick();
  return emitter;
};

ticker(550, console.log)
  .on('tick', () => console.log('tick'))
  .on('error', err => console.log('Emitter Err', err));
