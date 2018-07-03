import Collider from './Collider.js'
import Rect     from '../Shape/Rect.js'

export default class RectCollider extends Collider
{
  constructor0 ()
  {
    super.constructor0()
    this._rect = new Rect(0, 0, 0, 0)
  }

  set rect (value)
  {
    this._rect = value
  }
  //
  // hitLocal (localVector2)
  // {
  //   return localVector2.x > this._rect.minX
  //     && localVector2.x < this._rect.minX + this._rect.width
  //     && localVector2.y > this._rect.minY
  //     && localVector2.y < this._rect.minY + this._rect.height
  // }

  getVertexList ()
  {
    return this._rect.getVertextList()
  }
}