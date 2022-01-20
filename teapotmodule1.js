/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "https://threejs.org/examples/jsm/geometries/TeapotGeometry.js";
var renderer, camera, scene;
var mesh, pointLight;
var turn = true;
var angle = 0;
var meshs=[];
function init() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer = new THREE.WebGLRenderer();
	renderer.setSize (width, height);
	document.body.appendChild (renderer.domElement);
	renderer.setClearColor (0x888888);
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera (45, width/height, 1, 10000);
         camera.position.y = 300;
         camera.position.z = 400;
	let controls = new OrbitControls(camera, renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	///////////////////////////
	var gridXZ = new THREE.GridHelper(300, 30, 'red', 'white');
    scene.add(gridXZ);
	
	pointLight = new THREE.PointLight(0xffffff);
    scene.add (pointLight);
    scene.add (new THREE.PointLightHelper(pointLight, 8));//白色方塊大小

	var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
	
	let meshMaterial = new THREE.ShaderMaterial({
	uniforms: {
		lightpos: {type: 'v3', value: new THREE.Vector3(),color:'0xffc0cb'}
	},
	vertexShader: document.getElementById('myVertexShader').textContent,
	fragmentShader: document.getElementById('myFragmentShader').textContent
	});
	var geometry = new TeapotGeometry (10);//茶杯大小
	for(var a=0;a<10;a++){
		for(var b=0;b<10;b++){
			mesh = new THREE.Mesh(geometry, meshMaterial);
	        mesh.position.set(a*30-135,9,b*30-135);
			meshs.push(mesh);
			scene.add(mesh);
		}
	}
};
function animate() {
    if (turn) angle += 0.1;//燈光速度
    pointLight.position.set(90 * Math.cos(angle), 90, 90 * Math.sin(angle));    
    meshs[0].material.uniforms.lightpos.value.copy (pointLight.position);
    for(var c=0;c<100;c++)
	meshs[c].rotation.y = 1.3*angle;
    requestAnimationFrame(animate);
    render();
};
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
function render() {
    renderer.render(scene, camera);
};
export {init, animate, scene};

