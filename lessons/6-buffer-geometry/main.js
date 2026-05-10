import * as THREE from 'three';
import '../../src/global-style.css';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const canvasElement = document.getElementById('canvas')


const scene = new THREE.Scene();


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

const geometry = new THREE.BufferGeometry()
const material = new THREE.MeshBasicMaterial({
    side:THREE.DoubleSide
})

const positions = [
 -1,0,0,
 0,1,0,
 1,0,0
]

const bufferAttr = new THREE.Float32BufferAttribute(positions,3)
geometry.setAttribute('position',bufferAttr)

const mesh = new THREE.Mesh(geometry,material)

scene.add(mesh)






const camera = new THREE.PerspectiveCamera(75,
    canvasElement.clientWidth/canvasElement.clientHeight);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement
});

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
controls.enableDamping = true;


const animate = ()=> {

    if(resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }
    controls.update();
    renderer.render(scene, camera);

    
    window.requestAnimationFrame(animate)
}
animate()
