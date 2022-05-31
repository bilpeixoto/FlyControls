import { init, THREE } from './initThree'
const { scene, renderer, camera, controls } = init()

//Cria e adiciona terra a cena
const earthGeometry = new THREE.SphereGeometry(0.4, 32, 32)
const earthTexture = new THREE.TextureLoader().load('../assets/earthTexture.jpg')
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture })
const earth = new THREE.Mesh(earthGeometry, earthMaterial)
scene.add(earth)

//Cria e adiciona sol a cena
const sunGeometry = new THREE.SphereGeometry(3, 32, 32)
const sunTexture = new THREE.TextureLoader().load('../assets/sunTexture.jpg')
const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture })
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

//Cria e adiciona background a cena
const spaceTextura = new THREE.TextureLoader().load('../assets/space.jpg')
scene.background = spaceTextura

//Cria e adiciona luz do sol a cena
const pointLight = new THREE.PointLight(0xff7f00, 1.4, 100)
scene.add(pointLight)

//Cria e adiciona luz geral a cena
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

function animate() {
  earth.position.x = Math.sin(Date.now() * 0.007) * 15
  earth.position.z = Math.cos(Date.now() * 0.007) * 15

  earth.rotation.y -= 0.06
  sun.rotation.y += 0.003

  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
