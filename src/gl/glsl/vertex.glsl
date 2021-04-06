precision mediump float;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv;
varying float vWave;

uniform float uTime;
uniform float uDepth;
uniform float uStrength;
uniform float uScale;
uniform sampler2D uTexture;

// https://en.wikipedia.org/wiki/Relative_luminance
float relative_luminance(vec3 texture) {
    return 0.2126 * texture.r + 0.7152 * texture.g + 0.0722 * texture.b;
}

void main() {
    vUv = uv;

    vec3 pos = position;
    vec3 texture = texture2D(uTexture, vUv).rgb;
    float luminance = relative_luminance(texture);

    pos.z = uDepth * snoise3(vec3(pos.x + uTime, pos.y, uScale * luminance * uTime));

    vWave = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
