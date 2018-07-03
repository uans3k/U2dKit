export default class Vector2
{
  constructor (x, y)
  {
    this._x = x
    this._y = y
  }

  mult (vector2)
  {
    var x = this.x * vector2.x
    var y = this.y * vector2.y

    return new Vector2(x, y)
  }

  multSelf (vector2)
  {
    this.x = this.x * vector2.x
    this.y = this.y * vector2.y
    return this
  }

  addSelf (vector2)
  {
    this.x = this.x + vector2.x
    this.y = this.y + vector2.y
    return this
  }

  add (vector2)
  {
    var x = this.x + vector2.x
    var y = this.y + vector2.y
    return new Vector2(x, y)
  }

  minus (vector2)
  {
    var x = this.x - vector2.x
    var y = this.y - vector2.y
    return new Vector2(x, y)
  }

  reverse ()
  {
    var x = -this.x
    var y = -this.y
    return new Vector2(x, y)
  }

  inverse ()
  {
    let x = 1 / this.x
    let y = 1 / this.y
    return new Vector2(x, y)
  }

  reverseSelf ()
  {
    this.x = -this.x
    this.y = -this.y
    return this
  }

  dot (vector2)
  {
    return this.x * vector2.x + this.y * vector2.y
  }

  length ()
  {
    return Math.sqrt(this.x * this.x + this.y * this.x)
  }

  getCopy ()
  {
    return new Vector2(this.x, this.y)
  }

  get x ()
  {
    return this._x
  }

  set x (value)
  {
    this._x = value
  }

  get y ()
  {
    return this._y
  }

  set y (value)
  {
    this._y = value
  }

  toString ()
  {
    return '(' + this.x + ',' + this.y + ')'
  }
}