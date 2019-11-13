import Behavior from '../BaseComponent/Behavior.js'

export default class MonoBehavior extends Behavior
{
  constructor0 ()
  {
    super.constructor0()
    this._isStart = false
  }

  start ()
  {
    if (!this._isStart)
    {
      this._isStart = true
      this.onStart()
    } else
    {
      //pass
    }
  }

  onStart ()
  {

  }

  /**
   *
   * @param {TouchEvent}touchEvent
   * @return {boolean}
   */

  captureEvent (touchEvent)
  {
    return true
  }

  onTouch (touchEvent)
  {

  }

  onUnTouch (touchEvent)
  {

  }

  onTouchDown (touchEvent)
  {

  }

  onTouchUpOrOut (touchEvent)
  {

  }

  onDrag (touchEvent)
  {

  }

  onColliderIn (colliderList)
  {

  }

  onColliderStay (colliderList)
  {

  }

  onColliderOut (colliderList)
  {

  }

  onColliderMiss (colliderList)
  {

  }
}