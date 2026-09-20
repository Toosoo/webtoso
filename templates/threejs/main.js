import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "../../src/global-style.css";

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

const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: "red" }),
);
scene.add(cube);

const camera = new THREE.PerspectiveCamera(
	75,
	canvasElement.clientWidth / canvasElement.clientHeight,
);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;

gsap.to(cube.rotation, {
	y: Math.PI * 2,
	duration: 10,
	ease: "none",
	repeat: -1,
});

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
