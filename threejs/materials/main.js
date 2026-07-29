import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "../../src/global-style.css";
import matcap1 from "/matcaps/matcap-1.png";
import matcap2 from "/matcaps/matcap-2.png";
import matcap3 from "/matcaps/matcap-3.png";
import matcap4 from "/matcaps/matcap-4.png";

const textureLoader = new THREE.TextureLoader();

const canvasElement = document.getElementById("canvas");

const scene = new THREE.Scene();

function resizeRendererToDisplaySize(renderer, maxPixelCount = 3480 * 2160) {
	const canvas = renderer.domElement;
	const pixelRatio = window.devicePixelRatio;

	let width = Math.floor(canvas.clientWidth * pixelRatio);
	let height = Math.floor(canvas.clientHeight * pixelRatio);

	const pixelCount = width * height;

	const renderScale =
		pixelCount > maxPixelCount ? Math.sqrt(maxPixelCount / pixelCount) : 1;

	width = Math.floor(width * renderScale);
	height = Math.floor(height * renderScale);

	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}

// lights
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

// const material = new THREE.MeshBasicMaterial({
//     color: 'red',
// });
// material.wireframe = true
// material.opacity = .5
// material.transparent = true
// material.colorWrite = false

// const material = new THREE.MeshNormalMaterial();

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = textureLoader.load(matcap4)

// const material = new THREE.MeshPhongMaterial();
// material.color = new THREE.Color("red")

const material = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color("red");
material.roughness = 0.4;
material.metalness = 0.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);

const torusKnot = new THREE.Mesh(
	new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16),
	material,
);

torusKnot.position.x = -2;
sphere.position.x = 2;

scene.add(cube, sphere, torusKnot);

const camera = new THREE.PerspectiveCamera(
	45,
	canvasElement.clientWidth / canvasElement.clientHeight,
	0.1,
	1000,
);
camera.position.set(0, 0, 5);
camera.lookAt(cube.position);

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
	canvas: canvasElement,
});

const orbit = new OrbitControls(camera, renderer.domElement);

// orbit.autoRotate = true
orbit.enableDamping = true;
// orbit.enablePan = false

orbit.update();
const animate = () => {
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
	orbit.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(animate);
};
animate();
