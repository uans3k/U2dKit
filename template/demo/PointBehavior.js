import MonoBehavior from '../../u2dkit/RunTime/Script/MonoBehavior.js'
import TextRenderer from '../../u2dkit/RunTime/Render/Text/TextRenderer.js'
import Time         from '../../u2dkit/RunTime/Time/Time.js'
import TouchEvent   from '../../u2dkit/RunTime/Script/TouchEvent.js'

export default class PointBehavior extends MonoBehavior
{
  constructor0 ()
  {
    super.constructor0()
    this._isTouch = false
    this._text = null
    this._downPosition = null
  }

  onStart ()
  {
    this._text = this.findComponentInSelfByType(TextRenderer)

  }

  update ()
  {
    this._text.text = 'fps : ' + 1000 / Time.deltaFrameTime
  }

  captureEvent (touchEvent)
  {
    return true
  }

  onTouch (touchEvent)
  {
    if (!this._isTouch)
    {
      this.transform.multScale(1.2, 1.2)
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
      this.transform.multScale(1 / 1.2, 1 / 1.2)
      this._isTouch = false
    } else
    {
      //pass
    }
  }

  onDrag (touchEvent)
  {
    this.transform.setWorldPostion(touchEvent.worldVector)
  }

  onTouchDown (touchEvent)
  {
    this._downPosition = this.transform.position
  }

  onTouchUpOrOut (touchEvent)
  {
    if (touchEvent.type === TouchEvent.TYPE.OUT)
    {
      this.transform.position = this._downPosition
    } else
    {

    }
  }

  onColliderIn (colliderList)
  {

  }

  onColliderOut (colliderList)
  {

  }
}