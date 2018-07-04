import UEngine       from '../Base/UEngine.js'
import CanvasManager from '../Canvas/CanvasManager.js'
import CameraManager from '../Canvas/CameraManager.js'
import EventManager  from './EventManager.js'
import MonoBehavior  from './MonoBehavior.js'
import Scriptanager  from './ScriptManager.js'
import ScriptManager from './ScriptManager.js'
import Collider      from '../Physic/Collider.js'
import SceneManager  from '../Scene/SceneManager.js'
import TouchEvent    from './TouchEvent.js'

/**
 * @property  {MonoBehavior} _currentMono
 */
export default class ScriptEngine extends UEngine
{

  constructor0 ()
  {
    this._currentMono = null
    this._isCaptureDown = false
    this._captureCamera = null
  }

  pre ()
  {

  }

  exec ()
  {

    this._collect()

    this._start()

    this._dispatchCollision()

    this._dispatchEvent()

    this._update()
  }

  _start ()
  {
    let monoList = ScriptManager.instance.monoBehaviorList
    monoList.forEach
    (
      (mono) =>
      {
        mono.start()
      }
    )
  }

  _update ()
  {
    let monoList = ScriptManager.instance.monoBehaviorList

    monoList.forEach
    (
      (mono) =>
      {
        mono.update()
      }
    )

  }

  _dispatchCollision ()
  {
    let monoList = Scriptanager.instance.monoBehaviorList

    monoList.forEach
    (
      (mono) =>
      {
        let colliderList = mono.findComponentsInSelfByType(Collider)
        colliderList.forEach
        (
          (collider) =>
          {
            if (!collider.newColliderList.isEmpty())
            {
              mono.onColliderIn(collider.newColliderList)
            }

            if (!collider.oldColliderList.isEmpty())
            {
              mono.onColliderStay(collider.oldColliderList)
            }

            if (!collider.outColliderList.isEmpty())
            {
              mono.onColliderOut(collider.outColliderList)
            }

            if (!collider.missColliderList.isEmpty())
            {
              mono.onColliderMiss(collider.missColliderList)
            }
          }
        )
      }
    )

  }

  /**
   * collect monos and sort them by class's z
   * @private
   */
  _collect ()
  {
    let rootObject = SceneManager.instance.currentSceneInstance

    let monoList = rootObject.findComponentsInSelfChildrenByType(MonoBehavior)

    monoList.sort
    (
      (left, right) =>
      {
        return left.gameObject.transform.z > right.gameObject.transform.z
      }
    )

    Scriptanager.instance.monoBehaviorList = monoList
  }

  _dispatchEvent ()
  {

    let touchEvent = EventManager.instance.getTouchEvent()

    if (touchEvent != null)
    {

      if (this._isCaptureDown)
      {
        if (touchEvent.type === TouchEvent.TYPE.MOVE)
        {
          this._doCaptureDownMove(touchEvent)
        }
        else if (touchEvent.type === TouchEvent.TYPE.UP)
        {
          this._doCaptureDownUp(touchEvent)
        }
        else if (touchEvent.type === TouchEvent.TYPE.OUT)
        {
          this._doCaptureDownOut(touchEvent)
        } else
        {
          console.log('it is impossible ')
        }
      }
      else
      {
        if (touchEvent.type === TouchEvent.TYPE.OUT)
        {
          this._doTouchOut(touchEvent)
        } else if (touchEvent.type === TouchEvent.TYPE.DOWN)
        {
          this._doTouchDown(touchEvent)
        } else
        {
          //move or up
          this._doTouchMoveAndUp(touchEvent)
        }
      }
    }

  }

  _doCaptureDownMove (touchEvent)
  {
    console.assert(this._currentMono != null && this._captureCamera != null)
    touchEvent = this._getViewToCaptureTouchEvent(touchEvent)
    this._currentMono.onDrag(touchEvent)
  }

  _doCaptureDownUp (touchEvent)
  {
    console.assert(this._currentMono != null && this._captureCamera != null)
    touchEvent = this._getViewToCaptureTouchEvent(touchEvent)
    this._currentMono.onTouchUpOrOut(touchEvent)
    this._isCaptureDown = false
    this._doTouchMoveAndUp(touchEvent)
  }

  _doCaptureDownOut (touchEvent)
  {
    console.assert(this._currentMono != null && this._captureCamera != null)
    touchEvent = this._getViewToCaptureTouchEvent(touchEvent)
    this._currentMono.onTouchUpOrOut(touchEvent)
    this._isCaptureDown = false
    this._doTouchOut(touchEvent)
  }

  /**
   * only called when isCaptureDown =true
   *
   *it will fill touch event with world and local vector
   *
   * @return {TouchEvent}
   * @private
   */
  _getViewToCaptureTouchEvent (touchEvent)
  {
    console.assert(this._currentMono != null && this._captureCamera != null)

    let canvas = CanvasManager.instance.canvas
    let camera = this._captureCamera

    touchEvent.cameraVector = canvas
    .getViewportToCameraMatrix()
    .multVectorL(touchEvent.viewVector)

    touchEvent.worldVector = camera
    .getCameraToWorldMatrix()
    .multVectorL(touchEvent.cameraVector)

    touchEvent.localVector = this._currentMono.transform
    .getWorldToLocalMatrix()
    .multVectorL(touchEvent.worldVector)

    return touchEvent
  }

  _doTouchMoveAndUp (touchEvent)
  {

    let retArray = this._getCaptureMono(touchEvent)
    let captureMono = retArray[0]

    if (captureMono != null)
    {
      if (this._currentMono == null)
      {
        captureMono.onTouch(touchEvent)
        this._currentMono = captureMono
      } else if (this._currentMono === captureMono)
      {
        this._currentMono.onTouch(touchEvent)
      } else
      {
        this._currentMono.onUnTouch(touchEvent)
        captureMono.onTouch(touchEvent)
        this._currentMono = captureMono
      }
    } else
    {
      if (this._currentMono != null)
      {
        this._currentMono.onUnTouch(touchEvent)
        this._currentMono = null
      } else
      {
        //pass
      }
    }
  }

  _doTouchOut (touchEvent)
  {
    if (this._currentMono != null)
    {
      this._currentMono.onUnTouch(touchEvent)
    } else
    {
      //pass
    }
  }

  _doTouchDown (touchEvent)
  {
    let retArray = this._getCaptureMono(touchEvent)
    let captureMono = retArray[0]
    let captureCamera = retArray[1]

    if (captureMono != null)
    {

      if (this._currentMono != null && this._currentMono !== captureMono)
      {
        this._currentMono.onUnTouch(touchEvent)
      } else
      {
        //do nothing
      }

      captureMono.onTouch(touchEvent)
      captureMono.onTouchDown(touchEvent)
      this._currentMono = captureMono
      this._captureCamera = captureCamera
      this._isCaptureDown = true
    } else
    {
      if (this._currentMono != null)
      {
        this._currentMono.onUnTouch(touchEvent)
        this._currentMono = null
      } else
      {
        //pass
      }
    }

  }

  /**
   *
   * side effect : it will fill touch event with
   * the touch  position in CaptureMono’s class Local
   * and the touch position in world
   *
   *
   * @param {TouchEvent} touchEvent
   *
   * @return {[MonoBehavior,Camera]}
   * @private
   */
  _getCaptureMono (touchEvent)
  {

    let canvas = CanvasManager.instance.canvas
    let cameraList = CameraManager.instance.cameraList
    let monoList = ScriptManager.instance.monoBehaviorList

    let captureMono = null

    let captureCamera = cameraList.choose
    (
      (camera) =>
      {

        touchEvent.cameraVector = canvas
        .getViewportToCameraMatrix()
        .multVectorL(touchEvent.viewVector)

        touchEvent.worldVector = camera
        .getCameraToWorldMatrix()
        .multVectorL(touchEvent.cameraVector)

        let cameraMask = camera.targetLayersMask

        captureMono = monoList.choose
        (
          (mono) =>
          {
            let objLayer = mono.gameObject.layerMask
            if ((cameraMask & objLayer) === objLayer)
            {
              if (this._doCollide(mono.gameObject, touchEvent))
              {
                return mono.captureEvent(touchEvent)
              } else
              {
                return false
              }
            } else
            {
              return false
            }
          }
        )
        return captureMono !== null
      }
      , false
    )

    return [captureMono, captureCamera]
  }

  /**
   * side effect :
   * it will fill touch event
   * with the touch position in collided object Local
   *
   * @param {GameObject} gameObject
   * @param {TouchEvent} touchEvent
   * @return {boolean}
   * @private
   */
  _doCollide (gameObject, touchEvent)
  {
    let colliderList = gameObject.findComponentsInSelfByType(Collider)

    return colliderList.chooseBool
    (
      (collider) =>
      {
        let localVector = collider
        .transform
        .getWorldToLocalMatrix()
        .multVectorL(touchEvent.worldVector)

        touchEvent.localVector = localVector
        return collider.hitLocal(localVector)
      }
    )
  }

  later ()
  {

  }

}