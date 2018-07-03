import MonoBehavior from '../../u2dkit/RunTime/Script/MonoBehavior.js'
import Vector2      from '../../u2dkit/RunTime/Math/Vector2.js'

export default class RootBehavior extends MonoBehavior
{

  constructor0 ()
  {
    super.constructor0()
    this._map = null
    this._lastPosition = null
    this._scaleLevel = 1
    this._scale = 1
  }

  get scaleLevel ()
  {
    return this._scaleLevel
  }

  set scaleLevel (value)
  {
    this._scaleLevel = value
    this._scale = 1 + (this._scaleLevel - 1) * 0.5
  }

  onStart ()
  {
    this._map = this.findObjectInChildrenByName('map')
  }

  onTouchDown (touchEvent)
  {
    this._lastPosition = touchEvent.cameraVector
  }

  onDrag (touchEvent)
  {
    let newPosition = touchEvent.cameraVector
    console.log(newPosition.x, newPosition.y)
    let deltaPosition = newPosition.minus(this._lastPosition)

    let mapPosition = this._map.transform.position
    mapPosition = mapPosition.add(deltaPosition)

    if (mapPosition.x > 0)
    {
      mapPosition.x = 0
    } else if (mapPosition.x < (1 - this._scale) * 800)
    {
      mapPosition.x = (1 - this._scale) * 800
    } else
    {
      //pass
    }

    if (mapPosition.y > 0)
    {
      mapPosition.y = 0
    } else if (mapPosition.y < (1 - this._scale) * 500)
    {
      mapPosition.y = (1 - this._scale) * 500
    }
    this._map.transform.position = mapPosition

    this._lastPosition = newPosition
  }
}