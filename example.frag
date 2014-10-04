precision mediump float;

uniform float t;
varying vec2 vuv;

void main() {
  gl_FragColor = vec4(t, vuv.x, vuv.y, 1);
}
