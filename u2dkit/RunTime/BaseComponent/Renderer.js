import Component from '../Base/Component.js'

/**
 * @property {Image} texture
 * @property {Rect} rect
 */
export default class Renderer extends Component
{

  constructor0 ()
  {
    super.constructor0()
    this._dirtyAABB = null
    this._isVisible = true
  }

  render (canvas)
  {

  }

  get transform ()
  {
    return this.gameObject.transform
  }

  get dirtyAABB ()
  {
    return this._dirtyAABB
  }

  set dirtyAABB (value)
  {
    this._dirtyAABB = value
  }

  get isVisible ()
  {
    return this._isVisible
  }

  set isVisible (value)
  {
    this._isVisible = value
  }

}


