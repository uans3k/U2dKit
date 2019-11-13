import Shape         from './Shape.js'
import Vector2       from '../Math/Vector2.js'
import ArrayIterator from '../DataStructure/ArrayIterator.js'
import LinkList      from '../DataStructure/LinkList.js'

export default class Rect extends Shape
{
  constructor0 ()
  {
    this._minX = 0
    this._minY = 0
    this._width = 0
    this._hight = 0
  }

  constructor4 (minX, minY, width, height)
  {
    this._minX = minX
    this._minY = minY
    this._width = width
    this._hight = height
  }

  getVertextList ()
  {
    let list = new LinkList()
    list.pushTail(new Vector2(this.minX, this.minY))
    list.pushTail(new Vector2(this.minX + this.width, this.minY))
    list.pushTail(new Vector2(this.minX + this.width, this.minY + this.height))
    list.pushTail(new Vector2(this.minX, this.minY + this.height))
    return list
  }

  get minX ()
  {
    return this._minX
  }

  set minX (value)
  {
    this._minX = value
  }

  get minY ()
  {
    return this._minY
  }

  set minY (value)
  {
    this._minY = value
  }

  get width ()
  {
    return this._width
  }

  set width (value)
  {
    this._width = value
  }

  get height ()
  {
    return this._hight
  }

  set height (value)
  {
    this._hight = value
  }

  toString ()
  {
    return this.minX + ',' + this.minY + ',' + this.width + ',' + this.height
  }
}
