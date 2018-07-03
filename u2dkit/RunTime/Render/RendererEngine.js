import UEngine         from '../Base/UEngine.js'
import Renderer        from '../BaseComponent/Renderer.js'
import CameraManager   from '../Canvas/CameraManager.js'
import CanvasManager   from '../Canvas/CanvasManager.js'
import SceneManager    from '../Scene/SceneManager.js'
import RendererManager from './RendererManager.js'

export default class RendererEngine extends UEngine
{
  exec ()
  {
    this._collect()
    this._doRender()
  }

  _doRender ()
  {

    let rendererList = RendererManager.instance.rendererList

    let cameraIter = CameraManager.instance.cameraList.iterator()

    let canvas = CanvasManager.instance.canvas
    canvas.clear()

    for (let camera = cameraIter.begin(); cameraIter.hasNotEnd(); camera = cameraIter.next())
    {
      canvas.camera = camera
      let cameraMask = camera.targetLayersMask

      rendererList.forEach
      (
        (renderer) =>
        {
          let rendererLayer = renderer.gameObject.layerMask
          if
          (
            renderer.isVisible
            &&
            ((cameraMask & rendererLayer) === rendererLayer)

          )
          {
            renderer.render(canvas)
          } else
          {
            //pass
          }
        }
      )
    }
  }

  //later ,observation
  _collect ()
  {
    let rootObject = SceneManager.instance.currentSceneInstance
    let rendererList = rootObject.findComponentsInSelfChildrenByType(Renderer)
    rendererList.sort
    (
      (left, right) =>
      {
        return left.gameObject.transform.z < right.gameObject.transform.z
      }
    )

    RendererManager.instance.rendererList = rendererList
  }

}