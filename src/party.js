import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { init, THREE } from './initThree'
const { scene, renderer, camera, controls } = init()

//Cria plano
const planeGeometry = new THREE.PlaneGeometry(300, 300, 50, 50)
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x222222, side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI / 2 //90 graus em radianos
scene.add(plane)

//Cria Background
const backgroundGeometry = new THREE.PlaneGeometry(300, 300, 50, 50)
const backgroundMaterial = new THREE.MeshPhongMaterial({
  color: 0x222222,
  side: THREE.DoubleSide
})
const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
background.position.x = -50
background.rotation.y = Math.PI / 2 //90 graus em radianos
scene.add(background)

//Cria TorusKnot
const torusGeometry = new THREE.TorusKnotGeometry(11.134, 0.75, 300, 16, 6)
const torusMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 })
const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial)
torusKnot.position.set(0, 4, 0)
torusKnot.rotation.y = Math.PI / 2
scene.add(torusKnot)

//Animação stormtrooper
let mixer
const loader = new ColladaLoader()
loader.load('../assets/stormtrooper/stormtrooper.dae', (collada) => {
  const avatar = collada.scene
  const animations = avatar.animations
  avatar.rotateZ(Math.PI * 1.5)
  avatar.traverse((node) => {
    if (node.isSkinnedMesh) {
      node.frustumCulled = false
    }
  })
  mixer = new THREE.AnimationMixer(avatar)
  mixer.clipAction(animations[0]).play()
  scene.add(avatar)
})

//Cria ambiente light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)

// Cria luz direcional
const directionalLight = new THREE.DirectionalLight(0xf7f97e, 0.5)
directionalLight.position.set(20, 20, 0)
scene.add(directionalLight)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(directionalLightHelper)

//Array com luzes coloridas
const colorfulLights = []

//Cria luz vermelho
const redLight = new THREE.PointLight(0xff0000, 2, 50)
redLight.position.set(0, 20, 0)
scene.add(redLight)
const redLightHelper = new THREE.PointLightHelper(redLight, 5)
scene.add(redLightHelper)
colorfulLights.push(redLight)

//Cria luz azul
const blueLight = new THREE.PointLight(0x0000ff, 1, 50)
blueLight.position.set(0, 20, 0)
scene.add(blueLight)
const blueLightHelper = new THREE.PointLightHelper(blueLight, 5)
scene.add(blueLightHelper)
colorfulLights.push(blueLight)

//Cria luz verde
const greenLight = new THREE.PointLight(0x00ff00, 1, 50)
greenLight.position.set(0, 20, 0)
scene.add(greenLight)
const greenLightHelper = new THREE.PointLightHelper(greenLight, 5)
scene.add(greenLightHelper)
colorfulLights.push(greenLight)

//Array com helpers
const helpers = [directionalLightHelper, blueLightHelper, redLightHelper, greenLightHelper]
helpers.forEach((helper) => {
  helper.visible = false
})

// Cria fonte de audio
let listener = new THREE.AudioListener()
camera.add(listener)
let sound = new THREE.Audio(listener)
let audioLoader = new THREE.AudioLoader()
//Carrega e reproduz audio
audioLoader.load('../sounds/sandstorm.mp3', (buffer) => {
  sound.setBuffer(buffer)
  sound.setLoop(true)
  sound.setVolume(0)
  sound.play()
})

//Cria GUI
const guiParams = {
  ambientLight: true,
  directionalLight: true,
  colorfulLights: true,
  flashLights: true,
  helpers: false,
  sound: 0
}
const gui = new GUI()
gui.add(guiParams, 'ambientLight').onChange((value) => {
  ambientLight.visible = value
})

gui.add(guiParams, 'directionalLight').onChange((value) => {
  directionalLight.visible = value
})

gui.add(guiParams, 'colorfulLights').onChange((value) => {
  colorfulLights.forEach((light) => {
    light.intensity = value ? 1 : 0
  })
})

gui.add(guiParams, 'flashLights')

gui.add(guiParams, 'helpers').onChange((value) => {
  helpers.forEach((helper) => {
    helper.visible = value
  })
})

gui.add(guiParams, 'sound', 0, 1).onChange((value) => {
  sound.setVolume(value)
})

//Função animate
const clock = new THREE.Clock()
function animate() {
  let i = 0
  colorfulLights.forEach((light) => {
    light.position.x = Math.sin((Date.now() + i) * 0.007) * 20
    light.position.z = Math.cos((Date.now() + i) * 0.007) * 20
    i += 1000

    if (Math.random() < 0.3 && guiParams.flashLights) light.visible = !light.visible
    else light.visible = true
  })

  const delta = clock.getDelta()
  if (mixer) mixer.update(delta)

  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()
}
animate()
