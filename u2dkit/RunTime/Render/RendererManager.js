import Manager  from '../Base/Manager.js'
import LinkList from '../DataStructure/LinkList.js'

export default class RendererManager extends Manager
{

  constructor0 ()
  {
    this._rendererlist = null
  }

  startup ()
  {
    this._rendererlist = new LinkList()
  }

  static get instance ()
  {
    if (RendererManager._instance != null)
    {
      return RendererManager._instance
    } else
    {
      RendererManager._instance = new RendererManager()
      return RendererManager._instance
    }
  }

  shutdown ()
  {

  }

  get rendererList ()
  {
    return this._rendererlist
  }

  set rendererList (value)
  {
    this._rendererlist = value
  }
}