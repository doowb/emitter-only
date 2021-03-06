/*!
 * emitter-only <https://github.com/doowb/emitter-only>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var define = require('define-property');

/**
 * Only register an event listener one time for the given `name/event` combo.
 *
 * @param  {String} `name` Name to specify this is a unique listener.
 * @param  {String} `event` Event name to pass to the emitter `on` method.
 * @param  {Function} `fn` Event listener function to pass to the emitter `on` method.
 * @return {Object} Return `this` for chaining.
 * @api public
 */

module.exports = function only (name, event, fn) {
  var key = name + ':' + event;
  if (typeof this._eventCache === 'undefined') {
    define(this, '_eventCache', {});
  }

  if (!this._eventCache.hasOwnProperty(key)) {
    this._eventCache[key] = true;
    return this.on(event, fn);
  }
  return this;
};
