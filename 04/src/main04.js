import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 目标：AO环境遮挡

/*
  场景
*/
const scene = new THREE.Scene();

/*
  相机
*/
const camera = new THREE.PerspectiveCamera(
  75, // 摄像机锥视体张开角度
  window.innerWidth / window.innerHeight, // 摄像机锥视体宽高比
  0.1, // 进平面
  1000 // 远平面
);
camera.position.set(10, 10, 10);
scene.add(camera);

/*
 导入纹理
*/
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/door/color.jpg");
const alphaTexture = textureLoader.load("./textures/door/alpha.jpg"); // alpha材质
const doorAoTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);

/*
  生成材质
*/
const basicMeterial = new THREE.MeshBasicMaterial({
  map: texture, // 基础材质
  side: THREE.DoubleSide, //允许正面和方面同时绘制材质
  alphaMap: alphaTexture, // alpha 遮挡材质
  transparent: true, // 为true时，上面的设置才生效
  aoMap: doorAoTexture, // 该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。
});

/*
  生成矩阵
*/
const cubeGeometry = new THREE.BoxBufferGeometry(3, 3, 3);
const cube = new THREE.Mesh(cubeGeometry, basicMeterial);
scene.add(cube);
// 给cube添加第二组uv
cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

/*
 创建一个平面
*/
const planeGeometry = new THREE.PlaneBufferGeometry(3, 3);
const plane = new THREE.Mesh(planeGeometry, basicMeterial);
plane.position.x = 5;
scene.add(plane);
// 给平面添加第二组uv
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

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
