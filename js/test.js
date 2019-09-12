let camera, scene, renderer;
let geometry, material, mesh, mesh2, mesh3;

let pieces = [];
let virtualTime = 0;

let controls;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf2f2f2);

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

  for (let i = 0; i < 10; i++) {
    pieces.push([]);
    for (let j = 0; j < 10; j++) {
      const value = 20 * j;
      const material = new THREE.MeshBasicMaterial({ color: `hsl(${value},50%,70%)`, opacity: 0.8, transparent: true });
      pieces[i].push(new THREE.Mesh(geometry, material));
      pieces[i][j].position.x = j / 2 - 2.5;
      pieces[i][j].position.y = i / 2 - 2.5;
      pieces[i][j].position.z = Math.sin(j / 2 - 2.5);
      scene.add(pieces[i][j]);
    }
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  virtualTime += 0.02;

  pieces.forEach(line => {
    line.forEach(({ rotation, position, material }) => {
      rotation.x += 0.04 * Math.random();
      rotation.y += 0.03 * Math.random();
      position.z = Math.sin((position.y + position.x) / 2 - 2.5 + virtualTime);
      material.color = new THREE.Color(`hsl(${(position.z + 1) * 200},50%,70%)`);
    });
  });

  renderer.render(scene, camera);
}
