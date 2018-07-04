import TouchBehavior from './TouchBehavior.js'
import RootBehavior  from './RootBehavior.js'

export default class PlusBehavior extends TouchBehavior
{
  constructor0 ()
  {
    super.constructor0()
    this._rootBehavior = null
  }

  onStart ()
  {
    super.onStart()
    this.touchImg = 'plus_hover.png'
    this.unTouchImg = 'plus.png'
    this._rootBehavior = this.findComponentInAncestorByType(RootBehavior)

  }

  onTouchDown (touchEvent)
  {
    super.onTouchDown(touchEvent)
    this._rootBehavior.plus()
  }
}