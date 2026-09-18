import * as THREE from "three";
import gsap from 'gsap';
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


// ---------------- geometry   ---------------- //
const boxGeometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();
const torusGeometry = new THREE.TorusGeometry();


// ---------------- material   ---------------- //

const material = new THREE.MeshBasicMaterial({color:"white"});

const hoverMaterial = new THREE.MeshBasicMaterial({color:"red"});

// ------------------ meshes ------------------- //

const cube = new THREE.Mesh( boxGeometry, material );
const sphere = new THREE.Mesh( sphereGeometry, material );
const torus = new THREE.Mesh( torusGeometry, material );


sphere.position.set(2,0,0);
torus.position.set(-2,0,0);



const shapes = [cube , sphere , torus]

scene.add( ...shapes );



// ---------------- camera ---------------- //

const camera = new THREE.PerspectiveCamera(
	45,
	canvasElement.clientWidth / canvasElement.clientHeight,
	0.1,
	1000,
);
camera.position.set(0, 2, 10);
camera.lookAt(0,0,0);

scene.add(camera);


// ---------------- renderer ---------------- //
const renderer = new THREE.WebGLRenderer({
	canvas: canvasElement,
});


// ---------------- controls ---------------- //

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;

// ---------------- Raycaster ---------------- //
const raycaster = new THREE.Raycaster()
let hovered = null
// const rayOrigin = new THREE.Vector3(-5,0,0)
// const rayDirection = new THREE.Vector3(5,0,0)
// rayDirection.normalize()

// raycaster.set(rayOrigin,rayDirection)

// const intersect = raycaster.intersectObjects(shapes)


// console.log(rayDirection.length())

// gsap.to(intersect[0].object.position,{
//   y:-5,
//   repeat:-1,
//   yoyo:true
// })



// ---------------- Mouse ---------------- //
const pointer = new THREE.Vector2(5,5)


function setPointer(e){

  const rect = renderer.domElement.getBoundingClientRect()
  // pointer.x = ((e.clientX - rect.left)/rect.width)*2-1
  // pointer.y = ((e.clientY - rect.top)/rect.height)*-2+1

  pointer.x = gsap.utils.mapRange(rect.left, rect.right, -1, 1, e.clientX)
  
  pointer.y = gsap.utils.mapRange(rect.top, rect.bottom, 1, -1, e.clientY)
  
}


// const bounce = () =>{
//   raycaster.setFromCamera(pointer,camera)

//   const intersect = raycaster.intersectObjects(shapes)
//   if(intersect.length > 0) {

//     // const target = intersect.object.position
//     const targets = intersect.map((e)=>e.object.position)
    
//     gsap.to(targets,{
//       y:2,
//       duration:2,
//       ease:"elastic.out",
//       stagger:.5
//     })
//   }
// }

renderer.domElement.addEventListener("pointermove",setPointer)

// ---------------- animate ---------------- //


const animate = () => {
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

    raycaster.setFromCamera(pointer,camera)

  const intersect = raycaster.intersectObjects(shapes)
  const target  = intersect[0]?.object ?? null

  if(target !== hovered) {
    if(hovered) hovered.material = material
    if(target) target.material = hoverMaterial
    hovered = target
  }
  
	
	orbit.update();
	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
};
animate();
