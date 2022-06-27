exports.on = (e, event, callback, options) => {
  if (callback) {
    options && Object.assign(callback, options);
    if (!(event in e.eh))
      e.eh[event] = [];
    e.eh[event].push(callback);
  }
  return e;
}
exports.off = (e, event, callback) => {
  if (event in e.eh)
    if (callback) {
      let stack = e.eh[event];
      for (let i = 0, l = stack.length; i < l; i++) {
        if (stack[i] === callback) {
          stack.splice(i, 1);
          return;
        }
      }
    }
    else
      delete e.eh[event];
  return e;
}
exports.emit = (e, event, data) => {
  if (!e.slip) {
    let stack = e.eh[event];
    if (stack)
      for (let i = 0, l = stack.length; i < l; i++) {
        let handler = stack[i];
        if (!handler.check || handler.check(data)) {
          if (handler.once)
            stack.splice(i--, 1);
          if (handler.delay)
            setTimeout(() => { handler.call(e, data); }, handler.delay);
          else if (handler.call(e, data) === false)
            break;
        }
      }
  }
}
