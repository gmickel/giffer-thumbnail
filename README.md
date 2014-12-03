# giffer-thumbnail

Plugin for [giffer](https://github.com/MaxGfeller/giffer) to automatically
generate thumbnails for downloaded GIFs.

## Usage

Install plugin like this: `giffer.plugin(require('giffer-thumbnail'), opts)`

`opts` can be:
- `outputDir`: where to save the thumbnail (name is the same)
- `width`: absolute width in pixels
- `height`: absolute height in pixels
- `resizeOpts`: as described [here](http://aheckmann.github.io/gm/docs.html#resize)

## Running the tests

`npm test`
