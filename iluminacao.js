import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'; //falar da gambiarra aqui
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect_ratio = SCREEN_WIDTH / SCREEN_HEIGHT;

let camera_perspective, camera_ortho, active_camera, scene, renderer, stats, controls;
let cube_wooden, sphere, torusKnot, sphereNormal, cubeNormal, torusKnotNormal, spotLight, spotLightHelper;
let spotLightMovementRight = true;

const params = {
    orthographicCamera: false,
    sphereControls: {
        showWireframe: false,
        opacity: 1.0,
        showNormal: false,
    },
    boxControls: {
        showNormal: false,
    },
    knotControls: {
        showWireframe: false,
        showNormal: false,
    }
};

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    camera_perspective = new THREE.PerspectiveCamera(45, aspect_ratio, 0.1, 1000);

    active_camera = camera_perspective;
    active_camera.position.set(1, 0.5, 10);

    //Esféra 0 
    const geometry = new THREE.SphereGeometry(1, 20, 20);
    const materialNormal = new THREE.MeshNormalMaterial();
    sphere = new THREE.Mesh(geometry, materialNormal);
    scene.add(sphere);

    sphere.position.x = 0;
    sphere.position.y = 1.5;
    sphere.position.z = 0;

    //Esféra 1
    const geometry1 = new THREE.SphereGeometry(1, 20, 20);
    const materialNormal1 = new THREE.MeshBasicMaterial();
    sphere = new THREE.Mesh(geometry1, materialNormal1);
    scene.add(sphere);

    sphere.position.x = 3;
    sphere.position.y = 1.5;
    sphere.position.z = 0;

    //Esféra 1
    const geometry2 = new THREE.SphereGeometry(1, 20, 20);
    const materialNormal2 = new THREE.MeshBasicMaterial();
    sphere = new THREE.Mesh(geometry2, materialNormal2);
    scene.add(sphere);

    sphere.position.x = 6;
    sphere.position.y = 1.5;
    sphere.position.z = 0;
    

    function createPlane(){
        const geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
        const material = new THREE.MeshLambertMaterial(
            {color: 0xa6f995, side: THREE.DoubleSide}
        );
        const plane = new THREE.Mesh(geometry, material);

        plane.position.x = 0;
        plane.position.y = 0.5;
        plane.position.z = 0;
        plane.rotation.x = Math.PI/2; //90 graus em radianos

        scene.add(plane);
    }

    createPlane();

    function addLight(){
        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 20, 0);
        spotLight.castShadow = true;
        scene.add(spotLight);

        spotLightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(spotLightHelper);
    }
    addLight();

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    const gui = new GUI();
    function createGUI(){
        gui.add(params, 'orthographicCamera').name('usar ortho').onChange(function (value){
            controls.dispose();
            createControls(value ? camera_ortho : camera_perspective);
        });
        let sphereControls = gui.addFolder('Sphere');
        sphereControls.add(params.sphereControls, 'opacity', 0, 1.0);
        sphereControls.add(params.sphereControls, 'showWireframe');
        sphereControls.add(params.sphereControls, 'showNormal');
        sphereControls.open();

        let knotControls = gui.addFolder('Torus Knot');
        knotControls.add(params.knotControls, 'showNormal');
        knotControls.add(params.knotControls, 'showWireframe');
        knotControls.open();
    }
    createGUI();

    createControls(camera_perspective);
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    aspect_ratio = SCREEN_WIDTH / SCREEN_HEIGHT;

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    active_camera.aspect = aspect_ratio;
    active_camera.updateProjectionMatrix();
}

function createControls(camera){
    active_camera = camera;
    active_camera.position.set(1, 0.5, 10);

    controls = new TrackballControls(active_camera, renderer.domElement);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ];
}

const animate = function () {
    requestAnimationFrame(animate);

    // sphere.rotation.x += 0.01;

    // if (spotLightMovementRight == true) {
    //     spotLight.position.x += 1;
    // }else{
    //     spotLight.position.x -= 1;
    // }

    // if (spotLight.position.x > 20){
    //     spotLightMovementRight = false;
    // }else if (spotLight.position.x < -20){
    //     spotLightMovementRight = true;
    // }

    //console.log(sphere.material);

    sphere.material.opacity = params.sphereControls.opacity;
    sphere.material.wireframe = params.sphereControls.showWireframe;

    spotLightHelper.update();
    controls.update();
    stats.update();

    renderer.render(scene, active_camera);
};

init();
animate();