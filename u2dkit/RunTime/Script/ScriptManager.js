import Manager from '../Base/Manager.js'

export default class ScriptManager extends Manager
{

  constructor0 ()
  {
    this._monoBehaviorList = {}
  }

  startup ()
  {

  }

  static get instance ()
  {
    if (ScriptManager._instance != null)
    {
      return ScriptManager._instance
    } else
    {
      ScriptManager._instance = new ScriptManager()
      return ScriptManager._instance
    }
  }

  shutdown ()
  {

  }

  get monoBehaviorList ()
  {
    return this._monoBehaviorList
  }

  set monoBehaviorList (value)
  {
    this._monoBehaviorList = value
  }
}

