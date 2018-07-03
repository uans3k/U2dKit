import UEngine       from '../Base/UEngine.js'
import Camera        from './Camera.js'
import CameraManager from './CameraManager.js'
import SceneManager  from '../Scene/SceneManager.js'

export default class CameraEngine extends UEngine
{
  exec ()
  {
    this._collect()
  }

  _collect ()
  {
    let rootObject = SceneManager.instance.currentSceneInstance

    let cameraList = rootObject.findComponentsInSelfChildrenByType(Camera)

    cameraList.sort
    (
      (rLeft, rRight) =>
      {
        return rLeft.depth < rRight.depth
      }
    )

    CameraManager.instance.cameraList = cameraList
  }
}