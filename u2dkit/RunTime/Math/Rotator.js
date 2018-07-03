import Matrix2x2H from './Matrix2x2H.js'
import Matrix2x2  from './Matrix2x2.js'
import Vector2    from './Vector2.js'

export default class Rotator
{

  constructor (arc)
  {
    this._arc = arc
  }

  rotate (angle)
  {
    return this.rotateArc(angle * Math.PI / 180)
  }

  getCopy ()
  {
    return new Rotator(this.arc)
  }

  rotateArc (acr)
  {
    this.arc += arc
  }

  setRotate (angle)
  {
    return this.setRotateArc(angle * Math.PI / 180)
  }

  setRotateArc (arc)
  {
    this._arc = arc
  }

  inverse ()
  {
    return new Rotator(-this.arc)
  }

  reverse ()
  {
    return new Rotator(-this.arc)
  }

  reverseSelf ()
  {
    this.arc = this._arc
  }

  multVectorL (vector2)
  {
    var costh = Math.cos(this.arc)
    var sinth = Math.sin(this.arc)

    var x = vector2.x * costh + vector2.y * sinth
    var y = vector2.x * (-sinth) + vector2.y * costh
    return new Vector2(x, y)
  }

  multRotator (rotater)
  {
    return new Rotator(this.arc + rotater.arc)
  }

  getMatrix2x2L ()
  {
    let costh = Math.cos(this.arc)
    let sinth = Math.sin(this.arc)
    return new Matrix2x2(costh, -sinth, sinth, costh)
  }

  getMatrix2x2R ()
  {
    let costh = Math.cos(this.arc)
    let sinth = Math.sin(this.arc)
    return new Matrix2x2H(costh, sinth, -sinth, costh, 0, 0)
  }

  getMatrix2x2HL ()
  {
    let costh = Math.cos(this.arc)
    let sinth = Math.sin(this.arc)
    return new Matrix2x2H(costh, -sinth, sinth, costh, 0, 0)
  }

  getMatrix2x2HR ()
  {
    let costh = Math.cos(this.arc)
    let sinth = Math.sin(this.arc)
    return new Matrix2x2H(costh, sinth, -sinth, costh, 0, 0)
  }

  static angle (angle)
  {
    return new Rotator(angle * Math.PI / 180)
  }

  get arc ()
  {
    return this._arc
  }

  set arc (value)
  {
    this._arc = value
  }

  toString ()
  {
    return 180 * (this.arc / Math.PI)
  }
}
