let virtualTime = 0;
let renderer, scene, camera, group2;
const boxes = [];

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const group = new THREE.Group();

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

  new Array(30).fill("").forEach((e, i) => {
    boxes[i] = [];
    for (let j = 0; j < 30; j++) {
      const material = new THREE.MeshBasicMaterial({ transparent: true });
      boxes[i][j] = new THREE.Mesh(geometry, material);
      boxes[i][j].position.x = j / 2 - 7.5;
      boxes[i][j].position.y = i / 2 - 7.5;
      group.add(boxes[i][j]);
    }
  });

  group2 = group.clone();

  scene.add(group, group2);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
  virtualTime += 0.05;

  boxes.forEach(line => {
    line.forEach(({ rotation, position, material }) => {
      rotation.x += 0.05 * (position.z + 1);
      rotation.y += 0.1 * (position.z + 1);
      position.z = Math.sin((position.y + position.x) / 2 - 2.5 + virtualTime);
      material.color = new THREE.Color(`hsl(${(position.z + 1) * 200},50%,70%)`);
      material.opacity = (position.z + 1.1) / 2.1;
    });
  });
  group2.rotation.z += 0.05;
  group2.position.z = Math.sin(virtualTime);
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
