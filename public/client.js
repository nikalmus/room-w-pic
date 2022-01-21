import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, box, mesh, controls;
let zoomOut = false;
let meshImgName = "room";

function createPathStrings(filename) {
  const basePath = "./images/";
  const baseFilename = basePath + filename;
  const fileType = ".jpg";
  const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
  const pathStings = sides.map((side) => {
    return baseFilename + "_" + side + fileType;
  });

  return pathStings;
}

function createMaterials(filename) {
  const paths = createPathStrings(filename);
  const materials = paths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materials;
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000
  );
  camera.position.set(1200, -250, 2000);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "canvas";
  document.body.appendChild(renderer.domElement);

  const materials = createMaterials(meshImgName);

  box = new THREE.BoxGeometry(10000, 10000, 10000);
  mesh = new THREE.Mesh(box, materials);

  scene.add(mesh);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.minDistance = 700;
  controls.maxDistance = 1500;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  window.addEventListener("resize", onWindowResize, false);
  animate();
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

init();
