var GIF = require('./')

GIF([175, 175], {
  frames: 60
  , fps: 24
}, function(gl, t) {
  // fade in/out rather than 0 -> 1 / 0 -> 1 / ...
  t = (Math.cos(t * Math.PI * 2) + 1) / 2

  // Clear the screen with varying degrees of brightness
  gl.clearColor(t, t, t, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
}, function(err, dataURI) {
  if (err) throw err

  document.body.innerHTML = '<img src='+JSON.stringify(dataURI)+'>'
})
