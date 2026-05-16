import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "../../src/global-style.css";


const canvasElement = document.getElementById("canvas");
const scene = new THREE.Scene();

// ---------------- resizeRendererToDisplaySize ---------------- //

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

// ---------------- lights ---------------- //
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

// ---------------- material   ---------------- //
const material = new THREE.MeshPhysicalMaterial({
	color: "red",
});

// ---------------- meshes ---------------- //
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 2), material);

plane.position.x = -2;
sphere.position.x = 2;

scene.add(cube, sphere, plane);

// ---------------- camera ---------------- //

const camera = new THREE.PerspectiveCamera(
	45,
	canvasElement.clientWidth / canvasElement.clientHeight,
	0.1,
	1000,
);
camera.position.set(0, 0, 5);
camera.lookAt(cube.position);

scene.add(camera);

// ---------------- renderer ---------------- //
const renderer = new THREE.WebGLRenderer({
	canvas: canvasElement,
});

// ---------------- controls ---------------- //

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;

// ---------------- animate ---------------- //
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
