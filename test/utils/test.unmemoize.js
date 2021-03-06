/* global describe, it */
'use strict';

var assert = require('power-assert');
var async = require('../../');

describe('#unmemoize', function() {

  it('should execute without memo', function(done) {

    var order = [];
    var fn = function(arg, callback) {
      order.push(arg);
      callback();
    };

    var fn2 = async.memoize(fn);
    fn2 = async.unmemoize(fn2);

    fn2(1, function() {

      fn2(2, function() {

        fn2(1, function() {

          assert.deepEqual(order, [1, 2, 1]);
          done();
        });
      });
    });
  });

});

