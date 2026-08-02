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
const ambient = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambient);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

// ---------------- textures ---------------- //

const loader = new THREE.TextureLoader();

const baseColor = loader.load("/textures/fabric/basecolor.webp");
baseColor.colorSpace = THREE.SRGBColorSpace;

// baseColor.offset.y = - .2

const ao = loader.load("/textures/fabric/ambientOcclusion.png");
const height = loader.load("/textures/fabric/height.png");

const metallic = loader.load("/textures/fabric/metallic.png");
const normal = loader.load("/textures/fabric/normal.png");
const opacity = loader.load("/textures/fabric/opacity.png");
const roughness = loader.load("/textures/fabric/roughness.png");
const anisotropy = loader.load("/textures/fabric/anisotropy.png");

const allTextures = [
	baseColor,
	ao,
	metallic,
	height,
	normal,
	opacity,
	roughness,
	anisotropy,
];

allTextures.forEach((texture) => {
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(6, 6);
});

// ---------------- material   ---------------- //
const material = new THREE.MeshPhysicalMaterial({
	map: baseColor,
	// color:"yellow",
	normalMap: normal,
	// normalScale:new THREE.Vector2(10,10),
	roughnessMap: roughness,
	// roughness:1,
	metalnessMap: metallic,
	// metalness:1,
	aoMap: ao,
	// aoMapIntensity:2,
	displacementMap: height,
	displacementScale: 0.08,
	alphaMap: opacity,
	// transparent:true,
	anisotropyMap: anisotropy,
	// opacity:.5,
	// side:THREE.DoubleSide
	// wireframe:true
});

// ---------------- meshes ---------------- //
const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 50, 50, 50),
	material,
);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 320, 320), material);

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
