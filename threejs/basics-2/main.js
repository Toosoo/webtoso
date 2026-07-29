import * as THREE from 'three';
import '../../src/global-style.css';
import gsap from 'gsap';

const canvasElement = document.getElementById('canvas')

const scene = new THREE.Scene();

const group1 = new THREE.Group()
scene.add(group1);

group1.position.x = 1

const cube1 = new THREE.Mesh(
new THREE.BoxGeometry(1, 1, 1),
new THREE.MeshBasicMaterial({ color: 'blue' }));

const cube2 = new THREE.Mesh(
new THREE.BoxGeometry(1, 1, 1),
new THREE.MeshBasicMaterial({ color: 'red' }));


gsap.to(cube1.position,{
    y:2,
    duration:1,
    repeat:-1,
    yoyo:true
})

group1.add(cube1);
group1.add(cube2);


cube2.position.x = -2


const camera = new THREE.PerspectiveCamera(75, 900/600);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement
});

renderer.setSize(900, 600);

const animate = ()=> {
    renderer.render(scene, camera);
    
    window.requestAnimationFrame(animate)
}
animate()
