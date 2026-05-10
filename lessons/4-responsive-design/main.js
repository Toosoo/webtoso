import * as THREE from 'three';
import '../../src/global-style.css';
import gsap from 'gsap';

const canvasElement = document.getElementById('canvas')


const scene = new THREE.Scene();


// *************** old method 

// const sizes = {
//     width:window.innerWidth,
//     height:window.innerHeight
// }

// window.addEventListener('resize',()=>{
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     camera.aspect = sizes.width/sizes.height
//     camera.updateProjectionMatrix()

//     renderer.setSize(sizes.width,sizes.height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

// })


// *************** new method 

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


const cube = new THREE.Mesh(
new THREE.BoxGeometry(1, 1, 1),
new THREE.MeshBasicMaterial({ color: 'red' }));

scene.add(cube);

const camera = new THREE.PerspectiveCamera(75,
    canvasElement.clientWidth/canvasElement.clientHeight);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement
});


gsap.to(cube.rotation,{
    y:Math.PI * 2,
    z:Math.PI * 2,
    duration:10,
    ease:"none",
    repeat:-1
})

const animate = ()=> {

    if(resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera);

    
    window.requestAnimationFrame(animate)
}
animate()
