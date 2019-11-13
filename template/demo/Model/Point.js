export default class Point
{

  constructor (id, name, x, y)
  {
    this._id = id
    this._name = name
    this._x = x
    this._y = y
  }

  get id ()
  {
    return this._id
  }

  set id (value)
  {
    this._id = value
  }

  get name ()
  {
    return this._name
  }

  set name (value)
  {
    this._name = value
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
}