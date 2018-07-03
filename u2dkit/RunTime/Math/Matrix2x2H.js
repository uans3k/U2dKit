import Vector2       from './Vector2.js'
import MathException from './MathException.js'

/**
 * U2dKit default use multipart LeftToRight-rule and right-hand-rule
 */
export default class Matrix2x2H
{
  constructor (m11, m12, m21, m22, dx, dy)
  {
    this._m11 = m11
    this._m12 = m12
    this._m21 = m21
    this._m22 = m22
    this._dx = dx
    this._dy = dy
  }

  det ()
  {
    return this.m11 * this.m22 - this.m12 * this.m21
  }

  inverseL ()
  {
    let det = this.det()
    if (det != 0)
    {
      let divDet = 1 / det

      let m11, m12, m21, m22, dx, dy

      m11 = divDet * (this.m22)
      m12 = divDet * (-this.m12)
      m21 = divDet * (-this.m21)
      m22 = divDet * (this.m11)
      dx = divDet * (this.m21 * this.dy - this.m22 * this.dx)
      dy = divDet * (this.m12 * this.dx - this.m11 * this.dy)

      return new Matrix2x2H(m11, m12, m21, m22, dx, dy)
    } else
    {
      throw new MathException('can not inverse')
    }
  }

  inverseR ()
  {

  }

  multVectorL (vector2)
  {
    let x = vector2.x * this.m11 + vector2.y * this.m21 + this.dx
    let y = vector2.x * this.m12 + vector2.y * this.m22 + this.dy
    return new Vector2(x, y)
  }

  multVectorR (vector2)
  {
    let x = vector2.x * this.m11 + vector2.y * this.m12 + this.dx
    let y = vector2.x * this.m21 + vector2.y * this.m22 + this.dy
    return new Vector2(x, y)
  }

  multMatrixL (matrix2x2H)
  {
    let m11, m12, m21, m22, dx, dy
    m11 = this.m11 * matrix2x2H.m11 + this.m12 * matrix2x2H.m21
    m12 = this.m11 * matrix2x2H.m12 + this.m12 * matrix2x2H.m22
    m21 = this.m21 * matrix2x2H.m11 + this.m22 * matrix2x2H.m21
    m22 = this.m21 * matrix2x2H.m12 + this.m22 * matrix2x2H.m22
    dx = this.dx * matrix2x2H.m11 + this.dy * matrix2x2H.m21 + matrix2x2H.dx
    dy = this.dx * matrix2x2H.m12 + this.dy * matrix2x2H.m22 + matrix2x2H.dy
    return new Matrix2x2H(m11, m12, m21, m22, dx, dy)
  }

  multMatrixR (matrix2x2H)
  {
    let m11, m12, m21, m22, dx, dy
    m11 = this.m11 * matrix2x2H.m11 + this.m12 * matrix2x2H.m21
    m12 = this.m11 * matrix2x2H.m12 + this.m12 * matrix2x2H.m22
    m21 = this.m21 * matrix2x2H.m11 + this.m22 * matrix2x2H.m21
    m22 = this.m21 * matrix2x2H.m12 + this.m22 * matrix2x2H.m22
    dx = this.m11 * matrix2x2H.dx + this.m12 * matrix2x2H.dy + matrix2x2H.dx
    dy = this.m21 * matrix2x2H.dx + this.m22 * matrix2x2H.dy + matrix2x2H.dy
    return new Matrix2x2H(m11, m12, m21, m22, dx, dy)
  }

  static rotateL (angle)
  {
    let arc = angle * Math.PI / 180
    return this.rotateArcL(arc)
  }

  static rotateArcL (arc)
  {
    return new Matrix2x2H(Math.cos(arc), -Math.sin(arc), Math.sin(arc), Math.cos(arc), 0, 0)
  }

  static rotateR (angle)
  {
    let arc = angle * Math.PI / 180
    return this.rotateArcR(arc)
  }

  static rotateArcR (arc)
  {
    return new Matrix2x2H(Math.cos(arc), Math.sin(arc), -Math.sin(arc), Math.cos(arc), 0, 0)
  }

  static translate (dx, dy)
  {
    return new Matrix2x2H(1.0, 0.0, 0.0, 1.0, dx, dy)
  }

  static scale (sx, sy)
  {
    return new Matrix2x2H(sx, 0.0, 0.0, sy, 0.0, 0.0)
  }

  static identy ()
  {
    return new Matrix2x2H(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
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

  get dx ()
  {
    return this._dx
  }

  set dx (value)
  {
    this._dx = value
  }

  get dy ()
  {
    return this._dy
  }

  set dy (value)
  {
    this._dy = value
  }

  getCopy ()
  {
    return new Matrix2x2H(this.m11, this.m12, this.m21, this.m22, this.dx, this.dy)
  }

  toString ()
  {
    return this.m11 + ',' + this.m12 + '\n' + this.m21 + ',' + this.m22 + '\n' + this.dx + ',' + this.dy
  }
}