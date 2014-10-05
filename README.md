# gl-gif [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Quickly and easily generate looping GIFs with WebGL using
**[@jnordberg](http://github.com/jnordberg)**'s
[gif.js](http://github.com/jnordberg/gif.js).

## Usage

[![NPM](https://nodei.co/npm/gl-gif.png)](https://nodei.co/npm/gl-gif/)

### `gif = GIF(gl, options)`

Creates a new GIF encoder attached to the `gl` context. Accepts the following
options:

* `fps`: the framerate at which the generated GIF should run.
* `repeat`: the number of times to repeat the GIF before stopping, if applicable.
* `transparent`: the transparent color to use, if applicable.
* `width`: resizes the canvas `width`, which determines the size of the GIF.
* `height`: resizes the canvas `height`, which determines the size of the GIF.
* `quality`: the quality at which to render the GIF, where 1 is the best (but slow)
  and 20 is the worst (but fast). Defaults to 10.
* `dither`: the dithering mode to use. Set to `true` for Floyd-Steinberg,
  `false` for none, or pass in any of the following strings:
  * `FloydSteinberg`
  * `FloydSteinberg-serpentine`
  * `Stucki`
  * `Stucki-serpentine`
  * `Atkinson`
  * `Atkinson-serpentine`

Note that if you change the size of your canvas after creating the encoder,
`gif.tick` will throw an error.

### `gif.tick()`

Captures a new frame – call this method at the end of rendering a frame.

### `dataURI = gif.done(options)`

Encodes the final GIF, returning it as a URL that you can attach to an
image's `src` attribute. For example:

``` javascript
img.src = gif.done()
```

This method may only be called once, subsequent calls will throw an error.

You may also retrieve the data in alternative formats depending on your
use case, using the `format` option. The following formats are available:

* `dataURI`: a data URI, e.g. `data:image/gif,base64,...`
* `raw`: the raw binary data, contained within a `Float32Array`.

## Example

See [`example.js`](https://github.com/hughsk/gl-gif/blob/master/example.js) for
a usage example.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/gl-gif/blob/master/LICENSE.md) for details.
