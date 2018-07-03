import Manager  from '../Base/Manager.js'
import LinkList from '../DataStructure/LinkList.js'

export default class ColliderManager extends Manager
{

  constructor0 ()
  {
    super.constructor0()
    this._colliderList = null
  }

  startup ()
  {
    this._colliderList = new LinkList()
  }

  static get instance ()
  {
    if (ColliderManager._instance != null)
    {
      return ColliderManager._instance
    } else
    {
      ColliderManager._instance = new ColliderManager()
      return ColliderManager._instance
    }
  }

  shutdown ()
  {

  }

  get colliderList ()
  {
    return this._colliderList
  }

  set colliderList (value)
  {
    this._colliderList = value
  }

}
