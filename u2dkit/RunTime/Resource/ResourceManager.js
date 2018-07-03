import Manager from '../Base/Manager.js'
import Game    from '../../Game.js'
import Vector2 from '../Math/Vector2.js'
import Rotator from '../Math/Rotator.js'

export default class ResourceManager extends Manager
{

  constructor0 ()
  {
    this._resourceDir = null
  }

  startup ()
  {
    this._resourceDir = Game.instance.projectConfig.resourceDir
  }

  loadImage (src, callback)
  {
    let img = new Image()
    let path = this.getResourcePath(src)
    img.src = path
    img.onload = function ()
    {
      callback(img)
    }

  }

  loadGameObject (gameObjectConfig)
  {
    return this._buildObject(gameObjectConfig)
  }

  _buildObject (gameObjectConfig)
  {
    let gameObject = gameObjectConfig.instance

    if (gameObjectConfig.name != null)
    {
      gameObject.name = gameObjectConfig.name
    }

    if (gameObjectConfig.layer != null)
    {
      gameObject.tag = gameObjectConfig.tag
    }

    if (gameObjectConfig.layer != null)
    {
      gameObject.layer = gameObjectConfig.layer
    }

    if (gameObjectConfig.transform != null)
    {
      if (gameObjectConfig.transform.x != null && gameObjectConfig.transform.y != null)
      {
        gameObject.transform.position = new Vector2(gameObjectConfig.transform.x, gameObjectConfig.transform.y)
      }

      if (gameObjectConfig.transform.rotation != null)
      {
        gameObject.transform.rotator = Rotator.angle(gameObjectConfig.transform.rotation)
      }

      if (gameObjectConfig.transform.sx != null && gameObjectConfig.transform.sy != null)
      {
        gameObject.transform.scale = new Vector2(gameObjectConfig.transform.sx, gameObjectConfig.transform.sy)
      }
      if (gameObjectConfig.transform.z != null)
      {
        gameObject.transform.z = gameObjectConfig.transform.z
      }
    }

    let componentsConfig = gameObjectConfig.components
    componentsConfig.forEach
    (
      (componentConfig) =>
      {
        let componentInstance = this._buildComponent(componentConfig)
        gameObject.addComponent(componentInstance)
      }
    )

    let childrenConfig = gameObjectConfig.children
    childrenConfig.forEach
    (
      (childConfig) =>
      {
        let childInstance = this._buildObject(childConfig)
        childInstance.transform.attachParent(gameObject.transform, false)
      }
    )

    return gameObject
  }

  _buildComponent (componentConfig)
  {
    let component = componentConfig.instance

    for (let prop in componentConfig)
    {
      if (prop !== 'instance')
      {
        component[prop] = componentConfig[prop]
      } else
      {
        //pass
      }
    }
    return component
  }

  getResourcePath (src)
  {

    if (src.startsWith('http'))
    {
      return src
    } else if (src.startsWith('/'))
    {
      return this._resourceDir + src
    } else
    {
      return this._resourceDir + '/' + src
    }
  }

  static get instance ()
  {
    if (ResourceManager._instance != null)
    {
      return ResourceManager._instance
    } else
    {
      ResourceManager._instance = new ResourceManager()
      return ResourceManager._instance
    }
  }

  shutdown ()
  {

  }

}
