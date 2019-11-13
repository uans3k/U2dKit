import Renderer from '../../BaseComponent/Renderer.js'
import Rect     from '../../Shape/Rect.js'
import Loader   from '../../Resource/Loader.js'

export default class SpriteRenderer extends Renderer
{
  constructor0 ()
  {
    super.constructor0()
    this._rect = new Rect(0, 0, 0, 0)
    this.isVisible = false
    this._img = null
  }

  /**
   *
   * @param {Canvas} canvas
   */
  render (canvas)
  {
    if (this._img !== null)
    {
      let transform = this.transform
      let mat = transform.getLocalToWorldMatrix()
      canvas.drawImage(mat, this._img, this._rect.minX, this._rect.minY, this._rect.width, this._rect.height)
    } else
    {
      //pass
    }
  }

  set imgUrl (value)
  {
    this.isVisible = false
    Loader.loadImage
    (
      value
      , (img) =>
      {
        this._img = img
        this.isVisible = true
      }
    )
  }

  set rect (value)
  {
    this._rect = value
  }

  get rect ()
  {
    return this._rect
  }

  get img ()
  {
    return this._img
  }

  set img (value)
  {
    this._img = value
  }

}