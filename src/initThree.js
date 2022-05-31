import '../assets/style.css'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

function init() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer({ antialias: true })

  camera.position.set(25, 5, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  const controls = new TrackballControls(camera, renderer.domElement)
  controls.rotateSpeed = 1.0
  controls.zoomSpeed = 1
  controls.panSpeed = 0.5
  controls.keys = ['KeyA', 'KeyS', 'KeyD']

  return { camera, scene, renderer, controls }
}

export { init, THREE }
