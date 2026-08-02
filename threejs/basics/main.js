import * as THREE from 'three';
import '../../src/global-style.css';

const canvasElement = document.getElementById('canvas')

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'blue' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, 900/600);
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement
});

renderer.setSize(900, 600);
renderer.render(scene, camera);

