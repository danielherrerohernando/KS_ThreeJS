let camera, scene, renderer;
let geometry, material, mesh, mesh2, mesh3;

let pieces = [];

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.x = -0.5;
  mesh3 = new THREE.Mesh(geometry, material);
  mesh3.position.x = 0.5;
  scene.add(mesh, mesh2, mesh3);
  pieces.push(mesh, mesh2, mesh3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  pieces.forEach(m => {
    m.rotation.x += 0.04 * Math.random();
    m.rotation.y += 0.03 * Math.random();
  });

  renderer.render(scene, camera);
}
