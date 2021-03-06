import Renderer from '../../BaseComponent/Renderer.js'

export default class TextRenderer extends Renderer
{

  constructor0 ()
  {
    super.constructor0()
    this._x = 0
    this._y = 0
    this._font = '15px 宋体'
    this._textAlign = 'center'
    this._textBaseline = 'middle'
    this._textColor = 'black'
    this._text = ''
  }

  /**
   *    drawText (mat, font, textColor,
   textAlign,baseLine, anchor, Text)
   * @param {Canvas} canvas
   */
  render (canvas)
  {
    if (this._text != null && this._text.length > 0)
    {
      let transform = this.transform
      let mat = transform.getLocalToWorldMatrix()
      canvas.drawText(mat, this._font, this._textColor, this._textAlign, this._textBaseline, this._x, this._y, this._text)
    } else
    {
      //pass
    }
  }

  get font ()
  {
    return this._font
  }

  set font (value)
  {
    this._font = value
  }

  get textAlign ()
  {
    return this._textAlign
  }

  set textAlign (value)
  {
    this._textAlign = value
  }

  get textBaseline ()
  {
    return this._textBaseline
  }

  set textBaseline (value)
  {
    this._textBaseline = value
  }

  get textColor ()
  {
    return this._textColor
  }

  set textColor (value)
  {
    this._textColor = value
  }

  get text ()
  {
    return this._text
  }

  set text (value)
  {
    this._text = value.toString()
  }

  get x ()
  {
    return this._x
  }

  set x (value)
  {
    this._x = value
  }

  get y ()
  {
    return this._y
  }

  set y (value)
  {
    this._y = value
  }
}