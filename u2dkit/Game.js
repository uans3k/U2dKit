import UObject       from './RunTime/Base/UObject.js'
import BaseException from './RunTime/Base/BaseException.js'
import engineList    from './Config/EngineConfig.js'
import managerList   from './Config/ManagerConfig.js'
import Time          from './RunTime/Time/Time.js'
import TimeManager   from './RunTime/Time/TimeManager.js'

export default class Game extends UObject
{
  constructor0 ()
  {
    this._hasInit = false
    this._projectConfig = null
    this._managerList = null
    this._engineList = null
    this._requestFrame = null
  }

  static get instance ()
  {
    if (Game._instance != null)
    {
      return Game._instance
    } else
    {
      Game._instance = new Game()
      return Game._instance
    }
  }

  init (ProjectConfig)
  {
    this._projectConfig = ProjectConfig

    this._requestFrame = this._getRequestFrameFunc(this._projectConfig.fps)

    this._managerList = managerList
    this._engineList = engineList

    this._hasInit = true
  }

  get projectConfig ()
  {
    if (this._hasInit)
    {
      return this._projectConfig
    } else
    {
      throw new BaseException('game not init ,so can\'t get Config ')
    }

  }

  run ()
  {
    if (this._hasInit)
    {
      let managerIter = this._managerList.iterator()

      for (let manager = managerIter.begin(); managerIter.hasNotEnd(); manager = managerIter.next())
      {
        manager.startup()
      }

      this._mainLoop()

      managerIter = this._managerList.iterator(false)

      for (let manager = managerIter.begin(); managerIter.hasNotEnd(); manager = managerIter.next())
      {
        manager.shutdown()
      }

    } else
    {
      throw new BaseException('game not init ,so can\'t run ')
    }
  }

  _mainLoop ()
  {
    TimeManager.instance.update()

    let startTime = Time.time

    this._engineList.forEach
    (
      (engine) =>
      {
        engine.exec()
      }
    )

    let endTime = Time.time

    let deltaTime = endTime - startTime

    this._requestFrame
    (
      () =>
      {
        this._mainLoop()
      }
    )
  }

  _getRequestFrameFunc (fps)
  {
    if
    (
      window.requestAnimationFrame != null
      &&
      (
        fps > 58
        &&
        fps < 62
      )
    )
    {
      return (callback, deltaTime) =>
      {
        window.requestAnimationFrame(callback)
      }
    } else
    {
      let frameDeltaTime = Math.round(1000 / fps)
      return (callback, deltaTime) =>
      {
        deltaTime = frameDeltaTime - deltaTime
        if (deltaTime > 0)
        {
          setTimeout
          (
            callback,
            deltaTime
          )
        } else
        {
          setTimeout
          (
            callback,
            0
          )
        }
      }
    }

  }
}

let game = Game.class
