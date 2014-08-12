'use strict';
var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({ imageMagick: true });

 function createThumbnail(giffer, opts, callback) {
  var img = opts.img,
    inputDir = giffer.outDir,
    outputDir = opts.outputDir,
    width = opts.width,
    height = opts.height,
    resizeOpts = opts.resizeOpts;

  var readStream = fs.createReadStream(inputDir + '/' + img);
  im(readStream, img + '[0]')
    .resize(width, height, resizeOpts)
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
}

module.exports = function(giffer, opts) {
  giffer.pre('emitGif', function(next, filename) {
    createThumbnail(giffer, {
      img: filename,
      outputDir: opts.outputDir,
      width: opts.width,
      height: opts.height,
      resizeOpts: opts.resizeOpts
    }, function() {
      next();
    }.bind(this));
  });
};
