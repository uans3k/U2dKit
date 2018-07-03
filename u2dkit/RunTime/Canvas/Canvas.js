import UObject         from '../Base/UObject.js'
import Matrix2x2H      from '../Math/Matrix2x2H.js'
import CanvasException from './CanvasException.js'

/**
 * @property {Camera} camera
 * @property {Vector2} viewPort
 * @property {Vector2} decisionPort
 */
export default class Canvas extends UObject
{

  constructor3 (context, viewPort, designPort)
  {
    this._context = context
    this._viewPort = viewPort
    this._designPort = designPort

    this._camera = null
    this._cacheViewportToCameraMatrix = null
    this._cacheWorldToViewportMatrix = null
    this._hasPortChange = true
    this._hasCameraChange = true
  }

  get camera ()
  {
    return this._camera
  }

  set camera (camera)
  {
    this._hasCameraChange = true
    this._camera = camera
  }

  getCameraToViewportMatrix ()
  {
    {
      if (this._hasPortChange)
      {
        this._cacheViewportToCameraMatrix = Matrix2x2H.scale(this._viewPort.x / this._designPort.x, this._viewPort.y / this._designPort.y)
        return this._cacheViewportToCameraMatrix
      } else
      {
        return this._cacheViewportToCameraMatrix
      }
    }
  }

  getViewportToCameraMatrix ()
  {
    return this.getCameraToViewportMatrix().inverseL()
  }

  _getWorldToViewportMatrix ()
  {
    if (this._camera == null)
    {
      throw  new CanvasException('need a camera')
    } else if (this._hasCameraChange || this._hasPortChange)
    {
      let mat = this._camera.getWorldToCameraMatrix()
      mat = mat.multMatrixL(this.getCameraToViewportMatrix())
      this._cacheWorldToViewportMatrix = mat
      this._hasCameraChange = false

      return this._cacheWorldToViewportMatrix
    } else
    {
      return this._cacheWorldToViewportMatrix
    }
  }

  drawText (matrix, font, textColor,
            textAlign, textBaseline, anchor, text)
  {

    this._context.save()

    let mat = matrix.multMatrixL(this._getWorldToViewportMatrix())
    this._context.transform(mat.m11, mat.m12, mat.m21, mat.m22, mat.dx, mat.dy)

    this._context.font = font
    this._context.fillStyle = textColor
    this._context.textAlign = textAlign
    this._context.textBaseline = textBaseline
    this._context.fillText(text, anchor.x, anchor.y)

    this._context.restore()
  }

  drawImage (matrix, img, x, y, w, h)
  {
    this._context.save()
    let mat = matrix.multMatrixL(this._getWorldToViewportMatrix())
    this._context.transform(mat.m11, mat.m12, mat.m21, mat.m22, mat.dx, mat.dy)
    this._context.drawImage(img, x, y, w, h)
    this._context.restore()
  }

  clear ()
  {
    this._context.clearRect(0, 0, this._viewPort.x, this._viewPort.y)
  }

  get viewPort ()
  {
    return this._viewPort
  }

  set viewPort (value)
  {
    this._hasPortChange = true
    this._viewPort = value

  }

  get designPort ()
  {
    return this._designPort
  }

  set designPort (value)
  {
    this._hasPortChange = true
    this._designPort = value
  }

  getViewRatio ()
  {
    return this._viewPort
  }
}