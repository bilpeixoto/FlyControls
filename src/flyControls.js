import { init, THREE } from './initThree'
const { scene, renderer, camera } = init()
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

//Instancia FlyControls
const controls = new FlyControls(camera, renderer.domElement)
controls.movementSpeed = 0.2

//Crio Esfera
const geometry = new THREE.SphereGeometry(3, 32, 32)

//Cria Textura
const moonTexture = new THREE.TextureLoader().load('../assets/moon.jpg')
const material = new THREE.MeshStandardMaterial({ map: moonTexture })

//Cria Malha
const moon = new THREE.Mesh(geometry, material)
scene.add(moon)

//Adiciona luz ambiente
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

//Cria e adiciona a cena estrelas
Array(300)
  .fill()
  .forEach(() => {
    const geometry = new THREE.SphereGeometry(0.1, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
  })

//Imagem de fundo
const spaceTextura = new THREE.TextureLoader().load('../assets/space.jpg')
scene.background = spaceTextura

//Anima cena
function animate() {
  requestAnimationFrame(animate)
  moon.rotation.y += 0.001
  renderer.render(scene, camera)
  controls.update(1)
}
animate()
