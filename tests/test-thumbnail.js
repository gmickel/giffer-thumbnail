'use strict';
var test = require('tap').test;
var thumbnailer = require('../index');
var Giffer = require('giffer');
var levelup = require('levelup');
var TestAdapter = require('./testadapter');


var db = levelup('/whatever', {
  db: require('memdown')
});

test('Test creation of a thumbnail', function(t) {

  var testAdapter = new TestAdapter();

  var giffer = new Giffer({
    db: db,
    outputDir: __dirname + '/temp',
    adapters: [testAdapter]
  });

  var options = {
    outputDir : __dirname + '/temp/thumbs',
    width : 200,
    height : 200,
    resizeOpts: '>'
  };
  thumbnailer(giffer, options);
  giffer.start();
  giffer.on('gif', function(url) {
    giffer.stop();
    t.ok(url);
    t.end();
  });
});