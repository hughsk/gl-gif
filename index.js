var GIFEncoder = require('gif.js/src/GIFEncoder')
var getPixels  = require('canvas-pixels')
var noop       = (function(){})

module.exports = GIF

function GIF(gl, opts) {
  if (!(this instanceof GIF)) return new GIF(gl, opts)

  this.gl = gl
  opts = opts || {}

  var canvas  = this.canvas  = gl.canvas
  var width   = this.width   = opts.width || canvas.width
  var height  = this.height  = opts.height || canvas.height
  var encoder = this.encoder = new GIFEncoder(width, height)

  this._done = false

  canvas.width  = width
  canvas.height = height

  encoder.setRepeat(opts.repeat || 0)
  encoder.setFrameRate(opts.fps || 30)
  encoder.setTransparent(opts.transparent || null)
  encoder.setQuality(opts.quality || 10)
  encoder.writeHeader()
}

GIF.prototype.tick = function() {
  if (this._done) return false
  if (this.canvas.width !== this.width) {
    throw new Error('You cannot change the canvas width while recording')
  }
  if (this.canvas.height !== this.height) {
    throw new Error('You cannot change the canvas height while recording')
  }

  this.encoder.addFrame(getPixels(this.gl))

  return true
}

GIF.prototype.done = function() {
  if (this._done) throw new Error('You may only encode a GIF once')
  this._done = true
  this.encoder.finish()

  return 'data:image/gif;base64,' + btoa(
    this.encoder.stream().getData()
  )
}
