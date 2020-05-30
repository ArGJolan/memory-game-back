/* eslint-disable no-console */
const colors = require('./colors');
const timestamp = require('./timestamp');

const getLine = () => {
  const e = new Error();
  const stack = e.stack.toString().split(/\r\n|\n/);
  const caller = stack[3].split('/').pop().split(':').splice(0, 2).join(':');
  return caller;
};

module.exports = {
  debug: (...args) => {
    const line = getLine();
    console.log(`${timestamp()} ${colors.BLUE}DEBUG in ${line}${colors.RESTORE}:`, ...args);
  },
  info: (...args) => {
    console.log(`${timestamp()} ${colors.GREEN}INFO ${colors.RESTORE}:`, ...args);
  },
  warn: (...args) => {
    const line = getLine();
    console.log(`${timestamp()} ${colors.YELLOW}WARN in ${line}${colors.RESTORE}:`, ...args);
  },
  error: (...args) => {
    const line = getLine();
    console.log(`${timestamp()} ${colors.RED}ERROR in ${line}${colors.RESTORE}:`, ...args);
  },
  trace: (...args) => {
    console.log(`${timestamp()} ${colors.CYAN}TRACE ${colors.RESTORE}:`, ...args);
  },
  stack: (...args) => {
    console.log(colors.RED, ...args, colors.RESTORE);
  },
};
