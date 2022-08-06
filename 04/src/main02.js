import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/*
  场景
*/
const scene = new THREE.Scene();

/*
  相机
*/
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);
scene.add(camera);

/*
 导入纹理
*/
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/minecraft.png");
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;

/*
  生成矩阵
*/
const cubeGeometry = new THREE.BoxBufferGeometry(3, 3, 3);

/*
  生成材质
*/
const basicMeterial = new THREE.MeshBasicMaterial({
  map: texture,
});

/*
  贴图
*/
const cube = new THREE.Mesh(cubeGeometry, basicMeterial);

/*
  添加
*/
scene.add(cube);

/*
  渲染器
*/
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

/*
  轨道控制器
*/
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

/*
  辅助坐标
*/
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/*
  渲染函数
*/
function render() {
  //更新控制器
  controls.update();
  //执行renderer
  renderer.render(scene, camera);
  //下一帧
  requestAnimationFrame(render);
}

// 往body添加renderer的dom
document.body.appendChild(renderer.domElement);
render();
