const Database = require('./lib/Database.js');

module.exports = function(...args) {
  return new Database(...args);
};
