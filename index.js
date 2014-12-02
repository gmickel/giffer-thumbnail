'use strict';
var fs = require('fs');
var gm = require('gm');
var im = gm.subClass({ imageMagick: true });
var concat = require('concat-stream');

 function createThumbnail(giffer, opts, callback) {
  var img = opts.img,
    inputDir = giffer.outDir,
    outputDir = opts.outputDir,
    width = opts.width,
    height = opts.height,
    resizeOpts = opts.resizeOpts,
    base64 = opts.base64;

  var readStream = fs.createReadStream(inputDir + '/' + img);
  im(readStream, img + '[0]')
    .resize(width, height, resizeOpts)
    .noProfile()
    .stream(function (err, stdout, stderr) {
      if (err) {
        return callback(err);
      }

      if(true === base64) {
        stdout.pipe(concat(function(buf) {
          var base64buf = buf.toString('base64');
          callback(null, base64buf);
        }));
        return;
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
  giffer.pre('saveMetaData', function(next, url, id, metadata) {
    createThumbnail(giffer, {
      img: id + '.gif',
      outputDir: opts.outputDir,
      width: opts.width,
      height: opts.height,
      resizeOpts: opts.resizeOpts,
      base64: opts.base64 || false
    }, function(err, base64buf) {
      if(base64buf) metadata.base64 = base64buf;
      if(err) return next(err);
      next(url, id, metadata);
    }.bind(this));
  });
};
