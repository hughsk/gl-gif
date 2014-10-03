# gl-gif [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Quickly and easily generate looping GIFs with WebGL using
**[@jnordberg](http://github.com/jnordberg)**'s
[gif.js](http://github.com/jnordberg/gif.js).

## Usage

[![NPM](https://nodei.co/npm/gl-gif.png)](https://nodei.co/npm/gl-gif/)

### `gl = gif(shape, options, render, done)`

Returns a new WebGL context. `shape` is the `[width, height]` of said context.
Accepts the following options:

* `frames`: the number of frames to include in the animation.
* `fps`: the framerate at which the generated GIF should run.
* `repeat`: the number of times to repeat the GIF before stopping, if applicable.
* `transparent`: the transparent color to use, if applicable.
* `quality`: the quality at which to render the GIF, where 1 is the best (but slow)
  and 20 is the worst (but fast). Defaults to 10.

`render(gl, t)` is called once for each frame. It gives you a WebGL context to
perform draw calls on, and once complete will add the finished result to the
final GIF using `gl.readPixels`. It also passes you a `t` value, which will
start at `0` and gradually increase, reaching `1` during the final frame.

`done(err, dataURI)` is called when the GIF is finished rendering. `err` will
be passed if an unexpected error occurs. Otherwise, `dataURI` will be a data URI
that you can stick on an image's `src` attribute.

See `[example.js](example.js)` for a usage example.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/gl-gif/blob/master/LICENSE.md) for details.
