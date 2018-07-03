import LinkList        from '../RunTime/DataStructure/LinkList.js'
import CanvasManager   from '../RunTime/Canvas/CanvasManager.js'
import CameraManager   from '../RunTime/Canvas/CameraManager.js'
import ColliderManager from '../RunTime/Physic/ColliderManager.js'
import ScriptManager   from '../RunTime/Script/ScriptManager.js'
import ResourceManager from '../RunTime/Resource/ResourceManager.js'
import SceneManager    from '../RunTime/Scene/SceneManager.js'
import RendererManager from '../RunTime/Render/RendererManager.js'
import EventManager    from '../RunTime/Script/EventManager.js'
import TimeManager     from '../RunTime/Time/TimeManager.js'

const managerList = new LinkList()

let canvasManager = CanvasManager.instance
let timeManager = TimeManager.instance
let resourceManager = ResourceManager.instance
let eventManager = EventManager.instance
let sceneManager = SceneManager.instance
let cameraManager = CameraManager.instance
let colliderManager = ColliderManager.instance
let scriptManager = ScriptManager.instance
let renderManager = RendererManager.instance

managerList.pushTail(canvasManager)
managerList.pushTail(timeManager)
managerList.pushTail(resourceManager)
managerList.pushTail(eventManager)
managerList.pushTail(sceneManager)
managerList.pushTail(cameraManager)
managerList.pushTail(colliderManager)
managerList.pushTail(scriptManager)
managerList.pushTail(renderManager)

export default managerList