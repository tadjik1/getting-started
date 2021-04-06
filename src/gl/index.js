import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/fragment.glsl";

class Gl {
  constructor(video) {
    this.video = video;
    this.width = video.videoWidth;
    this.height = video.videoHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      40,
      this.width / this.height,
      0.1,
      100
    );

    this.camera.position.z = 1;
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas"),
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.width, this.height);

    this.clock = new THREE.Clock();

    new OrbitControls(this.camera, this.renderer.domElement);

    const gui = new GUI({ autoPlace: true });

    this.params = {
      depth: 0.1,
      scale: 0.2,
    };

    gui.add(this.params, "depth", 0, 1, 0.1);
    gui.add(this.params, "scale", 0, 1, 0.1);
  }

  init() {
    this.createMesh();
    this.addEvents();
  }

  createMesh() {
    this.texture = new THREE.VideoTexture(this.video);
    this.geometry = new THREE.PlaneBufferGeometry(
      1,
      this.height / this.width,
      this.width,
      this.height
    );

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: this.texture },
        uTime: { value: 0.0 },

        // params
        uDepth: { value: this.params.depth },
        uScale: { value: this.params.scale },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  addEvents() {
    window.requestAnimationFrame(this.run.bind(this));
  }

  run() {
    requestAnimationFrame(this.run.bind(this));
    this.render();
  }

  render() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();

    // params
    this.material.uniforms.uDepth.value = this.params.depth;
    this.material.uniforms.uScale.value = this.params.scale;

    this.renderer.render(this.scene, this.camera);
  }
}

export default Gl;
