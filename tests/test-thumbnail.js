'use strict';
var test = require('tap').test;
var Thumbnailer = require('../index');

test('Test creation of a thumbnail', function(t) {
  var options = {
    'src' : 'test_in.gif',
    'dest' : 'test_out.gif',
    'inputDir' : 'temp',
    'outputDir' : 'temp',
    'width' : 200,
    'height' : 200
  };
  Thumbnailer.createThumbnail(options, function(err, image) {
    t.equal(image, dest);
  });
  t.end();
});
