import * as THREE from "three";
import gsap from 'gsap';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "../../src/global-style.css";
import Stats from 'stats.js';


const canvasElement = document.getElementById("canvas");
const scene = new THREE.Scene();

// ---------------- stats ---------------- //
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);



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

// ---------------- texture   ---------------- //
const loader = new THREE.TextureLoader()
const shape1 = loader.load("/assets/particles/circle_02.png")
const shape2 = loader.load("/assets/particles/circle_05.png")
const shape3 = loader.load("/assets/particles/star_07.png")

// ---------------- geometry   ---------------- //
const count = 500
const vertices = [];
const targets = []
// const colors = []

for ( let i = 0; i < count; i ++ ) {

  ////***** option 1
  vertices[i]=THREE.MathUtils.randFloatSpread( 20 )
  targets[i]=THREE.MathUtils.randFloatSpread( 20 )
  // colors[i] = Math.random()



  ////***** option 2 

  // vertices[i]=(Math.random()-.5) * 20



 //*****  option 3 

	// const x = THREE.MathUtils.randFloatSpread( 200 );
	// const y = THREE.MathUtils.randFloatSpread( 200 );
	// const z = THREE.MathUtils.randFloatSpread( 200 );
	// vertices.push( x, y, z );


  //***** option 4 


// 	vertices.push( 
//     THREE.MathUtils.randFloatSpread( 200 ),
//     THREE.MathUtils.randFloatSpread( 200 ),
//     THREE.MathUtils.randFloatSpread( 200 )
// );

}

const geometry = new THREE.BufferGeometry();

const positionAttribute = new THREE.Float32BufferAttribute( vertices, 3 ) 

geometry.setAttribute( 'position', positionAttribute );

 



// const colorAttribute = new THREE.Float32BufferAttribute( colors, 3 ) 

// geometry.setAttribute( 'color', colorAttribute );



// ---------------- material   ---------------- //

const material = new THREE.PointsMaterial({
  // color:"white"
});
material.size = .8
material.transparent = true
material.alphaMap = shape1
// material.vertexColors = true

// material.sizeAttenuation = true
// material.alphaTest = .01
// material.depthTest = false
// material.opacity = .3
// material.blending = THREE.AdditiveBlending


material.depthWrite = false



// ------------------ meshes ------------------- //

const points = new THREE.Points( geometry, material );

scene.add( points );


// const sphere = new THREE.Mesh( 
//   new THREE.SphereGeometry(),
//   new THREE.MeshBasicMaterial() 
// );

//   scene.add(sphere)

// ---------------- animation   ---------------- //
console.log(targets)

gsap.to(positionAttribute.array,{
  endArray : targets,
  duration:50,
  yoyo:true,
  repeat:-1,
ease:"none",
onUpdate:()=>{
  positionAttribute.needsUpdate = true
}
})
// ---------------- camera ---------------- //

const camera = new THREE.PerspectiveCamera(
	45,
	canvasElement.clientWidth / canvasElement.clientHeight,
	0.1,
	1000,
);
camera.position.set(0, 2, 50);
camera.lookAt(0,0,0);

scene.add(camera);

// ---------------- renderer ---------------- //
const renderer = new THREE.WebGLRenderer({
	canvas: canvasElement,
});


// ---------------- controls ---------------- //

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;

// ---------------- animate ---------------- //

const animate = () => {
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
	stats.begin();
	orbit.update();
	renderer.render(scene, camera);
	stats.end();

	window.requestAnimationFrame(animate);
};
animate();
