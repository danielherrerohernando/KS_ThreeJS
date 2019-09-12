let virtualTime = 0;
let renderer, scene, camera;
const boxes = [];
let group;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const geometry = new THREE.SphereGeometry(0.1, 32, 32);
  THREE.sp;

  group = new THREE.Group();

  new Array(200).fill("").forEach((e, i) => {
    const r = Math.sin(i * 0.1);

    const material = new THREE.MeshNormalMaterial();
    boxes[i] = new THREE.Mesh(geometry, material);
    boxes[i].position.x = Math.sin(i / 3) * r;
    boxes[i].position.y = (1 - Math.cos(i / 3)) * r;
    boxes[i].position.z = i / 10;
    group.add(boxes[i]);
  });

  scene.add(group);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  group.rotation.z += 0.05;
  renderer.render(scene, camera);
}
