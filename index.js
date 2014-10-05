var GIFEncoder = require('./vendor/GIFEncoder')
var getPixels  = require('canvas-pixels')
var tab64      = require('tab64')
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

  if (opts.dither) encoder.setDither(opts.dither)
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

  var pixels = getPixels(this.gl)
  var flipped = new Uint8Array(pixels.length)

  for (var x = 0; x < this.width; x++)
  for (var y = 0; y < this.height; y++) {
    var i = 4 * (x + this.width * y)
    var j = 4 * (x + this.width * (this.height - y - 1))
    flipped[i++] = pixels[j++]
    flipped[i++] = pixels[j++]
    flipped[i++] = pixels[j++]
    flipped[i  ] = pixels[j  ]
  }

  this.encoder.addFrame(flipped)

  return true
}

GIF.prototype.done = function(opts) {
  if (this._done) throw new Error('You may only encode a GIF once')
  this._done = true
  this.encoder.finish()

  var data = this.encoder.stream().getData()
  if (opts && opts.dataURI) {
    return 'data:image/gif;base64,' + btoa(data)
  }

  var raw  = tab64.decode(btoa(data), 'float32')
  if (opts && opts.format === 'raw') {
    return raw
  }

  var blob = new Blob([raw], { type: 'image/gif' })
  var url  = URL.createObjectURL(blob)

  return url
}
