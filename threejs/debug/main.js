import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import '../../src/global-style.css';
import GUI from 'lil-gui'
import Stats from 'stats.js'


const canvasElement = document.getElementById('canvas')
const scene = new THREE.Scene();

// ---------------- Stats ---------------- //
var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );
// ---------------- resizeRendererToDisplaySize ---------------- //

function resizeRendererToDisplaySize(renderer,maxPixelCount = 3480 * 2160) {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio

    let width = Math.floor(canvas.clientWidth * pixelRatio)
    let height = Math.floor(canvas.clientHeight * pixelRatio)

    const pixelCount = width * height

    const renderScale = pixelCount > maxPixelCount ? Math.sqrt(maxPixelCount/pixelCount) : 1

    width = Math.floor(width*renderScale)
    height = Math.floor(height*renderScale)

    const needResize = canvas.width !== width || canvas.height !== height
    if(needResize){
        renderer.setSize(width, height, false)
    }
    return needResize
}

// ---------------- lights ---------------- //
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

// ---------------- options object   ---------------- //

const options = {
    color:'#af5a5a',
    animate:()=>{
        console.log("animated")
    }
}

// ---------------- material   ---------------- //
const material = new THREE.MeshPhysicalMaterial({
    color:options.color
});
material.transparent = true




// ---------------- meshes ---------------- //
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    material);

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(.8, 0.2, 100, 16),
    material);

    torusKnot.position.x = -2
    sphere.position.x = 2

scene.add(cube,sphere,torusKnot);


// ---------------- camera ---------------- //

const camera = new THREE.PerspectiveCamera(
    45,
    canvasElement.clientWidth/canvasElement.clientHeight,
.1,
1000
);
camera.position.set(0,0,5)
camera.lookAt(cube.position)

scene.add(camera);

// ---------------- renderer ---------------- //
const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
});

// ---------------- controls ---------------- //

const orbit = new OrbitControls(camera,renderer.domElement)
orbit.enableDamping  = true

// ---------------- gui ---------------- //
const gui = new GUI()
const materialOptions = gui.addFolder('materialFolder')

const cubeOptions  = gui.addFolder('cubeFolder')

materialOptions.add(material,'transparent')
materialOptions.add(material,'opacity')
.min(.1).max(1).step(.01)
materialOptions.add(material,'roughness')
.min(.1).max(1).step(.01)
materialOptions.add(material,'metalness')
.min(.1).max(1).step(.01)

materialOptions.addColor(options,'color')
.onChange(()=>{
    material.color.set(options.color)
})

cubeOptions.add(cube.scale,'x').min(.1).max(5).step(.01)

cubeOptions.add(cube.scale,'y',{ sm: 0.1, md: 1, lg: 5 } )

cubeOptions.add(options,'animate')





// ---------------- animate ---------------- //
orbit.update()
const animate = ()=> {
    stats.begin();
    if(resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }
    
    orbit.update()
    renderer.render(scene, camera); 

    stats.end();
    window.requestAnimationFrame(animate)
  
}
animate()
