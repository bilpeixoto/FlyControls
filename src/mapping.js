import { init, THREE } from './initThree'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { Mesh } from 'three'
const { scene, renderer, camera, controls } = init()
camera.position.set(0, 0, 12)

const texture = new THREE.TextureLoader().load('./assets/Bricks078_2K-JPG/Bricks078_2K_Color.jpg')
const bumpMap = new THREE.TextureLoader().load(
  './assets/Bricks078_2K-JPG/Bricks078_2K_AmbientOcclusion.jpg'
)
const normalMap = new THREE.TextureLoader().load(
  './assets/Bricks078_2K-JPG/Bricks078_2K_NormalGL.jpg'
)
const displacementMap = new THREE.TextureLoader().load(
  './assets/Bricks078_2K-JPG/Bricks078_2K_Displacement.jpg'
)

const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshPhongMaterial({ map: texture })
const sphere = new Mesh(geometry, material)
scene.add(sphere)

//Luz Ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)

//Cria luz
const light = new THREE.PointLight(0xfcd487, 2, 50)
light.position.set(0, 15, 0)
scene.add(light)

const gui = new GUI()
const guiParams = {
  MappingType: 'None'
}

gui
  .add(guiParams, 'MappingType', ['None', 'NormalMapping', 'BumpMapping', 'DisplacementMapping'])
  .onChange((value) => {
    if (value === 'None') {
      material.bumpMap = null
      material.normalMap = null
      material.displacementMap = null
      material.needsUpdate = true
    }
    if (value === 'NormalMapping') {
      material.normalMap = normalMap
      material.normalScale.set(2, 2)
      material.needsUpdate = true
      material.bumpMap = null
      material.displacementMap = null
    }
    if (value === 'BumpMapping') {
      material.bumpMap = bumpMap
      material.bumpScale = 0.2
      material.needsUpdate = true
      material.normalMap = null
      material.displacementMap = null
    }
    if (value === 'DisplacementMapping') {
      material.displacementMap = displacementMap
      material.displacementScale = 0.3
      material.normalMap = normalMap
      material.bumpMap = null
      material.needsUpdate = true
    }
  })

function animate() {
  light.position.x = Math.cos(Date.now() * 0.003) * 20
  controls.update()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
