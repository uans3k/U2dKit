import MathException from './MathException.js'

export default class VectorH3
{
  constructor (array)
  {
    if (array instanceof Array && array.length == 3)
    {
      this._data = array
    }
    else
    {
      throw  new MathException('vector must be filled by Number')
    }
  }

  dot (vectorH3)
  {

    var sum = 0
    for (var i = 0; i < 2; i++)
    {
      sum = sum + this._data[i] * vectorH3.getValue(i)
    }
    return sum

  }

  add (vectorH3)
  {
    var array = new Array(3)
    for (var i = 0; i < 3; i++)
    {
      array = this._data[i] + vectorH3.getValue(i)
    }
    return new VectorH3(array)
  }

  getValue (axis)
  {
    return this._data[axis]
  }
}