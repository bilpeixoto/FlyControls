import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js"
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect_ratio = SCREEN_WIDTH / SCREEN_HEIGHT;

let camera_perspective, active_camera, scene, renderer, stats, controls;
let cube_wooden, sphere, spotLight, spotLightHelper;

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
    scene.background = new THREE.Color(0x444444);
    camera_perspective = new THREE.PerspectiveCamera(45, aspect_ratio, 0.1, 1000);

    active_camera = camera_perspective;
    active_camera.position.set(1, 10, 10);

    //Esféra 0 
    const geometry = new THREE.SphereGeometry(1, 20, 20);
    const materialNormal = new THREE.MeshPhongMaterial({ color: 0x990000 });
    sphere = new THREE.Mesh(geometry, materialNormal);
    scene.add(sphere);

    sphere.position.x = 0;
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

    // Adiciona luz ambiente
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
    scene.add(ambientLight)

    // //Direcional Light
    // const directionalLight = new THREE.DirectionalLight(0xFFFF00, 0.5)
    // directionalLight.position.y = 30
    // scene.add( directionalLight );
    // spotLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    // scene.add(spotLightHelper);
    
    //SpotLightsVermelho
    const spotLightVermelho = new THREE.SpotLight(0xFF0000)
    spotLightVermelho.position.y = 20
    spotLightVermelho.position.x = -10
    let spotLightHelperVermelho = new THREE.DirectionalLightHelper(spotLightVermelho);
    scene.add(spotLightVermelho)
    scene.add(spotLightHelperVermelho);

    //SpotLightsVerde
    const spotLightVerde = new THREE.SpotLight(0x00FF00)
    spotLightVerde.position.y = 20
    let spotLightHelperVerde = new THREE.DirectionalLightHelper(spotLightVerde);
    scene.add(spotLightVerde)
    scene.add(spotLightHelperVerde);

    ///SpotLightsAzul
    const spotLightAzul = new THREE.SpotLight(0x0000FF)
    spotLightAzul.position.y = 20
    spotLightAzul.position.x = 10
    let spotLightHelperAzul = new THREE.DirectionalLightHelper(spotLightAzul);
    scene.add(spotLightAzul)
    scene.add(spotLightHelperAzul);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

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
    active_camera.position.set(1, 4, 15);

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

    controls.update();
    stats.update();

    renderer.render(scene, active_camera);
};

init();
animate();