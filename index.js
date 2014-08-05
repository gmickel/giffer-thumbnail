'use strict';
var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({ imageMagick: true });

function Thumbnailer() {}


Thumbnailer.prototype.createThumbnail = function(giffer, opts, callback) {
  var src = opts.img,
    inputDir = giffer.outDir,
    outputDir = giffer.thumbDir,
    width = giffer.width,
    height = giffer.height;

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

var instance = new Thumbnailer();
module.exports = instance;