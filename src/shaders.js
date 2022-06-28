import { init, THREE } from './initThree'
const { camera, controls, renderer, scene } = init()
camera.position.set(0, 0, 20)

const uniforms = {
  u_resolution: { type: "v2", value: new THREE.Vector2() },
  u_time: { type: "f", value: 1.0 },
  u_mouse: { type: "v2", value: new THREE.Vector2() },
}
const clock = new THREE.Clock();

const redAnimationFragmentShader = `
  uniform vec2 u_mouse; // mouse position in screen pixels
  uniform vec2 u_resolution; //Canvas size (width,height)
  uniform float u_time; // shader playback time (in seconds)
  void main() {
    gl_FragColor = vec4(1.0, 0.0, abs(sin(u_time * 3.0)), 1.0);
  }
`
const normalVertexShader = `
  varying vec3 v_normal;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_normal = normal;
  }
`

// geometry and material
const boxGeometry = new THREE.BoxGeometry(4, 4, 4)
const material = new THREE.ShaderMaterial({
  vertexShader: normalVertexShader,
  fragmentShader: redAnimationFragmentShader,
  uniforms
})

const shaderMesh = new THREE.Mesh(boxGeometry, material)
scene.add(shaderMesh)

function animate() {
  shaderMesh.rotation.x = Math.cos(Date.now() * 0.001)
  shaderMesh.rotation.z = Math.sin(Date.now() * 0.001)
  requestAnimationFrame(animate)
  uniforms.u_time.value = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
}
animate()