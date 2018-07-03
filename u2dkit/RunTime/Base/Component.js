import UObject       from './UObject.js'
import LinkList      from '../DataStructure/LinkList.js'
import BaseException from './BaseException.js'

export default class Component extends UObject
{

  constructor0 ()
  {
    this._gameObject = null
    this._name = 'default'
    this._enable = true
  }

  //--------------------------------object------------------------//

  findObjectInChildrenByName (name)
  {
    if (this.isActive())
    {
      return this.gameObject.findObjectInChildrenByName(name)
    } else
    {
      return null
    }
  }

  findObjectInAncestorByName (name)
  {
    if (this.isActive())
    {
      return this.gameObject.findObjectInAncestorByName(name)
    } else
    {
      return null
    }
  }

  //---------------------------------self--------------------------------//

  findComponentInSelfByName (name)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInSelfByName(name)
    } else
    {
      return null
    }
  }

  findComponentInSelfByClassName (className)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInSelfByClassName(className)
    } else
    {
      return null
    }
  }

  findComponentInSelfByType (type)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInSelfByType(type)
    }
    else
    {
      return null
    }
  }

  /**
   * breadth first
   * @param className
   * @return {LinkList<Component>}
   */
  findComponentsInSelfByClassName (className)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentsInSelfByClassName(className)
    } else
    {
      return null
    }
  }

  /**
   *
   * breadth first
   * @param type
   * @return {LinkList<Component>}
   */
  findComponentsInSelfByType (type)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentsInSelfByType(type)
    } else
    {
      return null
    }
  }

  //---------------------------children------------------------//

  /**
   * @param name
   * @return {Component}
   */
  findComponentInChildrenByName (name)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInChildrenByName(name)
    } else
    {
      return null
    }
  }

  findComponentInChildrenByClassName ()
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInChildrenByClassName(type)
    } else
    {
      return null
    }
  }

  findComponentInChildrenByType (type)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInChildrenByType(type)
    } else
    {
      return null
    }
  }

  findComponentsInChildrenByClassName (className)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentsInChildrenByClassName(type)
    } else
    {
      return null
    }
  }

  findComponentsInChildrenByType (type)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentsInChildrenByType(type)
    } else
    {
      return null
    }
  }

  //-------------------------self children----------------------//

  /**
   * @param name
   * @return {Component}
   */
  findComponentInSelfChildrenByName (name)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInSelfChildrenByName(name)
    } else
    {
      return null
    }
  }

  /**
   * breadth first
   * @param className
   * @return {Component}
   */

  findComponentInSelfChildrenByClassName (className)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInSelfChildrenByClassName(className)
    } else
    {
      return null
    }
  }

  /**
   * breadth first
   * @param type
   * @return {Component}
   */
  findComponentInSelfChildrenByType (type)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInSelfChildrenByType(type)
    } else
    {
      return null
    }
  }

  /**
   *
   * @param className
   * @return {LinkList<Component>}
   */
  findComponentsInSelfChildrenByClassName (className)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentsInSelfChildrenByClassName(className)
    } else
    {
      return null
    }
  }

  /**
   *
   * @param type
   * @return {LinkList<Component>}
   */
  findComponentsInSelfChildrenByType (type)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentsInSelfChildrenByType(type)
    } else
    {
      return null
    }
  }

  //-----------------------ancestor-------------------------//

  /**
   * breadth first
   * @param name
   * @return {Component}
   */
  findComponentInAncestorByName (name)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInAncestorByName(name)
    } else
    {
      return null
    }
  }

  /**
   * breadth first
   * @param className
   * @return {Component}
   */
  findComponentInAncestorByClassName (className)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInAncestorByClassName(className)
    } else
    {
      return null
    }
  }

  /**
   * breadth first
   * @param type
   * @return {Component}
   */
  findComponentInAncestorByType (type)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentInAncestorByType(type)
    } else
    {
      return null
    }
  }

  /**
   *
   * @param className
   * @return {Component}
   *
   */
  findComponentsInAncestorByClassName (className)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentsInAncestorByClassName(className)
    } else
    {
      return null
    }
  }

  /**
   * @param type
   * @return {Component}
   *
   */
  findComponentsInAncestorByType (type)
  {
    if (this.isActive())
    {
      return this.gameObject.findComponentsInAncestorByType(type)
    } else
    {
      return null
    }
  }

  //---------------------------------other-------------------------------//

  isActive ()
  {
    return this.gameObject != null
  }

  awake ()
  {

  }

  onEnable ()
  {

  }

  onDisable ()
  {

  }

  get enable ()
  {
    return this._enable
  }

  set enable (value)
  {
    this._enable = value
    if (value === true)
    {
      this.awake()
    } else
    {
      //pass
    }
  }

  get transform ()
  {
    if (this._gameObject == null)
    {
      throw BaseException('BaseComponent not attach a instance')
    } else
    {
      return this._gameObject.transform
    }
  }

  get gameObject ()
  {
    return this._gameObject
  }

  set gameObject (value)
  {
    this._gameObject = value
  }

  get name ()
  {
    return this._name
  }

  set name (value)
  {
    this._name = value
  }
}