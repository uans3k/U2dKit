class Vector
{

  constructor (array)
  {
    this._data = null
    this._dimension = 0

    if (array instanceof Array)
    {
      this._data = array
      this._dimension = array.length
    }
    else
    {
      throw  new MathException('vector must be filled by Number')
    }
  }

  dot (vector)
  {
    if (this._dimension == vector.getDimension())
    {
      var sum = 0
      for (var i = 0; i < this._dimension; i++)
      {
        sum = sum + this._data[i] * (vector.getData())[i]
      }
      return sum
    }
    else
    {
      throw  new MathException('vector dimension match error')
    }
  }

  reverse ()
  {
    for (var i = 0; i < this._dimension; i++)
    {
      this._data[i] = -this._data[i]
    }
  }

  getDimension ()
  {
    return this._dimension
  }

  static empty ()
  {
    return new Vector(this._getEmptyArray())
  }

  _getEmptyArray ()
  {
    var array = new Array(this._dimension)
    for (var i = 0; i < this._dimension; i++)
    {
      array[i] = 0
    }
    return array
  }

  /**
   *
   * @param axis
   * @return {Number}
   */
  getValue (axis)
  {
    if (axis < this._data.getDimension())
    {
      return this._data[axis]
    } else
    {
      throw new MathException('out of bound')
    }
  }

  setValue (axis, value)
  {
    if (axis < this._data.getDimension())
    {
      this._data[axis] = value
    } else
    {
      throw new MathException('out of bound')
    }
  }
}