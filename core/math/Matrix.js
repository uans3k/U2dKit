import MathException from './MathException.js'

/**
 *
 */
export default class Matrix
{
  /**
   * @param {Array} array
   * */
  constructor (array)
  {
    this._data = null
    this._row = 0
    this._col = 0

    this._data = array
    this._row = array.length
    if (this._row > 0)
    {
      if (array[0] instanceof Array)
      {
        this._col = array[0].length
      } else
      {
        this._col = 0
      }
    } else
    {
      this._col = 0
    }
  }

  /**
   * @param {Matrix} matrix
   * */
  add (matrix)
  {
    // if
    // (
    //   this._row == matrix.getRow()
    //   && this._col == matrix.getCol()
    // )
    // {
    //
    //   for (var i = 0; i < this._row; i++)
    //   {
    //     for (var j = 0; j < this._col; j++)
    //     {
    //       this._data[i][j]
    //     }
    //   }
    // }
  }

  mult (matrix)
  {
  }

  /**
   * @Param {Vector} vector
   * */
  multVector (vector)
  {
    if (vector.getDimension() == this._col)
    {
      var newVector = Vector.empty()
      for (var i = 0; i < this._col; i++)
      {
        for (var j = 0; j < this._col; j++)
        {
          newVector[i] += this._data[i][j] * (vector.getData())[j]
        }
      }
      return newVector
    }
    else
    {
      throw  MathException('vector dimension can not match matrix')
    }
  }

  /**
   *
   * @returns {Array}
   */
  getData ()
  {
    return this._data
  }

  getRow ()
  {
    return this._row
  }

  getCol ()
  {
    return this._col
  }

}