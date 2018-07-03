import Vector2       from './Vector2.js'
import MathException from './MathException.js'

/**
 * U2dKit default use multipart LeftToRight-rule and right-hand-rule
 */
export default class Matrix2x2
{
  constructor (m11, m12, m21, m22)
  {
    this._m11 = m11
    this._m12 = m12
    this._m21 = m21
    this._m22 = m22
  }

  det ()
  {
    return this.m11 * this.m22 - this.m12 * this.m21
  }

  inverse ()
  {
    let det = this.det()
    if (det != 0)
    {
      let divDet = 1 / det

      let m11, m12, m21, m22

      m11 = divDet * (this.m22)
      m12 = divDet * (-this.m12)
      m21 = divDet * (-this.m21)
      m22 = divDet * (this.m11)

      return new Matrix2x2(m11, m12, m21, m22)
    } else
    {
      throw new MathException('can not inverse')
    }
  }

  multVectorL (vector2)
  {
    let x = vector2.x * this.m11 + vector2.y * this.m21
    let y = vector2.x * this.m12 + vector2.y * this.m22
    return new Vector2(x, y)
  }

  multVectorR (vector2)
  {
    let x = vector2.x * this.m11 + vector2.y * this.m12
    let y = vector2.x * this.m21 + vector2.y * this.m22
    return new Vector2(x, y)
  }

  multMatrixL (matrix2x2)
  {
    let m11, m12, m21, m22

    m11 = this.m11 * matrix2x2.m11 + this.m12 * matrix2x2.m21
    m12 = this.m11 * matrix2x2.m12 + this.m12 * matrix2x2.m22
    m21 = this.m21 * matrix2x2.m11 + this.m22 * matrix2x2.m21
    m22 = this.m21 * matrix2x2.m12 + this.m22 * matrix2x2.m22

    return new Matrix2x2(m11, m12, m21, m22)
  }

  multMatrixR (matrix2x2)
  {
    let m11, m12, m21, m22, dx, dy
    m11 = this.m11 * matrix2x2.m11 + this.m12 * matrix2x2.m21
    m12 = this.m11 * matrix2x2.m12 + this.m12 * matrix2x2.m22
    m21 = this.m21 * matrix2x2.m11 + this.m22 * matrix2x2.m21
    m22 = this.m21 * matrix2x2.m12 + this.m22 * matrix2x2.m22

    return new Matrix2x2(m11, m12, m21, m22)
  }

  static rotateL (angle)
  {
    let arc = angle * Math.PI / 180
    return this.rotateArcL(arc)
  }

  static rotateArcL (arc)
  {
    return new Matrix2x2(Math.cos(arc), -Math.sin(arc), Math.sin(arc), Math.cos(arc))
  }

  static rotateR (angle)
  {
    let arc = angle * Math.PI / 180
    return this.rotateArcR(arc)
  }

  static rotateArcR (arc)
  {
    return new Matrix2x2(Math.cos(arc), Math.sin(arc), -Math.sin(arc), Math.cos(arc))
  }

  static scale (sx, sy)
  {
    return new Matrix2x2(sx, 0.0, 0.0, sy)
  }

  static identy ()
  {
    return new Matrix2x2(1, 0, 0, 1)
  }

  get m11 ()
  {
    return this._m11
  }

  set m11 (value)
  {
    this._m11 = value
  }

  get m12 ()
  {
    return this._m12
  }

  set m12 (value)
  {
    this._m12 = value
  }

  get m21 ()
  {
    return this._m21
  }

  set m21 (value)
  {
    this._m21 = value
  }

  get m22 ()
  {
    return this._m22
  }

  set m22 (value)
  {
    this._m22 = value
  }

  getCopy ()
  {
    return new Matrix2x2(this.m11, this.m12, this.m21, this.m22)
  }

  toString ()
  {
    return this.m11 + ',' + this.m12 + '\n' + this.m21 + ',' + this.m22 + '\n'
  }
}