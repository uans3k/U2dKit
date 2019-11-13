import TouchBehavior from './TouchBehavior.js'
import RootBehavior  from './RootBehavior.js'

export default class MinusBehavior extends TouchBehavior
{
  constructor0 ()
  {
    super.constructor0()
    this._rootBehavior = null
  }

  onStart ()
  {
    super.onStart()
    this.touchImg = 'minus_hover.png'
    this.unTouchImg = 'minus.png'
    this._rootBehavior = this.findComponentInAncestorByType(RootBehavior)
  }

  onTouchDown (touchEvent)
  {
    super.onTouchDown(touchEvent)
    this._rootBehavior.minus()
  }
}