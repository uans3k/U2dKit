import MonoBehavior   from '../../../u2dkit/RunTime/Script/MonoBehavior.js'
import SpriteRenderer from '../../../u2dkit/RunTime/Render/Sprite/SpriteRenderer.js'

export default class TouchBehavior extends MonoBehavior
{

  constructor0 ()
  {
    super.constructor0()
    this._isTrigger = false
    this._spirit = null
    this._touchImg = 'default.jpg'
    this._unTouchImg = 'default.jpg'
  }

  onStart ()
  {
    this._spirit = this.findComponentInSelfByType(SpriteRenderer)
  }

  captureEvent (touchEvent)
  {
    return true
  }

  onTouch (touchEvent)
  {
    if (!this._isTouch && !this._isTrigger)
    {
      this._spirit.imgUrl = this._touchImg
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
      this._spirit.imgUrl = this._unTouchImg
      this._isTouch = false
    } else
    {
      //pass
    }
  }

  get touchImg ()
  {
    return this._touchImg
  }

  set touchImg (value)
  {
    this._touchImg = value
  }

  get unTouchImg ()
  {
    return this._unTouchImg
  }

  set unTouchImg (value)
  {
    this._unTouchImg = value
  }

}