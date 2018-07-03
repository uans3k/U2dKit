import UObject       from './UObject.js'
import Transform     from './Transform.js'
import LinkList      from '../DataStructure/LinkList.js'
import BaseException from './BaseException.js'

/**
 * @property {String} name
 * @property {String} tag
 * @property {String} layer
 * @property {LinkList} BaseComponent
 * @property {bool} isActive
 */
export default class GameObject extends UObject
{

  constructor0 ()
  {
    this._name = 'default'
    this._tag = 'default'
    this._layerMask = 1
    this._componentList = new LinkList()
    this._isActive = true
    this._transform = new Transform()
    this._transform.gameObject = this
  }

  addComponent (component)
  {
    component.gameObject = this
    this._componentList.pushTail(component)
    if (this.isActive)
    {
      component.awake()

    } else
    {
      //pass
    }
  }

  removeComponent (component)
  {
    this._componentList.deleteElement(component)
  }

  /**
   *
   * @param {Transform->*}func
   * @return {*}
   * @private
   */
  _findInChildren (func)
  {
    let queue = new LinkList()
    this._transform.childList.forEach
    (
      (child) =>
      {
        queue.pushTail(child)
      }
    )

    let trans = null
    let target = null
    while (!queue.isEmpty())
    {
      trans = queue.popHead()
      target = null
      target = func(trans)
      if (target == null)
      {
        queue.pushTailList(trans.childList)
      } else
      {
        return target
      }

    }
    return null
  }

  /**
   *
   * @param {Transform->LinkList<*>}func
   * @return {LinkList<*>}
   * @private
   */
  _findListInChildren (func)
  {
    let queue = new LinkList()

    this._transform.childList.forEach
    (
      (child) =>
      {
        queue.pushTail(child)
      }
    )

    let retList = new LinkList()
    let trans = null

    while (!queue.isEmpty())
    {
      trans = queue.popHead()
      retList.pushTailList(func(trans))
      queue.pushTailList(trans.childList)
    }
    return retList
  }

  /**
   *
   * @param {Transform->*}func
   * @return {*}
   * @private
   */
  _findInAncestor (func)
  {
    let trans = this.transform.parent
    let target = null
    while (trans != null)
    {
      target = null
      target = func(trans)
      if (target == null)
      {
        trans = trans.parent
      } else
      {
        return target
      }
    }
    return null
  }

  /**
   *
   * @param {Transform->LinkList<*>}func
   * @return {LinkList<*>}
   * @private
   */
  _findListInAncestor (func)
  {

    let trans = this.transform.parent
    let retList = new LinkList()
    while (trans != null)
    {
      retList.pushTailList(func(trans))
      trans = trans.parent
    }
    return retList
  }

  /**
   *
   * @param name
   * @return {GameObject}
   */
  findObjectInChildrenByName (name)
  {
    return this._findInChildren
    (
      (trans) =>
      {
        if (trans.gameObject.name === name)
        {
          return trans.gameObject
        } else
        {
          return null
        }
      }
    )
  }

  /**
   *
   * @param name
   * @return {GameObject}
   */
  findObjectInAncestorByName (name)
  {
    return this._findInAncestor
    (
      (trans) =>
      {
        if (trans.gameObject.name === name)
        {
          return trans.gameObject
        } else
        {
          return null
        }
      }
    )
  }

  findComponentInSelfByName (name)
  {
    return this._componentList.choose
    (
      (component) =>
      {
        return component.enable && component.name === name
      }
    )
  }

  findComponentInSelfByClassName (ClassName)
  {
    return this._componentList.choose
    (
      (component) =>
      {
        return component.enable && component.getClassName() === ClassName
      }
    )
  }

  findComponentInSelfByType (type)
  {
    return this._componentList.choose
    (
      (component) =>
      {
        return component.enable && component instanceof type
      }
    )
  }

  /**
   * @param name
   * @return {Component}
   */
  findComponentInSelfChildrenByName (name)
  {
    return this._findComponentInSelfChildren
    (
      (trans) =>
      {
        return trans.findComponentInSelfByName(name)
      }
    )
  }

  /**
   * breadth first
   * @param className
   * @return {Component}
   */

  findComponentInSelfChildrenByClassName (className)
  {
    return this._findComponentInSelfChildren
    (
      (trans) =>
      {
        return trans.findComponentInSelfByName(className)
      }
    )
  }

  /**
   * breadth first
   * @param type
   * @return {Component}
   */
  findComponentInSelfChildrenByType (type)
  {
    return this._findComponentInSelfChildren
    (
      (trans) =>
      {
        return trans.findComponentInSelfByName(type)
      }
    )
  }

  /**breadth first
   * @param {Transform->Component} func
   * @return {Component}
   * @private
   */
  _findComponentInSelfChildren (func)
  {
    let queue = new LinkList()
    queue.pushTail(this.transform)
    let trans = null
    let target = null
    while (!queue.isEmpty())
    {
      trans = queue.popHead()
      target = null
      target = func(trans)
      if (target == null)
      {
        queue.pushTailList(trans.childList())
      } else
      {
        return target
      }

    }
    return null
  }

  findComponentInChildrenByName (name)
  {
    return this._findInChildren
    (
      (trans) =>
      {
        return trans.findComponentInSelfByName(name)
      }
    )
  }

  findComponentInChildrenByType (type)
  {
    return this._findInChildren
    (
      (trans) =>
      {
        return trans.findComponentInSelfByType(type)
      }
    )
  }

  findComponentInChildrenByClassName (className)
  {
    return this._findInChildren
    (
      (trans) =>
      {
        return trans.findComponentInSelfByClassName(className)
      }
    )
  }

  /**
   * breadth first
   * @param className
   * @return {LinkList<Component>}
   */
  findComponentsInSelfByClassName (className)
  {
    return this._componentList.filter
    (
      (component) =>
      {
        return component.enable && component.getClassName() === className
      }
    )
  }

  /**
   *
   * breadth first
   * @param type
   * @return {LinkList<Component>}
   */
  findComponentsInSelfByType (type)
  {
    return this._componentList.filter
    (
      (component) =>
      {
        return component.enable && component instanceof type
      }
    )
  }

  /**
   *
   * @param className
   * @return {LinkList<Component>}
   */
  findComponentsInSelfChildrenByClassName (className)
  {
    return this._findComponentsInSelfChildren
    (
      (trans) =>
      {
        return trans.findComponentsInSelfByClassName(className)
      }
    )
  }

  /**
   *
   * @param type
   * @return {LinkList<Component>}
   */
  findComponentsInSelfChildrenByType (type)
  {
    return this._findComponentsInSelfChildren
    (
      (trans) =>
      {
        return trans.findComponentsInSelfByType(type)
      }
    )
  }

  /**
   *
   * @param {Transform->LinkList<Component>} func
   * @return {LinkList<Component>}
   * @private
   */
  _findComponentsInSelfChildren (func)
  {
    let queue = new LinkList()
    queue.pushTail(this.transform)
    let retList = new LinkList()
    let trans = null

    while (!queue.isEmpty())
    {
      trans = queue.popHead()
      retList.pushTailList(func(trans))
      queue.pushTailList(trans.childList)
    }
    return retList
  }

  /**
   *
   * @param {Transform->LinkList<Component>} func
   * @return {LinkList<Component>}
   * @private
   */
  findComponentsInChildrenByType (type)
  {
    return this._findListInChildren
    (
      (trans) =>
      {
        return trans.findComponentsInSelfByType(type)
      }
    )
  }

  /**
   *
   * @param className
   * @return {LinkList<*>}
   */
  findComponentsInChildrenByClassName (className)
  {
    return this._findListInChildren
    (
      (trans) =>
      {
        return trans.findComponentsInSelfByClassName(className)
      }
    )
  }

  /**
   * breadth first
   * @param name
   * @return {Component}
   */
  findComponentInAncestorByName (name)
  {
    return this._findInAncestor
    (
      (trans) =>
      {
        return trans.findComponentInSelfByName(name)
      }
    )
  }

  /**
   * breadth first
   * @param className
   * @return {Component}
   */
  findComponentInAncestorByClassName (className)
  {
    return this._findInAncestor
    (
      (trans) =>
      {
        return trans.findComponentInSelfByClassName(className)
      }
    )
  }

  /**
   * breadth first
   * @param type
   * @return {Component}
   */
  findComponentInAncestorByType (type)
  {
    return this._findInAncestor
    (
      (trans) =>
      {
        return trans.findComponentInSelfByType(type)
      }
    )
  }

  /**
   *
   * @param type
   * @return {LinkList<*>}
   */
  findComponentsInAncestorByClassName (className)
  {
    return this._findListInAncestor
    (
      (trans) =>
      {
        return trans.findComponentsInSelfByClassName(className)
      }
    )
  }

  /**
   *
   * @param type
   * @return {LinkList<*>}
   */
  findComponentsInAncestorByType (type)
  {
    return this._findListInAncestor
    (
      (trans) =>
      {
        return trans.findComponentsInSelfByType(type)
      }
    )
  }

  get name ()
  {
    return this._name
  }

  set name (value)
  {
    this._name = value
  }

  get tag ()
  {
    return this._tag
  }

  set tag (value)
  {
    this._tag = value
  }

  get layerMask ()
  {
    return this._layerMask
  }

  set layerMask (value)
  {
    this._layerMask = value
  }

  get layer ()
  {
    for (let i = 0; i < 64; i++)
    {
      if (((this._layerMask >> i) & 1) === 1)
      {
        return i + 1
      } else
      {
        //pass
      }
    }
  }

  set layer (value)
  {
    if (value > 0)
    {
      this._layerMask = 1 << (value - 1)
    } else
    {
      throw new BaseException('layer must >0')
    }
  }

  get isActive ()
  {
    return this._isActive
  }

  set isActive (value)
  {
    this._isActive = value
    if (value)
    {
      this.onActive()
    } else
    {
      this.onDeActive()
    }
  }

  get transform ()
  {
    return this._transform
  }

  set transform (value)
  {
    this._transform = value
  }

  onActive ()
  {
    //TODO for every child and component ,invoke component awake,and child set Active()
  }

  onDeActive ()
  {
    //TODO  for every child and component ,invoke component awake,and child set deActive()
  }

  onDestory ()
  {
    //TODO for every child and component ,invoke component awake,and child set deActive()
  }
}