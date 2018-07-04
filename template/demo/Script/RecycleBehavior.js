import TouchAndCollideBehavior from './TouchAndCollideBehavior.js'

export default class RecycleBehavior extends TouchAndCollideBehavior
{

  constructor0 ()
  {
    super.constructor0()
  }

  onStart ()
  {
    super.onStart()
    this.touchImg = 'recycle_hover.png'
    this.unTouchImg = 'recycle.png'
    this.colliderInImg = 'recycle_hover.png'
    this.colliderOutImg = 'recycle.png'
  }

}