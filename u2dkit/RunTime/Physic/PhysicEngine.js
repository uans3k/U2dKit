import UEngine         from '../Base/UEngine.js'
import Collider        from './Collider.js'
import EventManager    from '../Script/EventManager.js'
import CameraManager   from '../Canvas/CameraManager.js'
import CanvasManager   from '../Canvas/CanvasManager.js'
import ColliderManager from './ColliderManager.js'
import SceneManager    from '../Scene/SceneManager.js'

export default class PhysicEngine extends UEngine
{
  constructor0 ()
  {
  }

  exec ()
  {
    this._collect()
    this._doCollide()
  }

  _doCollide ()
  {
    let colliderList = ColliderManager.instance.colliderList

    colliderList.forEach
    (
      (collider) =>
      {
        collider.preUpdate()
      }
    )

    let iterObjCollider = colliderList.iterator()
    let iterSubCollider = colliderList.iterator()

    // alert('do collide!')

    for (let i = 0, objCollider = iterObjCollider.begin(); iterObjCollider.hasNotEnd(); objCollider = iterObjCollider.next(), i++)
    {
      for (let j = 0, subCollider = iterSubCollider.begin(); iterSubCollider.hasNotEnd(); subCollider = iterSubCollider.next(), j++)
      {

        if (i < j)
        {

          let objMask = objCollider.targetLayersMask
          let subMask = subCollider.targetLayersMask
          let objLayer = objCollider.gameObject.layerMask
          let subLayer = subCollider.gameObject.layerMask

          if
          (
            ((objMask & subLayer) === subLayer)
            &&
            ((subMask & objLayer) === objLayer)
          )
          {
            if (objCollider.intersect(subCollider))
            {
              objCollider.colliderIn(subCollider)
              subCollider.colliderIn(objCollider)
            } else
            {
              objCollider.colliderOut(subCollider)
              subCollider.colliderOut(objCollider)
            }
          } else
          {
            //pass
          }

        } else
        {
          //pass
        }
      }
    }
    // alert('end do collide')
  }

  _collect ()
  {
    let rootObject = SceneManager.instance.currentSceneInstance
    let colliderList = rootObject.findComponentsInSelfChildrenByType(Collider)

    ColliderManager.instance.colliderList = colliderList
  }
}