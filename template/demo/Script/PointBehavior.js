import MonoBehavior from '../../../u2dkit/RunTime/Script/MonoBehavior.js'
import TextRenderer from '../../../u2dkit/RunTime/Render/Text/TextRenderer.js'
import TouchEvent   from '../../../u2dkit/RunTime/Script/TouchEvent.js'
import MapBehavior  from './MapBehavior.js'

export default class PointBehavior extends MonoBehavior
{

  constructor0 ()
  {
    super.constructor0()
    this._isTouch = false
    this._text = null
    this._downPosition = null
    this._point = null
    this._mapBehavior = null
    this._delete = false

  }

  onStart ()
  {
    this._text = this.findComponentInSelfByType(TextRenderer)
    this._mapBehavior = this.findComponentInAncestorByType(MapBehavior)

    if (this._point != null)
    {
      this.transform.position.x = this._point.x
      this.transform.position.y = this._point.y
      this._text.text = this._point.name
    } else
    {
      //pass
    }
  }

  update ()
  {

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
    this._point.x = this.transform.x
    this._point.y = this.transform.y
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
      this._point.x = this._downPosition.x
      this._point.y = this._downPosition.y
    } else
    {
      if (this._delete)
      {
        this._mapBehavior.removePoint(this)
      }
    }
  }

  get pointData ()
  {
    return this._point
  }

  set pointData (value)
  {
    this._point = value
  }

  get data ()
  {
    return this._point
  }

  set data (value)
  {
    this._point = value
  }

  onColliderIn (colliderList)
  {
    colliderList.chooseBool
    (
      (collider) =>
      {
        if (collider.gameObject.name === 'recycle')
        {
          this._delete = true
          return true
        } else
        {
          return false
        }
      }
    )
  }

  onColliderOut (colliderList)
  {
    colliderList.chooseBool
    (
      (collider) =>
      {
        if (collider.gameObject.name === 'recycle')
        {
          this._delete = false
          return true
        } else
        {
          return false
        }
      }
    )
  }
}