import Manager from '../Base/Manager.js'
import Game    from '../../Game.js'
import Loader  from '../Resource/Loader.js'

export default class SceneManager extends Manager
{

  constructor0 ()
  {
    this._scenes = null
    this._currentSceneInstance = null
  }

  startup ()
  {
    this._scenes = Game.instance.projectConfig.scenes
    this.load(0)
  }

  get currentSceneInstance ()
  {
    return this._currentSceneInstance
  }

  /**
   * later we will add listener to watch the rate of progress
   * @param index
   */
  load (index)
  {
    if (index < this._scenes.length)
    {
      this._currentSceneInstance = Loader.loadGameObject(this._scenes[index])
    } else
    {
      throw new SceneManager('Scene index out of bound')
    }
  }

  static get instance ()
  {
    if (SceneManager._instance != null)
    {
      return SceneManager._instance
    } else
    {
      SceneManager._instance = new SceneManager()
      return SceneManager._instance
    }
  }

  shutdown ()
  {

  }

}
