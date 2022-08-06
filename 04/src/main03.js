import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 目标：透明

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
const texture = textureLoader.load("./textures/door/color.jpg");
const alphaTexture = textureLoader.load("./textures/door/alpha.jpg");

/*
  生成材质
*/
const basicMeterial = new THREE.MeshBasicMaterial({
  map: texture,
  alphaMap: alphaTexture,
  transparent: true,
  side: THREE.DoubleSide,
});

/*
  生成矩阵
*/
const cubeGeometry = new THREE.BoxBufferGeometry(3, 3, 3);
const cube = new THREE.Mesh(cubeGeometry, basicMeterial);
scene.add(cube);

/*
 创建一个平面
*/
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(3, 3),
  basicMeterial
);
plane.position.x = 5;
scene.add(plane);

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
