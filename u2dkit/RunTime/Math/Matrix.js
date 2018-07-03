import MathException from './MathException.js'
import MatrixH3x3    from './MatrixH3x3.js'

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

    if (this.getCol() == matrix.getRow())
    {
      var newArray = MatrixH3x3._getEmptyArray()
      for (var i = 0; i < this._row; i++)
      {
        for (var j = 0; j < this._col - 1; j++)
        {
          for (var k = 0; k < this._col - 1; k++)
          {
            newArray[i][j] = this._data[i][k] * (matrix.getData())[k][j]
          }
        }
      }

      newArray[0][this._col] = this._data[0][0] + matrix.getData()[0][0]
      return newArray
    }
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
      return
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