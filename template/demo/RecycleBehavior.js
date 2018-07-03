import MonoBehavior from '../../u2dkit/RunTime/Script/MonoBehavior.js'
import Collider     from '../../u2dkit/RunTime/Physic/Collider.js'

export default class RecycleBehavior extends MonoBehavior
{
  constructor0 ()
  {
    super.constructor0()
    this._isTrigger = false
    this._colliderList = null
  }

  onStart ()
  {
    this._colliderList = this.findComponentsInSelfByType(Collider)
  }

  captureEvent (touchEvent)
  {
    return true
  }

  onTouch (touchEvent)
  {
    if (!this._isTouch && !this._isTrigger)
    {
      this.transform.multScale(1.05, 1.05)
      this._isTouch = true
    } else
    {
      //pass
    }

  }

  onUnTouch (touchEvent)
  {
    if (this._isTouch)
    {
      this.transform.multScale(1 / 1.05, 1 / 1.05)
      this._isTouch = false
    } else
    {
      //pass
    }
  }

  onDrag (touchEvent)
  {
    // this.transform.setWorldPostion(touchEvent.worldVector)
  }

  onTouchDown (touchEvent)
  {
    // this.transform.scale = new Vector2(1.3, 1.3)
  }

  onTouchUpOrOut (touchEvent)
  {
    // this.transform.scale = new Vector2(1, 1)
  }

  onColliderIn (colliderList)
  {
    if (!this._isTrigger)
    {
      this._isTrigger = true
      this.transform.multScale(1.05, 1.05)
    }
  }

  onColliderOut (colliderList)
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
        this.transform.multScale(1 / 1.05, 1 / 1.05)
      }
    } else
    {
      //pass
    }
  }
}