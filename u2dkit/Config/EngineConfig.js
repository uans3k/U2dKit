import LinkList       from '../RunTime/DataStructure/LinkList.js'
import CameraEngine   from '../RunTime/Canvas/CameraEngine.js'
import RendererEngine from '../RunTime/Render/RendererEngine.js'
import ScriptEngine   from '../RunTime/Script/ScriptEngine.js'
import PhysicEngine   from '../RunTime/Physic/PhysicEngine.js'

const engineList = new LinkList()

let cameraEngine = new CameraEngine()
let physicEngine = new PhysicEngine()
let scriptEngine = new ScriptEngine()
let rendererEngine = new RendererEngine()

engineList.pushTail(cameraEngine)
engineList.pushTail(physicEngine)
engineList.pushTail(scriptEngine)
engineList.pushTail(rendererEngine)

export default engineList