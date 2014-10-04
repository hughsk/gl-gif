var canvas = document.createElement('canvas')
var gl     = require('gl-context')(canvas, render)
var GIF    = require('./')
var noop   = (function(){})

var remaining = 60
var total = remaining
var gif = GIF(gl, {
    fps: 24
  , width: 175
  , height: 175
})

function render() {
  var t = 1 - (remaining-- / total)
  if (t > 1) return finish()
  t = (Math.cos(t * Math.PI * 2) + 1) / 2

  gl.clearColor(t, t, t, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gif.tick()
}

function finish() {
  var dataURI = gif.done()
  document.body.innerHTML = '<img src='+JSON.stringify(dataURI)+'>'
  finish = noop
}
