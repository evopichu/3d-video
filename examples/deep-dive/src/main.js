import * as THREE from 'three';
import { createScene } from './scene.js';

const renderer = new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});
renderer.setPixelRatio(1);
renderer.setSize(540,960);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
document.body.prepend(renderer.domElement);
const {scene,camera,update} = createScene();
const caption = document.getElementById('caption');

window.renderFrame = (frame) => {
  const t = frame / 30;
  update(t);
  caption.textContent = t < 2 ? 'TINY SIGNAL' : t < 4 ? 'MOVES FAST' : 'THROUGH YOU';
  renderer.render(scene,camera);
};
window.__ready = true;
window.renderFrame(0);
