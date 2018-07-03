import MathException from './MathException.js'
import VectorH3      from './VectorH3.js'

export default class MatrixH3x3
{

  /**
   * @param {Array} array
   * */
  constructor (array)
  {

    if (array.length == 3)
    {
      if (array[0] instanceof Array && array[0].length == 3)
      {
        this._data = array
      } else
      {
        throw  new MathException('matrix must be 3*3')
      }
    } else
    {
      throw  new MathException('matrix must be 3*3')
    }
  }

  /**
   * @param {Matrix3*3} matrix
   * */
  add (matrix)
  {

    var newArray = MatrixH3x3._getEmptyArray()
    for (var i = 0; i < 2; i++)
    {
      for (var j = 0; j < 2; j++)
      {
        newArray[i][j] = this._data[i][j] + (matrix.getData())[i][j]
      }
    }
    return new MatrixH3x3(newArray)

  }

  /**
   * @param {Matrix3*3} matrix
   * */
  mult (matrix)
  {

    var newArray = MatrixH3x3._getEmptyArray()
    for (var i = 0; i < 3; i++)
    {
      for (var j = 0; j < 3; j++)
      {
        for (var k = 0; k < 3; k++)
        {
          newArray[i][j] += this._data[i][k] * (matrix.getData())[k][j]
        }
      }
    }
    return new MatrixH3x3(newArray)
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
      var array = MatrixH3x3._getEmptyArray()

      array[0][0] = divDet * this.getData()[1][1]
      array[0][1] = divDet * (-this.getData()[0][1])

      array[1][0] = divDet * (-this.getData()[1][0])
      array[1][1] = divDet * this.getData()[0][0]

      array[0][2] = -this.getData()[0][2]
      array[0][2] = -this.getData()[0][2]

      return new MatrixH3x3(array)
    } else
    {
      throw new MathException('can not inverse')
    }
  }

  multVector (vectorH3)
  {

    var newVector = Array(3)
    for (var i = 0; i < 3; i++)
    {
      for (var j = 0; j < 3; j++)
      {
        newVector[i] += this._data[i][j] * vectorH3.getValue(j)
      }
    }
    return new VectorH3(newVector)
  }

  getValue (i, j)
  {
    return this._data[i][j]
  }

  setValue (i, j, value)
  {
    this._data[i][j] = value
  }

  getData ()
  {
    return this._data
  }

  static _getEmptyArray ()
  {
    return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  }

  static _getIdentyArray ()
  {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
  }

  static _getScaleArray (scaleX, scaleY)
  {
    return [[scaleX, 0, 0], [0, scaleY, 0], [0, 0, 1]]
  }

  static _getTransArray (transX, transY)
  {
    return [[1, 0, transX], [0, 1, transY], [0, 0, 1]]
  }

  static empty ()
  {
    return new MatrixH3x3(MatrixH3x3._getEmptyArray())
  }

  static identy ()
  {
    return new MatrixH3x3(MatrixH3x3._getIdentyArray())
  }

  static scale (scaleX, scaleY)
  {
    return new MatrixH3x3(MatrixH3x3._getScaleArray(scaleX, scaleY))
  }

  static rotationArc (arc)
  {
    var cos = Math.cos(arc)
    var sin = Math.sin(arc)

    var array = [[cos, sin, 0], [-sin, cos, 0], [0, 0, 1]]
    return new MatrixH3x3(array)
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
    var trans1 = this.translate(-centerX, -centerY)
    var rotation = this.rotation(arc)
    var trans2 = this.translate(centerX, centerY)
    return trans2.mult(rotation).mult(trans1)
  }

  /**
   *
   * @param {Number} centerX
   * @param {Number} centerY
   * @param {Number} angle
   *@return {MatrixH3x3 }
   */
  static rotationCenter (centerX, centerY, angle)
  {
    var arc = angle * Math.PI / 180
    return this.rotationCenterArc(centerX, centerY, arc)
  }

  static translate (transX, transY)
  {
    return new MatrixH3x3(this._getTransArray(transX, transY))
  }
}