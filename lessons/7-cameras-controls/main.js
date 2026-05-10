import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import '../../src/global-style.css';

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

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' }));

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'blue' }));
cube2.position.x = -2;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'green' }));
cube3.position.x = 2;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({ color: 'maroon' }));

scene.add(cube1,cube2,cube3,plane);

const camera = new THREE.PerspectiveCamera(
    45,
    canvasElement.clientWidth/canvasElement.clientHeight,
.1,
1000
);
camera.position.set(0,2,5)
camera.lookAt(cube1.position)

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
});

const orbit = new OrbitControls(camera,renderer.domElement)

// orbit.autoRotate = true
orbit.enableDamping  = true
// orbit.enablePan = false


orbit.update()
const animate = ()=> {
    if(resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }
    orbit.update()
    renderer.render(scene, camera); 
    window.requestAnimationFrame(animate)
}
animate()
