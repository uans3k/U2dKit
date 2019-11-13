import UObject     from '../Base/UObject.js'
import TimeManager from './TimeManager.js'

export default class Time extends UObject
{
  constructor0 ()
  {
  }

  static get startupTime ()
  {
    return TimeManager.class.startupTime
  }

  static get currentFrameTime ()
  {
    return TimeManager.class.currentFrameTime
  }

  static get lastFrameTime ()
  {
    return TimeManager.class.lastFrameTime
  }

  static get deltaFrameTime ()
  {
    return TimeManager.class.deltaFrameTime
  }

  static get frameCount ()
  {
    return TimeManager.class.frameCount
  }

  static get time ()
  {
    let date = new Date()
    return date.getTime()
  }
}