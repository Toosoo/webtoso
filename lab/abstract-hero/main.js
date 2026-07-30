import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

gsap.registerPlugin(ScrollTrigger);

const canvasElement = document.getElementById("canvas");
const scene = new THREE.Scene();

// ---------------- Loader ---------------- //
const loader = new THREE.TextureLoader();
const matcap = loader.load("/matcaps/matcap-6.png");

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

// ---------------- material   ---------------- //

const material = new THREE.MeshMatcapMaterial({
	matcap: matcap,
});

// ---------------- meshes ---------------- //

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), material);
cube.position.set(1.2, 0.3, 0);
cube.rotation.set(0.6, 0.6, 0);

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.7, 0.05, 50, 200),
	material,
);
torus.position.set(-1.1, 0.5, 0);
torus.rotation.set(0.1, 0.1, 0);

const torusKnot = new THREE.Mesh(
	new THREE.TorusKnotGeometry(0.4, 0.05, 200, 200),
	material,
);
torusKnot.position.set(1.2, -1.2, 0);
torusKnot.rotation.set(-0.5, 0, 0);

const cylinder = new THREE.Mesh(
	new THREE.CylinderGeometry(0.1, 0.1, 2, 20),
	material,
);
cylinder.position.set(-1.2, -0.9, 0);
cylinder.rotation.set(0.1, 0, 0.9);

scene.add(cube, torus, torusKnot, cylinder);

// ---------------- camera ---------------- //

const camera = new THREE.PerspectiveCamera(
	45,
	canvasElement.clientWidth / canvasElement.clientHeight,
	0.1,
	1000,
);
camera.position.set(0, 0, 5);

scene.add(camera);

// ---------------- renderer ---------------- //
const renderer = new THREE.WebGLRenderer({
	canvas: canvasElement,
	alpha: true,
});

// ---------------- gui ---------------- //
const options = {
	cube: {
		scale: 1,
	},
	torus: {
		scale: 1,
		tube: 1,
		radialSegments: 10,
		tubularSegments: 10,
	},
	torusKnot: {
		scale: 1,
	},
	cylinder: {
		scale: 1,
	},
};
const gui = new GUI().close();

// cube controls
const cubeControls = gui.addFolder("cubeControls");
cubeControls
	.add(cube.position, "x")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("X Position");

cubeControls
	.add(cube.position, "y")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("Y Position");
cubeControls
	.add(cube.rotation, "x")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("X Rotation");
cubeControls
	.add(cube.rotation, "y")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("Y Rotation");
cubeControls
	.add(options.cube, "scale")
	.min(0.1)
	.max(3)
	.step(0.1)
	.onFinishChange((value) => {
		cube.scale.set(value, value, value);
	});

// torus controls
const torusControls = gui.addFolder("torusControls");

torusControls
	.add(torus.position, "x")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("X Position");
torusControls
	.add(torus.position, "y")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("Y Position");
torusControls
	.add(torus.rotation, "x")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("X Rotation");
torusControls
	.add(torus.rotation, "y")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("Y Rotation");
torusControls
	.add(options.torus, "scale")
	.min(0.1)
	.max(3)
	.step(0.1)
	.onFinishChange((value) => {
		torus.scale.set(value, value, value);
	});
torusControls
	.add(options.torus, "tube")
	.min(0.01)
	.max(2)
	.step(0.1)
	.onFinishChange((value) => {
		torus.geometry.dispose();
		torus.geometry = new THREE.TorusGeometry(
			torus.geometry.parameters.radius,
			value,
			torus.geometry.parameters.radialSegments,
			torus.geometry.parameters.tubularSegments,
		);
	});

// torusknot controls
const torusKnotControls = gui.addFolder("torusKnotControls");

torusKnotControls
	.add(torusKnot.position, "x")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("X Position");
torusKnotControls
	.add(torusKnot.position, "y")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("Y Position");
torusKnotControls
	.add(torusKnot.rotation, "x")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("X Rotation");
torusKnotControls
	.add(torusKnot.rotation, "y")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("Y Rotation");
torusKnotControls
	.add(options.torusKnot, "scale")
	.min(0.1)
	.max(3)
	.step(0.1)
	.onFinishChange((value) => {
		torusKnot.scale.set(value, value, value);
	});

// cylinder controls
const cylinderControls = gui.addFolder("cylinderControls");

cylinderControls
	.add(cylinder.position, "x")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("X Position");
cylinderControls
	.add(cylinder.position, "y")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("Y Position");
cylinderControls
	.add(cylinder.rotation, "x")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("X Rotation");
cylinderControls
	.add(cylinder.rotation, "y")
	.min(-3)
	.max(3)
	.step(0.1)
	.name("Y Rotation");
cylinderControls
	.add(options.cylinder, "scale")
	.min(0.1)
	.max(3)
	.step(0.1)
	.onFinishChange((value) => {
		cylinder.scale.set(value, value, value);
	});
// ---------------- controls ---------------- //
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;
controls.enableZoom = false;

// ---------------- gsap ---------------- //
const master = gsap.timeline();

const tl = gsap.timeline({
	defaults: {
		stagger: 0.1,
		ease: "power1.inOut",
		duration: 1.5,
	},
});

tl.from("h1,p", {
	autoAlpha: 0,
	y: 100,
})
	.from(
		[cube.rotation, torus.rotation, torusKnot.rotation, cylinder.rotation],
		{
			y: Math.PI,
			stagger: 0.1,
			ease: "power2.inOut",
			duration: 1.5,
		},
		"<20%",
	)
	.from(
		[cube.scale, torus.scale, torusKnot.scale, cylinder.scale],
		{
			y: 0,
			x: 0,
			z: 0,
			stagger: 0.1,
			ease: "power2.inOut",
			duration: 1.5,
		},
		"<",
	)
	.from(
		".blur-element",
		{
			autoAlpha: 0,
			ease: "power2.inOut",
			duration: 1.5,
		},
		"<",
	);

const tl2 = gsap.timeline({
	scrollTrigger: {
		trigger: "canvas",
		start: "top top",
		scrub: 2,
	},
	defaults: {
		ease: "none",
	},
});

tl2.to([cube.rotation, torus.rotation, torusKnot.rotation, cylinder.rotation], {
	z: -Math.PI,
	x: -Math.PI,
});

master.add(tl);
master.add(tl2);

// ---------------- animate ---------------- //

const animate = () => {
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	renderer.render(scene, camera);
	controls.update();

	window.requestAnimationFrame(animate);
};
animate();
