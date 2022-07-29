import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);
scene.add(camera);

const cubeGeometry = new THREE.BufferGeometry();
//prettier-ignore
const vertices = new Float32Array([
    -1, -1, 1,
    1, -1,  1,
    1,  1,  1, 
    1,  1,  1, 
    -1, 1, 1,
    -1, -1, 1
]);
cubeGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const cubeMeterial = new THREE.MeshBasicMaterial({ color: 0xffff33 });
const mesh = new THREE.Mesh(cubeGeometry, cubeMeterial);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

document.body.appendChild(renderer.domElement);
render();
