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

const size = 1
const geometry = new THREE.BoxGeometry(size, 1, size)

// ---------------- material ---------------- //

const material = new THREE.MeshNormalMaterial()

// ---------------- mesh ---------------- //
const count = 5000

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

const cols = 70 
const spacing = size + .02
const rows = Math.ceil(count  / cols)

const offsetX  = (cols - 1 ) * spacing / 2
const offsetZ  = (rows - 1 ) * spacing / 2


for(let i = 0; i < count; i++) {

  const col = i % cols
  const row = Math.floor(i / cols)

  data.push({
    x: col * spacing - offsetX,
    y:0,
    z: (row * spacing - offsetZ),
    delay: 0
  })
}


// ---------------- camera ---------------- //
const camera = new THREE.PerspectiveCamera(
	75,
	canvasElement.clientWidth / canvasElement.clientHeight,
);
camera.position.set(0, 13, 20)
scene.add(camera);


// ---------------- renderer ---------------- //
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement,
  transparent:true,
  alpha:true,
 });


// ---------------- orbit controls ---------------- //

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;


// ---------------- Raycaster ---------------- //
const raycaster = new THREE.Raycaster()
let hovered = null


// ---------------- pointer ---------------- //

const pointer = new THREE.Vector2(5,5)


function setPointer(e){
  const rect = renderer.domElement.getBoundingClientRect()

  pointer.x = gsap.utils.mapRange(rect.left, rect.right, -1, 1, e.clientX)
  pointer.y = gsap.utils.mapRange(rect.top, rect.bottom, 1, -1, e.clientY)
}

// renderer.domElement.addEventListener("pointermove",setPointer)


const wave = {t:0}

function setPointerHit(e){
  setPointer(e)
  raycaster.setFromCamera(pointer,camera)

  const hit  = raycaster.intersectObject(cubes)
  const id = hit[0]?.instanceId
  
  if(id !== undefined) {


    const getDelay = gsap.utils.distribute(
      {each:.1,grid:[rows,cols],from:id}
    )

    data.forEach((d,i)=>d.delay = getDelay(i,d,data))

    const len  = Math.max(...data.map(d => d.delay)) + 1

    gsap.fromTo(wave,{
      t: 0
    },{
      t: len,
      duration:len,
      ease:"none",
      overwrite: true,
    })








    // gsap.fromTo(data,{
    //   offsetY: 0
    // },{
    //   offsetY: 2,
    //   overwrite: true,
    //   stagger:{
    //     each: .1,
    //     grid: [rows,cols],
    //     from: [id],
    //     yoyo: true,
    //     repeat: 1,
    //   },
    // })
  }

}

renderer.domElement.addEventListener("pointerdown",setPointerHit)




// ---------------- animate loop ---------------- //

const animate = () => {
	stats.begin();
// ---------------- resizeRendererToDisplaySize ---------------- //
	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}
  // ---------------- instances ---------------- //
  for (let i = 0; i < count; i++) {
    const d = data[i]

    const p = gsap.utils.clamp(0,1,wave.t - d.delay)

    dummy.position.set(
      d.x,
      d.y + 2 * Math.sin(p * Math.PI),
      d.z)

    dummy.updateMatrix()
    cubes.setMatrixAt(i, dummy.matrix)
  }
  cubes.instanceMatrix.needsUpdate = true
  cubes.computeBoundingSphere()

  // ---------------- pointer ---------------- //


 

	orbit.update();
	renderer.render(scene, camera);
	stats.end();

};

renderer.setAnimationLoop(animate);
