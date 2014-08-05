'use strict';
var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({ imageMagick: true });
var thumbnailer = {};

module.exports = function(giffer, opt) {
  this.giffer = giffer;
  this.outputDir = opt.path;
  this.width = opt.width;
  this.height = opt.height;


  this.createThumbnail = function() {

  }
};

giffer.on('gif', function(url) {
  this.createThumbnail();
});

thumbnailer.createThumbnail = function(options, callback) {
  var src = options.src,
    dest = options.dest,
    inputDir = options.inputDir,
    outputDir = options.outputDir,
    width = options.width,
    height = options.height;

  var readStream = fs.createReadStream(inputDir + '/' + src);
  im(readStream, src + '[0]')
    .resize(width, height)
    .noProfile()
    .stream(function (err, stdout, stderr) {
      if (err) {
        return callback(err);
      }
      var writeStream = fs.createWriteStream(outputDir + '/' + dest);
      stdout.pipe(writeStream);
      writeStream.on('error', function(err) {
        return callback(err);
      });
    });
};
