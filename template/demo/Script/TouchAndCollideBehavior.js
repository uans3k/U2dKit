import Collider      from '../../../u2dkit/RunTime/Physic/Collider.js'
import TouchBehavior from './TouchBehavior.js'

export default class TouchAndCollideBehavior extends TouchBehavior
{

  constructor0 ()
  {
    super.constructor0()
    this._isTrigger = false
    this._colliderList = null
    this._colliderInImg = 'default.jpg'
    this._colliderOutImg = 'default.jpg'
  }

  onStart ()
  {
    super.onStart()
    this._colliderList = this.findComponentsInSelfByType(Collider)
  }

  captureEvent (touchEvent)
  {
    return true
  }

  onColliderIn (colliderList)
  {
    if (!this._isTrigger)
    {
      this._isTrigger = true
      this._spirit.imgUrl = this.colliderInImg
    }
  }

  _colliderMissOrOut ()
  {
    if (this._isTrigger)
    {

      this._isTrigger = this._colliderList.chooseBool
      (
        (collider) =>
        {
          return collider.isCollide()
        }
      )
      if (!this._isTrigger)
      {
        this._spirit.imgUrl = this.colliderOutImg
      }
    } else
    {
      //pass
    }
  }

  onColliderOut (colliderList)
  {
    this._colliderMissOrOut()
  }

  onColliderMiss (colliderList)
  {
    this._colliderMissOrOut()
  }

  get colliderInImg ()
  {
    return this._colliderInImg
  }

  set colliderInImg (value)
  {
    this._colliderInImg = value
  }

  get colliderOutImg ()
  {
    return this._colliderOutImg
  }

  set colliderOutImg (value)
  {
    this._colliderOutImg = value
  }
}