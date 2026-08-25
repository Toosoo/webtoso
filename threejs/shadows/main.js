import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "../../src/global-style.css";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

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
// ambient light
const ambient = new THREE.AmbientLight(0xffffff, 1.3);

// // hemisphere light
// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 3);
// // hemisphere light helper
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
// 	hemisphereLight,
// 	1,
// );

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(-2, 1, -3);
directionalLight.castShadow = true;


directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.right = 5
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 15


// directionalLight.shadow.mapSize.set(1024,1024)


// directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(
	directionalLight,
	1,
);

// spot light
const spotLight = new THREE.SpotLight(0xffffff, 10, 6, Math.PI * 0.3, 1, 1);
spotLight.position.set(0, 3, 0);
spotLight.target.position.set(0, 0, 0);
spotLight.castShadow = true;

// spotLight.shadow.camera.near = 4.6
spotLight.shadow.camera.far = 5

// spotLight.shadow.mapSize.set(20,20)
// spotLight.shadow.mapSize.width = 
// spotLight.shadow.mapSize.height = 


// spot light helper
const spotLightHelper = new THREE.SpotLightHelper(spotLight, 'green');

// // rect area light
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 3, 1, 1);
// rectAreaLight.position.set(2, 2, 3);
// rectAreaLight.lookAt(0, 0, 0);

// // rect area light helper
// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight, "red");
// rectAreaLight.add(rectAreaLightHelper);

// // point light
// const pointLight = new THREE.PointLight(0xffffff, 3, 2, 2);
// pointLight.position.set(0, 0, -2);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5, "yellow");

const directionalLightCameraHelper = new THREE.CameraHelper( directionalLight.shadow.camera );

const spotLightCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );

scene.add(
	ambient,
	// hemisphereLight,
	// rectAreaLight,


	spotLight,
	directionalLight,
	// pointLight,
  

	// spotLightHelper,
	// hemisphereLightHelper,
	// directionalLightHelper,
	// rectAreaLightHelper,
	// pointLightHelper,

  // directionalLightCameraHelper,
  spotLightCameraHelper
);

// ---------------- material   ---------------- //
const material = new THREE.MeshStandardMaterial();

// ---------------- meshes ---------------- //
const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 50, 50, 50),
	material,
);
cube.castShadow = true;
const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 320), material);
const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(1, 2), material);
const torusKnot = new THREE.Mesh(
	new THREE.TorusKnotGeometry(0.6, 0.1, 100, 100),
	material,
);
torusKnot.castShadow = true;
const sphere = new THREE.Mesh(
	new THREE.SphereGeometry(0.6, 320, 320),
	material,
);
sphere.castShadow = true;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material);
plane.receiveShadow = true;
plane.position.set(0, -1, -1);
plane.rotation.x = -Math.PI / 2;

sphere.position.set(2, 0, 0);
torusKnot.position.set(-2, 0, 0);
octahedron.position.set(2, 0, -2);
cone.position.set(-2, 0, -2);
scene.add(cube, sphere, plane, torusKnot, octahedron, cone);

// ---------------- camera ---------------- //

const camera = new THREE.PerspectiveCamera(
	45,
	canvasElement.clientWidth / canvasElement.clientHeight,
	0.1,
	1000,
);
camera.position.set(0, 2, 4);
camera.lookAt(cube.position);

scene.add(camera);

// ---------------- renderer ---------------- //
const renderer = new THREE.WebGLRenderer({
	canvas: canvasElement,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap ;

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
