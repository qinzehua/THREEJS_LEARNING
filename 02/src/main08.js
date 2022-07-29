import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

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

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMeterial = new THREE.MeshBasicMaterial({ color: 0xffff33 });
const cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
scene.add(cube);

const controls = new OrbitControls(camera, render.domElement);
controls.enableDamping = true; // 世界旋转的时候有阻尼感

const ainmate = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  repeat: 2,
  yoyo: true,
  onComplete: function () {
    console.log("动画结束");
  },
  onStart() {
    console.log("animation started");
  },
});

//辅助坐标
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function tick() {
  controls.update();
  render.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

// 控制全屏
window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    render.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

//监听窗口变化，自适应画布
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render.setSize(window.innerWidth, window.innerHeight);
});
