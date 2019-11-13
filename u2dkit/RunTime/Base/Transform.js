import Component  from './Component.js'
import LinkList   from '../DataStructure/LinkList.js'
import Rotator    from '../Math/Rotator.js'
import Vector2    from '../Math/Vector2.js'
import Matrix2x2H from '../Math/Matrix2x2H.js'
import Matrix2x2  from '../Math/Matrix2x2.js'

/**
 *
 */

export default class Transform extends Component
{

  constructor0 ()
  {
    super.constructor0()

    this._childList = new LinkList()
    this._parent = null
    this._z = 0
    this._rotator = new Rotator(0)
    this._position = new Vector2(0, 0)
    this._scale = new Vector2(1, 1)
    this._cacheMatrix = null
    this._hasChange = true // set init change true so that wo should reCalculate cacheMatrix
    // this._dirty =false
  }

  set hasChange (value)
  {
    this._hasChange = value
  }

  get hasChange ()
  {
    return this._hasChange
  }

  // setDirty(){
  //
  // }

  getWorldPosition ()
    {
      var worldPosition = this.position.getCopy()
      var pos = this.parent
      while (pos != null)
      {
        worldPosition = worldPosition.mult(pos.scale)
        worldPosition = pos.rotator.multVectorL(worldPosition)
        worldPosition = worldPosition.add(pos.position)
        pos = pos.parent
      }
      return worldPosition
    }

    getWorldRotator ()
    {

      let worldRotator = this.rotator.getCopy()
      let pos = this.parent
      while (pos != null)
      {
        worldRotator = worldRotator.multRotator(pos.rotator)
        pos = pos.parent
      }
    return worldRotator
  }

  getWorldScaleRotatorMatrix2x2 ()
  {
    let sMatrix2x2 = Matrix2x2.scale(this.scale.x, this.scale.y)
    let rMatrix2x2 = this.rotator.getMatrix2x2L()
    let parent = this.parent
    if (parent != null)
    {
      return sMatrix2x2.multMatrixL(rMatrix2x2).multMatrixL(parent.getWorldScaleRotatorMatrix2x2())
    } else
    {
      return sMatrix2x2.multMatrixL(rMatrix2x2)
    }
  }

  setWorldPostion (position)
  {
    if (this.parent != null)
    {
      let invScaleRotMatrix2x2 = this.parent.getWorldScaleRotatorMatrix2x2().inverse()
      let invPosition = this.parent.getWorldPosition().reverse()
      let newPosition = position.add(invPosition)
      newPosition = invScaleRotMatrix2x2.multVectorL(newPosition)
      this.position = newPosition
    } else
    {
      this.position = position
    }
  }

  setWorldRotator (rotator)
  {
    if (this.parent != null)
    {
      this.rotator = rotator.multRotator(this.parent.getWorldRotator().inverse())
    } else
    {
      this.rotator = rotator
    }
  }

  setWorldScaleRoatorAndRotator (scaleRotatorMatrix, rotator)
  {
    this.setWorldRotator(rotator)

    // let invParentScaleRotMatrix = this.parent != null ? this.parent.getWorldScaleRotatorMatrix2x2().inverse() : Matrix2x2.identy()
    // let invRotMatrix = this.getWorldRotator().inverse().getMatrix2x2L()
    // let scaleMatrix = scaleRotatorMatrix.multMatrixL(invParentScaleRotMatrix)
    // scaleMatrix = scaleMatrix.multMatrixL(invRotMatrix)
    // this.scale = new Vector2(scaleMatrix.m11, scaleMatrix.m22)
    let oldScaleMatrix = Matrix2x2.scale(this.scale.x, this.scale.y)
    let invScaleRotate = this.getWorldScaleRotatorMatrix2x2().inverse()
    let scaleMatrix = scaleRotatorMatrix.multMatrixL(invScaleRotate).multMatrixL(oldScaleMatrix)
    this.scale = new Vector2(scaleMatrix.m11, scaleMatrix.m22)
    // alert('newScale:' + this.scale)
  }

  setWorldScaleRotaorMatrixRotatorPosition (scaleRotatorMatrix, rotator, position)
  {
    this.setWorldPostion(position)
    this.setWorldScaleRoatorAndRotator(scaleRotatorMatrix, rotator)
  }

  attachParent (transParent, isKeepWorldCoord = false)
  {
    var oldParent = this.parent
    if (isKeepWorldCoord)
    {
      let worldPosition = this.getWorldPosition()
      let worldRotator = this.getWorldRotator()
      let worldScaleRotatorMatrix = this.getWorldScaleRotatorMatrix2x2()

      this.parent = transParent

      this.setWorldScaleRotaorMatrixRotatorPosition(worldScaleRotatorMatrix, worldRotator, worldPosition)

      if (this.parent != null)
      {
        this.parent.addChild(this)
      }
    } else
    {
      this.parent = transParent
      this.parent.addChild(this)
    }

    if (oldParent != null)
    {
      oldParent.removeChild(this)
    }

    this.hasChange = true
  }

  getWorldToLocalMatrix ()
  {
    return this.getLocalToWorldMatrix().inverseL()
  }

  /**
   *
   * @return {Matrix2x2H}
   */
  getLocalToWorldMatrix ()
  {

    if
    (
      (this.parent == null && !this.hasChange)
      ||
      (this.parent != null && !this.hasChange && this.parent.hasChange)
    )
    {
      return this._cacheMatrix
    } else
    {

      var mat = this.getLocalToParentMatrix()
      mat = this.parent === null ? mat : mat.multMatrixL(this.parent.getLocalToWorldMatrix())
      this._cacheMatrix = mat
      this._hasChange = false
      return mat
    }
  }

  /**
   *
   * @return {Matrix2x2H}
   */
  getLocalToParentMatrix ()
  {
    var sMatrix = Matrix2x2H.scale(this.scale.x, this.scale.y)
    var rMatrix = this.rotator.getMatrix2x2HL()
    var tMatrix = Matrix2x2H.translate(this.position.x, this.position.y)
    return sMatrix.multMatrixL(rMatrix).multMatrixL(tMatrix)
  }

  getParentToLocalMatrix ()
  {
    return this.getLocalToParentMatrix().inverseL()
  }

  translate (x, y)
  {
    this.position.addSelf(new Vector2(x, y))
    this.hasChange = true
  }

  rotate (angle)
  {
    this.rotator.rotate(angle)
    this.hasChange = true
  }

  addScale (sx, sy)
  {
    this.scale.addSelf(new Vector2(sx, sy))
    this.hasChange = true
  }

  multScale (sx, sy)
  {
    this.scale.multSelf(new Vector2(sx, sy))
    this.hasChange = true
  }

  addChild (transform)
  {
    this._childList.pushTail(transform)
  }

  addChildIndex (transform, index)
  {
    this._childList.insert(index, transform)
  }

  /**
   * should'nt be invoked by User
   * @param transform
   */
  removeChild (transform)
  {
    this._childList.deleteElement(transform)
  }

  /**
   * should'nt be invoked by User
   * @param index
   */
  removeChildIndex (index)
  {
    this._childList.delete(index)
  }

  clearChild ()
  {
    this._childList.clear()
  }

  get z ()
  {
    return this._z
  }

  set z (z)
  {
    this._z = z
  }

  get childList ()
  {
    return this._childList
  }

  set childList (value)
  {
    this._childList = value
  }

  get parent ()
  {
    return this._parent

  }

  set parent (value)
  {
    this._parent = value
  }

  get rotator ()
  {
    return this._rotator
  }

  set rotator (value)
  {
    this._rotator = value
    this.hasChange = true
  }

  get position ()
  {
    return this._position
  }

  set position (value)
  {
    this._position = value
    this.hasChange = true
  }

  get scale ()
  {
    return this._scale
  }

  set scale (value)
  {
    this._scale = value
    this.hasChange = true
  }

  getChildrenIterator ()
  {
    return this.childList.iterator()
  }
}


