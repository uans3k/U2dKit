import Manager from '../Base/Manager.js'
import Canvas  from './Canvas.js'
import Game    from '../../Game.js'
import Vector2 from '../Math/Vector2.js'

export default class CanvasManager extends Manager
{

  constructor0 ()
  {
    this._htmlCanvas = null
    this._canvas = null
  }

  startup (config)
  {
    let canvasID = Game.instance.projectConfig.canvasID
    this._htmlCanvas = document.getElementById(canvasID)

    let context = this._htmlCanvas.getContext('2d')
    let viewPort = new Vector2(this._htmlCanvas.width, this._htmlCanvas.height)
    let designPort = new Vector2(Game.instance.projectConfig.designX, Game.instance.projectConfig.designY)

    this._canvas = new Canvas(context, viewPort, designPort)
  }

  static get instance ()
  {
    if (CanvasManager._instance != null)
    {
      return CanvasManager._instance
    } else
    {
      CanvasManager._instance = new CanvasManager()
      return CanvasManager._instance
    }
  }

  shutdown ()
  {
  }

  get canvas ()
  {
    return this._canvas
  }

  get htmlCanvas ()
  {
    return this._htmlCanvas
  }
}
