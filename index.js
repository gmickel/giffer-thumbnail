'use strict';
var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({ imageMagick: true });

function Thumbnailer() {}


Thumbnailer.prototype.createThumbnail = function(giffer, callback) {
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

module.exports = Thumbnailer;