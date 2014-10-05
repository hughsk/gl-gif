var canvas   = document.createElement('canvas')
var gl       = require('gl-context')(canvas, render)
var triangle = require('a-big-triangle')
var glslify  = require('glslify')
var GIF      = require('./')
var noop     = (function(){})
var pre      = document.querySelector('pre')

var remaining = 60
var total = remaining
var gif = GIF(gl, {
    fps: 24
  , width: 175
  , height: 175
  , quality: 20
  , dither: true
})

var shader = glslify({
    vert: './example.vert'
  , frag: './example.frag'
})(gl)

function render() {
  var t = 1 - (remaining-- / total)
  if (t > 1) return finish()
  pre.innerHTML = 'Generating GIF... ' + ~~(t * 100) + '%'
  t = (Math.cos(t * Math.PI * 2) + 1) / 2

  gl.viewport(0, 0, canvas.width, canvas.height)

  shader.bind()
  shader.uniforms.t = t
  triangle(gl)

  gif.tick()
}

function finish() {
  var dataURI = gif.done()
  document.body.innerHTML = '<img src='+JSON.stringify(dataURI)+'>'
  finish = noop
}
