var GIFEncoder = require('gif.js/src/GIFEncoder')
var getPixels  = require('canvas-pixels')
var getContext = require('gl-context')
var raf        = require('raf')

module.exports = createGIF

function createGIF(shape, opts, render, done) {
  if (shape.length !== 2) throw new Error('Shape must be a 2-element array')

  opts = opts || {}

  var canvas  = document.createElement('canvas')
  var gl      = getContext(canvas)
  var frames  = opts.frames || 30
  var total   = --frames
  var encoder = new GIFEncoder(shape[0], shape[1])

  encoder.setRepeat(opts.repeat || 0)
  encoder.setFrameRate(opts.fps || 30)
  encoder.setTransparent(opts.transparent || null)
  encoder.setQuality(opts.quality || 10)
  encoder.writeHeader()

  canvas.width  = shape[0]
  canvas.height = shape[1]
  tick()

  return gl

  function tick() {
    var t = 1 - frames-- / total
    if (t > 1) return finished()

    gl.viewport(0, 0, shape[0], shape[1])

    render(gl, t)
    raf(tick)

    encoder.addFrame(getPixels(gl))
  }

  function finished() {
    encoder.finish()
    var data = encoder.stream().getData()
    done(null, 'data:image/gif;base64,' + btoa(data))
  }
}
