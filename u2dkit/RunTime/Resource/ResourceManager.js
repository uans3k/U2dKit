import Manager    from '../Base/Manager.js'
import Game       from '../../Game.js'
import Vector2    from '../Math/Vector2.js'
import Rotator    from '../Math/Rotator.js'
import GameObject from '../Base/GameObject.js'
import LinkList   from '../DataStructure/LinkList.js'

export default class ResourceManager extends Manager
{

  constructor0 ()
  {
    this._resourceDir = null
    this._cacheImgList = new LinkList()
    this._cacheNumber = 32
  }

  startup ()
  {
    this._resourceDir = Game.instance.projectConfig.resourceDir
    if (Game.instance.projectConfig.cacheNumber !== null)
    {
      this._cacheNumber = Game.instance.projectConfig.cacheNumber
    } else
    {
      //pass
    }
  }

  loadImage (src, callback)
  {
    src = this.getResourcePath(src)

    let cacheImg = this._cacheImgList.choose
    (
      (img) =>
      {
        if (img.src === src)
        {
          return true
        } else
        {
          return false
        }
      }
    )

    if (cacheImg !== null)
    {
      this._cacheImgList.deleteElement(cacheImg)
      this._cacheImgList.pushTail(cacheImg)

      return callback(cacheImg.img)
    } else
    {
      if (this._cacheImgList.length > this._cacheNumber)
      {
        this._cacheImgList.popHead()
      } else
      {
        //pass
      }

      let that = this
      let img = new Image()
      img.src = src
      img.onload = function ()
      {

        let newCacheImg = new CacheImage(src, img)
        that._cacheImgList.pushTail(newCacheImg)

        callback(img)
      }
    }

  }

  loadGameObject (gameObjectConfig)
  {
    return this._buildGameObject(gameObjectConfig)
  }

  _buildGameObject (gameObjectConfig)
  {
    let gameObject = new GameObject()

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
        let componentInstance = this._buildObject(componentConfig)
        gameObject.addComponent(componentInstance)
      }
    )

    let childrenConfig = gameObjectConfig.children
    childrenConfig.forEach
    (
      (childConfig) =>
      {
        let childInstance = this._buildGameObject(childConfig)
        childInstance.transform.attachParent(gameObject.transform)
      }
    )

    return gameObject
  }

  _buildObject (objectConfig)
  {
    let clazz = objectConfig.class
    let object = new clazz()

    for (let key in objectConfig)
    {
      if (key !== 'class')
      {
        let prop = objectConfig[key]
        if (this._isObject(prop))
        {
          object[key] = this._buildObject(prop)
        } else
        {
          object[key] = prop
        }
      } else
      {
        //pass
      }
    }
    return object
  }

  _isObject (prop)
  {
    if
    (
      prop.constructor === String
      ||
      prop.constructor === Number
      ||
      prop.constructor === Array
    )
    {
      return false
    } else
    {
      return true
    }
  }

  getResourcePath (src)
  {
    if (src === null)
    {
      return ''
    }
    else if (src.startsWith('http'))
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

class CacheImage
{
  constructor (src, img)
  {
    this._src = src
    this._img = img
  }

  get src ()
  {
    return this._src
  }

  set src (value)
  {
    this._src = value
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