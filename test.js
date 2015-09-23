/*!
 * emitter-only <https://github.com/doowb/emitter-only>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var util = require('util');

var Emitter = require('component-emitter');
var only = require('./');

describe('emitter-only', function () {
  it('should add an event listener one time', function () {
    function MyEmitter() {}
    MyEmitter.prototype.only = function() {
      return only.apply(this, arguments);
    };

    var count = 0;
    var output = [];
    var emitter = Emitter(new MyEmitter());
    emitter.only('one-time', 'foo', function (msg) {
      count++;
      output.push('foo-1-' + msg);
    });

    emitter.only('one-time', 'foo', function (msg) {
      count++;
      output.push('foo-2-' + msg);
    });

    emitter.only('two-time', 'foo', function (msg) {
      count++;
      output.push('foo-3-' + msg);
    });

    emitter.emit('foo', 'bar');
    assert.equal(count, 2);
    assert.deepEqual(output, ['foo-1-bar', 'foo-3-bar']);
  });

  it('should add an event listener one time on inherited constructor', function () {
    function MyEmitter() {
      Emitter.call(this);
    }
    util.inherits(MyEmitter, Emitter);

    MyEmitter.prototype.only = function() {
      return only.apply(this, arguments);
    };

    var count = 0;
    var output = [];
    var emitter = new MyEmitter();
    emitter.only('one-time', 'foo', function (msg) {
      count++;
      output.push('foo-1-' + msg);
    });

    emitter.only('one-time', 'foo', function (msg) {
      count++;
      output.push('foo-2-' + msg);
    });

    emitter.only('two-time', 'foo', function (msg) {
      count++;
      output.push('foo-3-' + msg);
    });

    emitter.emit('foo', 'bar');
    assert.equal(count, 2);
    assert.deepEqual(output, ['foo-1-bar', 'foo-3-bar']);
  });
});
