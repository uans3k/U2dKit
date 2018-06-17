import Matrix        from './Matrix.js'
import MathException from './MathException.js'

export default class Matrix2x3 extends Matrix
{

  /**
   * @param {Array} array
   * */
  constructor (array)
  {

    if (array.length == 2)
    {
      if (array[0] instanceof Array && array[0].length == 3)
      {
        super(array)
      } else
      {
        throw  MathException('matrix must be 2*3')
      }
    } else
    {
      throw  MathException('matrix must be 2*3')
    }
  }

  /**
   * @param {Matrix2*3} matrix
   * */
  add (matrix)
  {
    if
    (
      this._row == matrix.getRow()
      && this._col == matrix.getCol()
    )
    {
      var newArray = this._getEmptyArray()
      for (var i = 0; i < this._row; i++)
      {
        for (var j = 0; j < this._col; j++)
        {
          newArray[i][j] = this._data[i][j] + (matrix.getData())[i][j]
        }
      }
      return new Matrix2x3(newArray)
    } else
    {
      throw MathException('matrix must be 2*3')
    }
  }

  /**
   * @param {Matrix2*3} matrix
   * */
  mult (matrix)
  {
    if (matrix instanceof Matrix2x3)
    {
      var newArray = Matrix2x3._getEmptyArray()
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
      return newArray
    } else
    {
      throw MathException('matrix must be 2*3')
    }
  }

  det ()
  {
    return this.getData()[0][0] * this.getData()[1][1] - this.getData()[0][1] * this.getData()[1][0]
  }

  inverse ()
  {
    var det = this.det()
    debugger
    if (det != 0)
    {
      var divDet = 1 / det
      var array = Matrix2x3._getEmptyArray()

      array[0][0] = divDet * this.getData()[1][1]
      array[0][1] = divDet * (-this.getData()[0][1])

      array[1][0] = divDet * (-this.getData()[1][0])
      array[1][1] = divDet * this.getData()[0][0]

      array[0][2] = -this.getData()[0][2]
      array[0][2] = -this.getData()[0][2]

      return new Matrix2x3(array)
    } else
    {
      throw new MathException('can not inverse')
    }

  }

  /**
   *
   * @returns {Matrix}
   */
  getData ()
  {
    return this._data
  }

  /**
   *
   * @return {Number}
   * */
  getRow ()
  {
    return this._row
  }

  /**
   *
   * @return {Number}
   * */
  getCol ()
  {
    return this._col
  }

  static _getEmptyArray ()
  {
    return [[0, 0, 0], [0, 0, 0]]
  }

  static _getIdentyArray ()
  {
    return [[1, 0, 0], [0, 1, 0]]
  }

  static _getScaleArray (scaleX, scaleY)
  {
    return [[scaleX, 0, 0], [0, scaleY, 0]]
  }

  static _getTransArray (transX, transY)
  {
    return [[0, 0, transX], [0, 0, transY]]
  }

  static empty ()
  {
    return new Matrix2x3(this._getEmptyArray())
  }

  static identy ()
  {
    return new Matrix2x3(this._getIdentyArray())
  }

  static scale (scaleX, scaleY)
  {
    return new Matrix2x3(this._getScaleArray())
  }

  static rotationArc (arc)
  {
    var cos = Math.cos(arc)
    var sin = Math.sin(arc)

    var array = [[cos, sin, 0], [-sin, cos, 0]]
    return new Matrix2x3(array)
  }

  /**
   *
   * @param {Number} angle
   */
  static rotation (angle)
  {
    var arc = angle * Math.PI / 180
    return this.rotationArc(arc)
  }

  static rotationCenterArc (centerX, centerY, arc)
  {
    var trans1 = this.transcation(-centerX, -centerY)
    var rotation = this.rotation(arc)
    var trans2 = this.transcation(centerX, centerY)
    return trans2.mult(rotation).mult(trans1)
  }

  /**
   *
   * @param {Number} centerX
   * @param {Number} centerY
   * @param {Number} angle
   *@return {Matrix2x3 }
   */
  static rotationCenter (centerX, centerY, angle)
  {
    var arc = angle * Math.PI / 180
    return this.rotationCenterArc(centerX, centerY, arc)
  }

  static transcation (transX, transY)
  {
    return new Matrix2x3(this._getTransArray(transX, transY))
  }
}