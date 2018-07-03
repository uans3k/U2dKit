import Manager       from '../Base/Manager.js'
import TouchEvent    from './TouchEvent.js'
import BaseException from '../Base/BaseException.js'
import LinkList      from '../DataStructure/LinkList.js'
import CanvasManager from '../Canvas/CanvasManager.js'

export default class EventManager extends Manager
{
  constructor0 ()
  {
    this._eventQueue = null
    this._htmlCanvas = null
  }

  startup ()
  {

    this._eventQueue = new LinkList()
    this._htmlCanvas = CanvasManager.instance.htmlCanvas

    this._htmlCanvas.onmousedown = this._mustEventCapure(TouchEvent.TYPE.DOWN)
    this._htmlCanvas.onmousemove = this._eventCapture(TouchEvent.TYPE.MOVE)
    this._htmlCanvas.onmouseout = this._mustEventCapure(TouchEvent.TYPE.OUT)
    this._htmlCanvas.onmouseup = this._mustEventCapure(TouchEvent.TYPE.UP)
  }

  static get instance ()
  {
    if (EventManager._instance != null)
    {
      return EventManager._instance
    } else
    {
      EventManager._instance = new EventManager()
      return EventManager._instance
    }

  }

  shutdown ()
  {

  }

  getTouchEvent ()
  {
    return this._eventQueue.popHead()
  }

  _mustEventCapure (type)
  {
    let that = this

    return (jsEvent) =>
    {
      let touchEvent = new TouchEvent()
      touchEvent.viewVector.x = jsEvent.offsetX
      touchEvent.viewVector.y = jsEvent.offsetY
      touchEvent.type = type
      that._eventQueue.pushTail(touchEvent)
    }
  }

  _eventCapture (type)
  {
    let that = this

    return (jsEvent) =>
    {
      if (this._eventQueue.isEmpty())
      {
        let touchEvent = new TouchEvent()
        touchEvent.viewVector.x = jsEvent.offsetX
        touchEvent.viewVector.y = jsEvent.offsetY
        touchEvent.type = type
        this._eventQueue.pushTail(touchEvent)
      }
    }
  }

}

EventManager._instance = null