import UObject from '../Base/UObject.js'
import Vector2 from '../Math/Vector2.js'

export default class TouchEvent extends UObject
{

  constructor0 ()
  {
    this._viewVector = new Vector2(0, 0)
    this._worldVector = new Vector2(0, 0)
    this._cameraVector = new Vector2(0, 0)
    this._localVector = new Vector2(0, 0)
    this._type = TouchEvent.TYPE.DOWN
  }

  get cameraVector ()
  {
    return this._cameraVector
  }

  set cameraVector (value)
  {
    this._cameraVector = value
  }

  get viewVector ()
  {
    return this._viewVector
  }

  set viewVector (value)
  {
    this._viewVector = value
  }

  get localVector ()
  {
    return this._localVector
  }

  set localVector (value)
  {
    this._localVector = value
  }

  get enable ()
  {
    return this._enable
  }

  set enable (value)
  {
    this._enable = value
  }

  get type ()
  {
    return this._type
  }

  set type (value)
  {
    this._type = value
  }

  get worldVector ()
  {
    return this._worldVector
  }

  set worldVector (value)
  {
    this._worldVector = value
  }

}

TouchEvent.TYPE = {
  DOWN: 0,
  MOVE: 1,
  UP: 2,
  OUT: 3
}