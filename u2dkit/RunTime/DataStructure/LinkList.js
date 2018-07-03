import DataStructureException from './DataStructureException.js'
import Iterator               from './Iterator.js'

export default class LinkList
{
  constructor ()
  {
    this._head = null
    this._tail = null
    this._length = 0
  }

  clear ()
  {
    this._head = null
    this._tail = null
    this._length = 0
  }

  iterator (isLeftToRight = true)
  {
    return new LinkListIterator(isLeftToRight ? this._head : this._tail, this._length, isLeftToRight)
  }

  insert (index, element)
  {
    if (index < 0 || index > this._length)
    {
      throw new DataStructureException('index out bound')
    } else if (index == 0)
    {
      this.pushHead(element)
    } else if (index == this._length)
    {
      this.pushTail(element)
    } else
    {
      var target = get(index)
      var tNode = new Node(element)
      tNode.next = target
      tNode.prev = target.prev
      target.prev.next = tNode
      target.prev = tNode
      this._length += 1
    }
  }

  _getNode (element)
  {
    var target = this._head
    if (target == null)
    {
      return null
    }
    while (1)
    {
      if (target.element === element)
      {
        return target
      } else if (target.next === this._head)
      {
        return null
      } else
      {
        target = target.next
      }
    }
  }

  _getNodeIndex (index)
  {
    if (index < 0 || index >= this._length)
    {
      throw new DataStructureException('index out bound')
    } else
    {

    }
  }

  _deleteNode (node)
  {
    if (node == null)
    {
      //pass
    }
    else if (node.next == node)
    {
      this._head = null
      this._tail = null
      this._length = 0
    } else
    {
      node.prev.next = node.next
      node.next.prev = node.prev
      this._length -= 1
    }
  }

  isElementIn (element)
  {
    var target = this._getNode(element)
    if (target == null)
    {
      return false
    } else
    {
      return true
    }
  }

  deleteElement (element)
  {
    var target = this._getNode(element)
    if (target == null)
    {
      //pass
    }
    else if (target == this._head)
    {
      this.popHead()
    } else if (target == this._tail)
    {
      this.popTail()
    } else
    {
      this._deleteNode(target)
    }
  }

  delete (index)
  {
    if (index < 0 || index >= this._length)
    {
      throw new DataStructureException('index out bound')
    }
    else if (index == 0)
    {
      this.popHead()
    } else if (index == this._length - 1)
    {
      this.popTail()
    } else
    {
      this._deleteNode(this._getNodeIndex(index))
    }
  }

  popHead ()
  {
    if (this._length == 0)
    {
      return null
    } else if (this._length == 1)
    {
      let ret = this._head
      this._head = null
      this._tail = null
      this._length = 0
      return ret.element
    } else
    {
      let ret = this._head
      this._head.next.prev = this._head.prev
      this._head.prev.next = this._head.next
      this._head = this._head.next
      this._length -= 1
      return ret.element
    }
  }

  popTail ()
  {
    if (this._length == 0)
    {
      return null
    } else if (this._length == 1)
    {
      let ret = this._tail
      this._head = null
      this._tail = null
      this._length = 0
      return ret.element
    } else
    {
      let ret = this._tail
      this._tail.next.prev = this._tail.prev
      this._tail.prev.next = this._tail.next
      this._tail = this._tail.prev
      this._length -= 1
      return ret.element
    }
  }

  isEmpty ()
  {
    return this._length == 0
  }

  getHead ()
  {
    return this._head.element
  }

  getTail ()
  {
    return this._tail.element
  }

  get (index)
  {
    if (index >= 0 && index < this._length / 2)
    {
      this._getNodeLeftToRight(this._head, index).element()
    } else if (index >= this._length / 2 && index < this._length)
    {
      this._getNodeRightToLeft(this._tail, this._length - 1 - index).element
    } else
    {
      throw new DataStructureException('index out bound')
    }
  }

  pushTailList (list)
  {
    if (list != null)
    {
      let iter = list.iterator()
      for (let item = iter.begin(); iter.hasNotEnd(); item = iter.next())
      {
        this.pushTail(item)
      }
    } else
    {
      //pass
    }

  }

  pushHeadList (list)
  {
    if (list != null)
    {
      let iter = list.iterator(false)
      for (let item = iter.begin(); iter.hasNotEnd(); item = iter.next())
      {
        this.pushTail(item)
      }
    } else
    {
      //pass
    }

  }

  pushHead (element)
  {

    if (this._length == 0)
    {
      this._createOnlyElement(element)
    } else
    {
      var tNode = new Node(element)
      tNode.next = this._head
      tNode.prev = this._tail
      this._head.prev = tNode
      this._tail.next = tNode
      this._head = tNode
      this._length += 1
    }
  }

  pushTail (element)
  {
    if (this._length == 0)
    {
      this._createOnlyElement(element)
    } else
    {
      var tNode = new Node(element)
      tNode.next = this._head
      tNode.prev = this._tail
      this._head.prev = tNode
      this._tail.next = tNode
      this._tail = tNode
      this._length += 1
    }
  }

  _createOnlyElement (element)
  {
    this._head = new Node(element)
    this._tail = this._head
    this._head.prev = this._tail
    this._head.next = this._tail
    this._tail.prev = this._head
    this._tail.next = this._head
    this._length = 1
  }

  _getNodeLeftToRight (node, index)
  {

    if (index == 0)
    {
      return node
    } else
    {
      return this._getNodeLeftToRight(node.next(), index - 1)
    }
  }

  _getNodeRightToLeft (node, index)
  {
    if (index == 0)
    {
      return node
    } else
    {
      return this._getNodeRightToLeft(node.prev, index - 1)
    }
  }

  get length ()
  {
    return this._length
  }

  map (func, isLeftToRight = true)
  {
    let newList = new LinkList()
    let iter = this.iterator(isLeftToRight)
    for (var i = iter.begin(); iter.hasNotEnd(); i = iter.next())
    {
      newList.pushTail(func(i))
    }
    return newList
  }

  /**
   *
   * @param {T->V->V} func
   * @param {boolean} isLeftToRight
   */
  reduce (func, v, isLeftToRight = true)
  {
    let iter = this.iterator(isLeftToRight)
    let newV = v
    for (var i = iter.begin(); iter.hasNotEnd(); i = iter.next())
    {
      newV = func(i, newV)
    }
    return newV
  }

  forEach (func, isLeftToRight = true)
  {
    let iter = this.iterator(isLeftToRight)
    for (var i = iter.begin(); iter.hasNotEnd(); i = iter.next())
    {
      func(i)
    }
  }

  /**
   *
   * @param { T -> boolean }func
   * @param {boolean} isLeftToRight
   * @return {*}
   */
  choose (func, isLeftToRight = true)
  {
    let iter = this.iterator(isLeftToRight)
    for (var i = iter.begin(); iter.hasNotEnd(); i = iter.next())
    {
      if (func(i))
      {
        return i
      } else
      {
        //pass
      }
    }
    return null
  }

  chooseBool (func, isLeftToRight = true)
  {
    let iter = this.iterator(isLeftToRight)
    for (var i = iter.begin(); iter.hasNotEnd(); i = iter.next())
    {
      if (func(i))
      {
        return true
      } else
      {
        //pass
      }
    }
    return false
  }

  filter (func, isLeftToRight = true)
  {
    let newList = new LinkList()
    let iter = this.iterator(isLeftToRight)
    for (var i = iter.begin(); iter.hasNotEnd(); i = iter.next())
    {
      if (func(i))
      {
        newList.pushTail(i)
      }
    }
    return newList
  }

  /**
   * @param func
   * @return {Object}
   */
  classify (func, isLeftToRight = true)
  {
    let dict = {}
    let iter = this.iterator(isLeftToRight)
    for (var i = iter.begin(); iter.hasNotEnd(); i = iter.next())
    {
      let key = func(i)

      if (dict[key] == null)
      {
        dict[key] = new LinkList()
      } else
      {
        //pass
      }

      dict[key].pushTail(i)
    }
    return dict
  }

  filterClassify (filterFunc, classfyFunc, isLeftToRight = true)
  {
    let dict = {}
    let iter = this.iterator(isLeftToRight)
    for (var i = iter.begin(); iter.hasNotEnd(); i = iter.next())
    {
      if (filterFunc(i))
      {
        let key = classfyFunc(i)

        if (dict[key] == null)
        {
          dict[key] = new LinkList()
        } else
        {
          //pass
        }

        dict[key].pushTail(i)
      } else
      {
        //pass
      }
    }
    return dict
  }

  // _swap (node1, node2)
  // {
  //   if (this._length > 1)
  //   {
  //     let tmpNode1Pre = node1.prev
  //     let tmpNode1Next = node1.next
  //     node1.next = node2.next
  //     node1.prev = node2.prev
  //     node2.prev.next = node1
  //     node2.next.prev = node1
  //
  //     tmpNode1Pre.next = node2
  //     tmpNode1Next.prev = node2
  //     node2.prev = tmpNode1Pre
  //     node2.next = tmpNode1Next
  //
  //     if (this._head == node1)
  //     {
  //       this._head == node2
  //     } else if (this._head == node2)
  //     {
  //       this._head == node1
  //     } else
  //     {
  //       //pass
  //     }
  //
  //     if (this._tail == node1)
  //     {
  //       this._tail = node2
  //     } else if (this._tail == node2)
  //     {
  //       this._tail = node1
  //     } else
  //     {
  //       //pass
  //     }
  //
  //   } else
  //   {
  //     //pass
  //   }
  // }

  /**
   *
   * @param {T->T->Bool} func (left,right)->Bool
   */
  sort (func)
  {
    if (this._length > 1)
    {
      this._quicksort(this._head, this._tail, func)
    } else
    {
      //pass
    }
  }

  _quicksort (left, right, func)
  {
    if (left !== right)
    {
      let pivotNode = this._partition(left, right, func)

      if (left !== pivotNode)
      {
        this._quicksort(left, pivotNode.prev, func)
      } else
      {
        //pass
      }

      if (right !== pivotNode)
      {
        this._quicksort(pivotNode.next, right, func)
      } else
      {
        //pass
      }
    } else
    {
      //pass
    }
  }

  _partition (left, right, func)
  {
    let pivotElement = left.element
    let posLeft = left
    let posRight = right

    while (posLeft !== posRight)
    {
      while (posLeft !== posRight && !func(posRight.element, pivotElement))
      {
        posRight = posRight.prev
      }

      posLeft.element = posRight.element

      while (posLeft !== posRight && func(posLeft.element, pivotElement))
      {
        posLeft = posLeft.next
      }

      posRight.element = posLeft.element
    }

    posLeft.element = pivotElement

    return posLeft
  }

  toString ()
  {
    let str = this.reduce
    (
      (item, v) =>
      {
        return v + item.toString() + ','
      }
      , '['
    )
    return str + ']'
  }

}

class LinkListIterator
  extends Iterator
{

  constructor (start, length, isLeftToRight)
  {
    super()
    this._start = start
    this._currentPtr = start
    this._length = length
    this._isLeftToRight = isLeftToRight
    this._currentIndex = 0
  }

  begin ()
  {
    this._currentIndex = 0
    this._currentPtr = this._start
    if (this._length === 0)
    {
      return null
    } else
    {
      return this._currentPtr.element
    }

  }

  hasNotEnd ()
  {
    return this._currentIndex < this._length
  }

  next ()
  {
    if (this._currentIndex < this._length - 1)
    {

      this._currentIndex += 1

      if (this._isLeftToRight)
      {
        this._currentPtr = this._currentPtr.next
      } else
      {
        this._currentPtr = this._currentPtr.prev
      }
      return this._currentPtr.element
    } else
    {
      this._currentIndex = this._length
      return this._currentPtr.element
    }
  }

  reset ()
  {
    this._currentIndex = 0
    this._currentPtr = this._start
  }

}

class Node
{
  constructor (element)
  {
    this._element = element
    this._next = null
    this._prev = null
  }

  get next ()
  {
    return this._next
  }

  set next (value)
  {
    this._next = value
  }

  get element ()
  {
    return this._element
  }

  set element (value)
  {
    this._element = value
  }

  set prev (value)
  {
    this._prev = value
  }

  get prev ()
  {
    return this._prev
  }
}
