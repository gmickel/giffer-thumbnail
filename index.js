'use strict';
var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({ imageMagick: true });

function Thumbnailer() {}


Thumbnailer.prototype.createThumbnail = function(giffer, opts, callback) {
  var img = opts.img,
    inputDir = giffer.outDir,
    outputDir = giffer.thumbnailDir,
    width = giffer.thumbnailWidth,
    height = giffer.thumbnailHeight;

  var readStream = fs.createReadStream(inputDir + '/' + img);
  im(readStream, img + '[0]')
    .resize(width, height)
    .noProfile()
    .stream(function (err, stdout, stderr) {
      if (err) {
        return callback(err);
      }
      var writeStream = fs.createWriteStream(outputDir + '/' + img);
      stdout.pipe(writeStream);
      writeStream.on('error', function(err) {
        return callback(err);
      });
      writeStream.on('finish', function() {
        return callback();
      });
    });
};

var instance = new Thumbnailer();
module.exports = instance;