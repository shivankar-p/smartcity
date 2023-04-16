import { INVISIBLE_MATERIAL, ROOT_SCENE_ADD_TO_ENGINE_ON_SCENE_LOAD, ROOT_SCENE_VISIBILITY_STRATEGY, SCENE_MGR } from "./globals"
import { BaseEntityWrapper, SubScene } from "./modules/sceneMgmt/subScene"
import { SceneVector3Type, SpawnPoint } from "./modules/sceneMgmt/types"
import * as utils from '@dcl/ecs-scene-utils';

function createScene() {

  const _scene4 = new Entity('_scene4')
  if (ROOT_SCENE_ADD_TO_ENGINE_ON_SCENE_LOAD) engine.addEntity(_scene4)
  const transformScene3 = new Transform({
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  _scene4.addComponentOrReplace(transformScene3)

  return _scene4
}
function createDynamicScene(_scene4: Entity, subScene: SubScene) {


  const pivotScene = new Entity()
  pivotScene.addComponent(new Transform({
    position: new Vector3(16, 0, 18),
    rotation: Quaternion.Euler(0, 270, 0),
  }))
  pivotScene.setParent(_scene4)

 
  const platform = new Entity()
  subScene.addOnInitListener(()=>{
    //now add this to show lazy loading of entities on scene init/show
    //also put a delay to exaggerate the load
    //utils.setTimeout(3000,()=>{ 
      platform.setParent(pivotScene)
      platform.addComponent(new GLTFShape('models/stair.glb'))
      platform.addComponentOrReplace(new Transform({
        position: new Vector3(2, 0, 2),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(0.5, 0.5, 0.5)
      }))

    //})
    
  })

  


  //must put an invisible cube below it incase add to engine was used. if it takes time we need it to land on something
  const platformInivisibleFloor = new Entity()
  platformInivisibleFloor.setParent(pivotScene)
  platformInivisibleFloor.addComponent(new BoxShape)
  platformInivisibleFloor.addComponent(INVISIBLE_MATERIAL)
  platformInivisibleFloor.addComponentOrReplace(new Transform({
    position: new Vector3(0, 8 + .5, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(8, 1, 8)
  }))


  

}

export function createScene4() {
  const _scene4 = createScene()
  

  const galleryGroup4Base_ID = SCENE_MGR.generateSceneId() 
  const galleryGroupBase4 = new SubScene(galleryGroup4Base_ID, "sceneGroupBase4", [], undefined, undefined)

  galleryGroupBase4.spawnPoints.push(
    new SpawnPoint({
      name: "in the sky",
      position: new SceneVector3Type([8,8],[20,20],[22,22])
    })
  )

  createDynamicScene(_scene4,galleryGroupBase4)

  const sceneEntity = galleryGroupBase4.addEntity(_scene4)
  sceneEntity.visibilityStrategy = ROOT_SCENE_VISIBILITY_STRATEGY

  sceneEntity.addOnInitListener((entityWrap: BaseEntityWrapper) => {
    if (!sceneEntity.rootEntity.alive) engine.addEntity(sceneEntity.rootEntity)
  })


  SCENE_MGR.addScene(galleryGroupBase4)


  const toggleEnt = new Entity()
  toggleEnt.setParent(_scene4)
  //engine.addEntity(toggleEnt) 
  toggleEnt.addComponent(new GLTFShape('models/fuse.glb'))
  //toggleEnt.addComponent(new BoxShape())
  toggleEnt.addComponent(new Transform(
    {
      position: new Vector3(7.5, -2, 20.2),
      scale: new Vector3(3, 3, 3),
      rotation: Quaternion.Euler(0, 0, 0)
    }

  ))
  toggleEnt.addComponent(new OnPointerDown(() => {
    //add logic to open canvas and login
  },{
    hoverText: "Login"
  }))


  const toggleEnt2 = new Entity()
  toggleEnt2.setParent(_scene4)
  //engine.addEntity(toggleEnt) 
  toggleEnt2.addComponent(new GLTFShape('models/fuse.glb'))
  //toggleEnt.addComponent(new BoxShape())
  toggleEnt2.addComponent(new Transform(
    {
      position: new Vector3(19, -2, 17.8),
      scale: new Vector3(3, 3, 3),
      rotation: Quaternion.Euler(0, 0, 0)
    }

  ))
  toggleEnt2.addComponent(new OnPointerDown(() => {
    //add logic to open canvas and login
  },{
    hoverText: "Login"
  }))


  const toggleEnt3 = new Entity()
  toggleEnt3.setParent(_scene4)
  //engine.addEntity(toggleEnt) 
  toggleEnt3.addComponent(new GLTFShape('models/fuse.glb'))
  //toggleEnt.addComponent(new BoxShape())
  toggleEnt3.addComponent(new Transform(
    {
      position: new Vector3(19, -2, 23.8),
      scale: new Vector3(3, 3, 3),
      rotation: Quaternion.Euler(0, 180, 0)
    }

  ))
  toggleEnt3.addComponent(new OnPointerDown(() => {
    //add logic to open canvas and login
  },{
    hoverText: "Login"
  }))





  return galleryGroupBase4
}