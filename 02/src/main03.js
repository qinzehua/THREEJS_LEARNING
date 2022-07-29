import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const camera = new THREE.PerspectiveCamera(
  75, // 锥体角度
  window.innerWidth / window.innerHeight,
  0.1, // 近
  1000 //远
);
camera.position.set(0, 0, 10);
scene.add(camera);

// 立方体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const cubeMeterial = new THREE.MeshBasicMaterial({ color: 0xffff33 });
// 贴上材质
const cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
scene.add(cube);

// 创建轨道控制器
new OrbitControls(camera, render.domElement);

//辅助坐标
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function tick() {
  render.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
