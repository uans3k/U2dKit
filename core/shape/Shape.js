/**
 * @property {Array} _vectorArray
 * */
class Shape
{
  _vectorArray = null

  constructor (vectorArray)
  {
    this._vectorArray = vectorArray
  }

  getVectorArray ()
  {
    return this._vectorArray
  }

  transfrom (matrix)
  {
    this._vectorArray = this._vectorArray.map
    (
      function (vector)
      {
        return matrix.multVector(vector)
      }
    )
  }

}