import LinkList        from '../DataStructure/LinkList.js'
import PhysicException from './PhysicException.js'
import Vector2         from '../Math/Vector2.js'
import Behavior        from '../BaseComponent/Behavior.js'
import BaseException   from '../Base/BaseException.js'

export default class Collider extends Behavior
{

  constructor0 ()
  {
    super.constructor0()
    this._newColliderList = new LinkList()
    this._oldColliderList = new LinkList()
    this._outColliderList = new LinkList()
    this._missColliderList = new LinkList()
    this._targetLayersMask = 1
  }

  get targetLayersMask ()
  {
    return this._targetLayersMask
  }

  set targetLayerMask (value)
  {
    this._targetLayersMask = value
  }

  get targetLayers ()
  {
    let layers = []
    let mask = this._targetLayersMask
    for (let i = 0; i < 64; i++)
    {
      if (mask === 0)
      {
        return layers
      } else
      {
        (mask = mask >> 1)
        ((mask | 1) === 1) ? layers.push(i + 1) : null
      }
    }
    return layers
  }

  set targetLayers (value)
  {
    this._targetLayersMask = 0
    value.forEach
    (
      (layer) =>
      {
        if (layer > 0)
        {
          this._targetLayersMask |= (1 << (layer - 1))
        } else
        {
          throw BaseException('layer must >1')
        }
      }
    )
  }

  /**
   *
   * @param {Vector2} vector2
   * @Return {boolean}
   */
  hitWorld (vector2)
  {
    let localVector2 = this.transform.getWorldToLocalMatrix().multVectorL(vector2)
    this.hitLocal(localVector2)
  }

  /**
   * STA
   *
   * @param {Vector2} vector2
   * @Return {boolean}
   *
   */
  hitLocal (vector2)
  {
    return this._judgeContain(this.getVertexList(), this._isVectexContainFunc(vector2))
  }

  /**
   *
   *
   *
   * @param {Collider} collider
   * @Return {boolean}
   */
  intersect (collider)
  {
    let objVertexList = this.getVertexList()
    let worldToObjMat = this.transform.getWorldToLocalMatrix()
    let subToWorldMat = collider.transform.getLocalToWorldMatrix()
    let subToObjMat = subToWorldMat.multMatrixL(worldToObjMat)
    let subjVertexList = collider.getVertexList().map
    (
      (vertex) =>
      {
        return subToObjMat.multVectorL(vertex)
      }
    )

    return this._judgeContain(objVertexList, this._isVertexListContainFunc(subjVertexList))
      && collider._judgeContain(subjVertexList, collider._isVertexListContainFunc(objVertexList))
  }

  /**
   * STA
   *
   * @param {outwardNormal->origin->boolean} isContainFunc
   * @return {boolean}
   * @private
   */
  _judgeContain (objVertexList, isContainFunc)
  {
    let vertexList = objVertexList

    let first = true
    let oldVertex = null
    let isHit = true

    vertexList.choose(
      (newVertex) =>
      {
        if (first)
        {
          oldVertex = newVertex
          first = false
          return false
        } else
        {
          let outwardNormal = new Vector2(newVertex.y - oldVertex.y, oldVertex.x - newVertex.x)
          isHit = isContainFunc(outwardNormal, oldVertex)
          oldVertex = newVertex
          return !isHit
        }
      }
    )

    if (isHit)
    {
      let headVertex = vertexList.getHead()
      let endVertex = vertexList.getTail()
      let outwardNormal = new Vector2(headVertex.y - endVertex.y, endVertex.x - headVertex.x)
      isHit = isContainFunc(outwardNormal, endVertex)
    } else
    {
      //pass
    }

    return isHit
  }

  _isVectexContainFunc (vertex)
  {

    return (outwardNormal, origin) =>
    {
      let hitVector = new Vector2(vertex.x - origin.x, vertex.y - origin.y)

      let hitProjection = hitVector.dot(outwardNormal)

      return hitProjection < 0
    }
  }

  _isVertexListContainFunc (vertexList)
  {

    return (outwardNormal, origin) =>
    {
      let left = 1

      vertexList.forEach
      (
        (selfVertex) =>
        {
          let selfVector = new Vector2(selfVertex.x - origin.x, selfVertex.y - origin.y)
          let dot = selfVector.dot(outwardNormal)
          left = dot < left ? dot : left
        }
      )
      return left < 0
    }
  }

  /**
   *vertex should be sort by right-hand rule
   *
   *
   *           0---------------x
   *           |
   *           |
   *           |
   *           |
   *           |
   *           y
   *
   *   so we can calculate outward normal vector
   */
  getVertexList ()
  {
    throw new PhysicException('getVertexList not impl')
  }

  preUpdate ()
  {
    this._outColliderList.clear()
    this._missColliderList.clear()
    this._missColliderList.pushTailList(this._oldColliderList)
    this._missColliderList.pushTailList(this._newColliderList)
    this._oldColliderList.clear()
    this._newColliderList.clear()
  }

  lateUpdate ()
  {

  }

  colliderIn (collider)
  {
    if (!this._missColliderList.isElementIn(collider))
    {
      this._newColliderList.pushTail(collider)
    } else
    {
      this._oldColliderList.pushTail(collider)
      this._missColliderList.deleteElement(collider)
    }
  }

  colliderOut (collider)
  {
    if (this._missColliderList.isElementIn(collider))
    {
      this._outColliderList.pushTail(collider)
      this._missColliderList.deleteElement(collider)
    } else
    {
      //pass
    }
  }

  isCollide ()
  {
    return !this.newColliderList.isEmpty()
      && !this.oldColliderList.isEmpty()
  }

  get newColliderList ()
  {
    return this._newColliderList
  }

  set newColliderList (value)
  {
    this._newColliderList = value
  }

  get oldColliderList ()
  {
    return this._oldColliderList
  }

  set oldColliderList (value)
  {
    this._oldColliderList = value
  }

  get outColliderList ()
  {
    return this._outColliderList
  }

  set outColliderList (value)
  {
    this._outColliderList = value
  }

  get missColliderList ()
  {
    return this._missColliderList
  }

  set missColliderList (value)
  {
    this._missColliderList = value
  }
}




