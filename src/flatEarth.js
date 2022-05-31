import { init, THREE } from './initThree'
const { scene, renderer, camera, controls } = init()

//Cria e adiciona terra plana a cena :')
const flatEarthGeometry = new THREE.CircleGeometry(5, 32)
const flatEarthTexture = new THREE.TextureLoader().load('../assets/flatEarthTexture.png')
const flatEarthMaterial = new THREE.MeshStandardMaterial({ map: flatEarthTexture })
const flatEarth = new THREE.Mesh(flatEarthGeometry, flatEarthMaterial)
scene.add(flatEarth)
flatEarth.rotation.x = -1.5
flatEarth.position.y = -1.3

//Cria e adiciona sol a cena
const sunGeometry = new THREE.SphereGeometry(0.3, 32, 32)
const sunTexture = new THREE.TextureLoader().load('../assets/sunTexture.jpg')
const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture })
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

//Cria e adiciona background a cena
const spaceTextura = new THREE.TextureLoader().load('../assets/space.jpg')
scene.background = spaceTextura

let sunCorrection = 0.1
let increaseSunCorrection = true

function animate() {
  sun.rotation.y += 0.003

  if (increaseSunCorrection) sunCorrection += 0.0015
  else sunCorrection -= 0.0015

  if (sunCorrection >= 1.3) increaseSunCorrection = false
  if (sunCorrection <= 0.05) increaseSunCorrection = true

  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
