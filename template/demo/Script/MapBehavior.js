import MonoBehavior   from '../../../u2dkit/RunTime/Script/MonoBehavior.js'
import TouchEvent     from '../../../u2dkit/RunTime/Script/TouchEvent.js'
import Time           from '../../../u2dkit/RunTime/Time/Time.js'
import MapModel       from '../Model/MapModel.js'
import SpriteRenderer from '../../../u2dkit/RunTime/Render/Sprite/SpriteRenderer.js'
import Loader         from '../../../u2dkit/RunTime/Resource/Loader.js'
import PointDefault   from '../Assets/PointDefault.js'
import PointBehavior  from './PointBehavior.js'
import Point          from '../Model/Point.js'

export default class MapBehavior extends MonoBehavior
{

  constructor0 ()
  {
    super.constructor0()
    this._lastTime = 0
    this._mapModel = null
    this._mapRenderer = null
  }

  onStart ()
  {
    this._mapModel = MapModel
    this._mapRenderer = this.findComponentInSelfByType(SpriteRenderer)
    this._updateMap()
  }

  update ()
  {

  }

  //data binding
  _updateMap ()
  {
    this.transform.clearChild()

    this._mapRenderer.imgUrl = this._mapModel.mapUrl
    let points = this._mapModel.points
    points.forEach
    (
      (point) =>
      {
        this._addNewPoint(point)
      }
    )
  }

  removePoint (pointBehavior)
  {
    this._mapModel.points.deleteElement(pointBehavior.pointData)
    this.transform.removeChild(pointBehavior.transform)
  }

  _addNewPoint (point)
  {
    let pointInstance = Loader.loadGameObject(PointDefault)
    let pointBehavior = pointInstance.findComponentInSelfByType(PointBehavior)
    pointBehavior.pointData = point
    pointInstance.transform.attachParent(this.transform)
  }

  captureEvent (touchEvent)
  {
    if (touchEvent.type === TouchEvent.TYPE.UP)
    {
      let newTime = Time.time
      if ((newTime - this._lastTime) < 200)
      {
        let newPoint = new Point(0, 'new', touchEvent.localVector.x, touchEvent.localVector.y)

        this._mapModel.points.pushTail(newPoint)
        this._addNewPoint(newPoint)
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