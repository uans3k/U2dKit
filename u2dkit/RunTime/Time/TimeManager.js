import Manager from '../Base/Manager.js'

export default class TimeManager extends Manager
{

  constructor0 ()
  {
    super.constructor0()

    this._startupTime = 0
    this._frameCount = 0
    this._lastFrameTime = 0
    this._deltaFrameTime = 0
    this._currentFrameTime = 0
    this._date = null
  }

  startup ()
  {
    let date = new Date()
    this._startupTime = date.getTime()
    this._frameCount = 0
    this._currentFrameTime = this._startupTime
    this._lastFrameTime = this._startupTime
    this._deltaFrameTime = 0
  }

  update ()
  {
    let date = new Date()
    this._frameCount += 1
    this._lastFrameTime = this._currentFrameTime
    this._currentFrameTime = date.getTime()
    this._deltaFrameTime = this._currentFrameTime - this._lastFrameTime
  }

  get deltaFrameTime ()
  {
    return this._deltaFrameTime
  }

  get startupTime ()
  {
    return this._startupTime
  }

  get frameCount ()
  {
    return this._frameCount
  }

  get lastFrameTime ()
  {
    return this._lastFrameTime
  }

  get currentFrameTime ()
  {
    return this._currentFrameTime
  }

  pause ()
  {
    //TODO
  }

  reset ()
  {
    let date = new Date()
    this._startupTime = date.getMilliseconds()
    this._frameCount = 0
    this._currentFrameTime = this._startupTime
    this._lastFrameTime = this._startupTime
    this._deltaFrameTime = 0
  }

  static get instance ()
  {
    if (TimeManager._instance != null)
    {
      return TimeManager._instance
    } else
    {
      TimeManager._instance = new TimeManager()
      return TimeManager._instance
    }
  }

  shutdown ()
  {

  }
}
