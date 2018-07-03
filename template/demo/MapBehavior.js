import MonoBehavior from '../../u2dkit/RunTime/Script/MonoBehavior.js'
import TouchEvent   from '../../u2dkit/RunTime/Script/TouchEvent.js'
import Time         from '../../u2dkit/RunTime/Time/Time.js'

export default class MapBehavior extends MonoBehavior
{

  constructor0 ()
  {
    super.constructor0()
    this._lastTime = 0
  }

  captureEvent (touchEvent)
  {
    if (touchEvent.type === TouchEvent.TYPE.UP)
    {
      let newTime = Time.time
      if ((newTime - this._lastTime) < 200)
      {
        console.log('double click')
      } else
      {
        //pass
      }
      this._lastTime = newTime
    } else
    {
      //pass
    }
    return false
  }
}