const Enmap = require('enmap');

module.exports = class {
  constructor(data_name, key = null, options = {}) {
    this.data_name = data_name;
    this.key = key;
    this.options = options;

    if (typeof this.options !== 'object') {
      this.options = {};
    }

    if (this.options.hasOwnProperty('defaultData')) {
      this.defaultData = this.options['defaultData'];
    }

    if (this.options.hasOwnProperty('autoCheck')) {
      if (this.options.autoCheck !== true || this.options.autoCheck !== false) {
        throw new Error('autoCheck: type must be Boolean, Provided: ' + typeof this.options.autoSave);
      }
      this.autoCheck = this.options['autoCheck'];
    }

    if (this.options.hasOwnProperty('autoSave')) {
      if (this.options.autoSave !== true || this.options.autosave !== false) {
        throw new Error('autoSave: type must be Boolean, Provided: ' + typeof this.options.autoSave);
      }
      this.autoSave = this.options['autoSave'];
    }

    this.db = new Enmap(data_name);

    if (this.autoCheck == !0 && !this.db.has(key)) {
      this.db.set(key, this.defaultData);
    }

    this.data = this.db.get(key) || {};
  }

  get(key) {
    let key = key || this.key;

    if (typeof key !== 'string') {
      throw new Error('Key: type must be String, Provided: ' + typeof key);
    } else {
      return this.db.get(key);
    }
  }

  save() {
    if (!this.data || this.data === undefined) {
      this.data = this.defaultData;
    } else {
      this.db.set(this.key, this.data);
    }
  }

  reset() {
    this.data = this.defaultData || {};
  }

  has(key) {
    let key = key || this.key;

    if (typeof key !== 'string') {
      throw new Error('Key: type must be String, Provided: ' + typeof key);
    } else {
      return this.db.has(key);
    }
  }

  delete(key) {
    let key = key || this.key;

    if (typeof key !== 'string') {
      throw new Error('Key: type must be String, Provided: ' + typeof key);
    } else {
      this.db.delete(key);
    }
  }
}
