import UObject         from '../Base/UObject.js'
import ResourceManager from './ResourceManager.js'

export default class Loader extends UObject
{
  constructor0 ()
  {
  }

  static loadImage (src, callback)
  {
    ResourceManager.instance.loadImage(src, callback)
  }

  static loadGameObject (gameObjectConfig)
  {
    return ResourceManager.instance.loadGameObject(gameObjectConfig)
  }

}