import UObject     from '../Base/UObject.js'
import TimeManager from './TimeManager.js'

export default class Time extends UObject
{
  constructor0 ()
  {
  }

  static get startupTime ()
  {
    return TimeManager.instance.startupTime
  }

  static get currentFrameTime ()
  {
    return TimeManager.instance.currentFrameTime
  }

  static get lastFrameTime ()
  {
    return TimeManager.instance.lastFrameTime
  }

  static get deltaFrameTime ()
  {
    return TimeManager.instance.deltaFrameTime
  }

  static get frameCount ()
  {
    return TimeManager.instance.frameCount
  }

  static get time ()
  {
    let date = new Date()
    return date.getTime()
  }
}