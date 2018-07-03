import Behavior      from '../BaseComponent/Behavior.js'
import BaseException from '../Base/BaseException.js'

export default class Camera extends Behavior
{

  constructor0 ()
  {
    super.constructor0()
    this._depth = 0
    this._targetLayersMask = 1
  }

  getCameraToWorldMatrix ()
  {
    return this.transform.getLocalToWorldMatrix()
  }

  getWorldToCameraMatrix ()
  {
    return this.transform.getWorldToLocalMatrix()
  }

  get targetLayersMask ()
  {
    return this._targetLayersMask
  }

  set targetLayerMask (value)
  {
    this._targetLayersMask = value
  }

  get targetLayers ()
  {
    let layers = []
    let mask = this._targetLayersMask
    for (let i = 0; i < 64; i++)
    {
      if (mask === 0)
      {
        return layers
      } else
      {
        mask = (mask >> 1)
        ((mask | 1) === 1) ? layers.push(i + 1) : null
      }
    }
    return layers
  }

  set targetLayers (value)
  {
    this._targetLayersMask = 0
    value.forEach
    (
      (layer) =>
      {
        if (layer > 0)
        {
          this._targetLayersMask |= (1 << (layer - 1))
        } else
        {
          throw BaseException('layer must >1')
        }
      }
    )
  }

  get depth ()
  {
    return this._depth
  }

  set depth (value)
  {
    this._depth = value
  }
}