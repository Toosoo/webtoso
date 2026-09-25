import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from 'stats.js';



// ---------------- get canvas element ---------------- //

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
// ---------------- geometry ---------------- //

const geometry = new THREE.BoxGeometry(.1, 1, 1)

// ---------------- material ---------------- //

const material = new THREE.MeshNormalMaterial()

// ---------------- mesh ---------------- //
const count = 100

  const cubes = new THREE.InstancedMesh(
    geometry,
    material,
    count
  );

  cubes.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

scene.add(cubes)


// ---------------- instances ---------------- //
let data = []
const dummy = new THREE.Object3D()

for (let i = 0 ; i < count ; i++) {
  // dummy.position.set(
  //  ( Math.random() - .5) *10 ,
  //  ( Math.random() - .5) *10 ,
  //  ( Math.random() - .5) *10 ,
  // )
  // dummy.updateMatrix()
  // cubes.setMatrixAt(i,dummy.matrix)

  data.push({
    x:( Math.random() - .5) *10,
    y:( Math.random() - .5) *10,
    z:( Math.random() - .5) *10,
    r:0,
    offsetY:0
  })

}




// ---------------- camera ---------------- //
const camera = new THREE.PerspectiveCamera(
	75,
	canvasElement.clientWidth / canvasElement.clientHeight,
);
camera.position.z = 5;
scene.add(camera);


// ---------------- renderer ---------------- //
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });


// ---------------- orbit controls ---------------- //

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;

// ---------------- animation ---------------- //

gsap.to(cubes.position, {
	x: -1,
	duration: 2,
  repeat:-1,
	ease: "none",
});

gsap.to(data, {
	r: Math.PI,
	duration: 2,
  stagger:{
    amount:1,
    yoyo:true,
    repeat: -1,
  },
	ease: "none",
});

// gsap.to(data, {
// 	offsetY: 1,
// 	duration: 1,
//   stagger:{
//     each:.05,
//     yoyo:true,
//     repeat: -1,
//   },
// 	ease: "power.inOut",
// });

// ---------------- animate loop ---------------- //
const animate = () => {
	stats.begin();

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

  for (let i = 0 ; i < count ; i++) {
    const d = data[i]
    // dummy.position.set(d.x,d.y + d.offsetY,d.z)
    dummy.position.set(
      (
        i - (count - 1)/2) * .2,
      0,
      0)
    dummy.rotation.x = d.r
    dummy.updateMatrix()
    cubes.setMatrixAt(i,dummy.matrix)
  }


  cubes.instanceMatrix.needsUpdate = true
  cubes.computeBoundingSphere()


	orbit.update();
	renderer.render(scene, camera);
	stats.end();

};

renderer.setAnimationLoop(animate);
