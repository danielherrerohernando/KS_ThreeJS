let camera, scene, renderer;
let geometry, material, mesh, mesh2, mesh3;

let pieces = [];
let virtualTime = 0;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 3;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf2f2f2);

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  for (let i = 0; i < 10; i++) {
    pieces.push(new THREE.Mesh(geometry, material));
    pieces[i].position.x = i / 2 - 2.5;
    pieces[i].position.y = Math.sin(i / 2 - 2.5);
    scene.add(pieces[i]);
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  virtualTime += 0.006;

  pieces.forEach(m => {
    m.rotation.x += 0.04 * Math.random();
    m.rotation.y += 0.03 * Math.random();
    m.position.y = Math.sin(m.position.x / 2 - 2.5 + virtualTime);
  });

  renderer.render(scene, camera);
}
