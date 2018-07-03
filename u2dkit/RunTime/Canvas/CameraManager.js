import Manager  from '../Base/Manager.js'
import LinkList from '../DataStructure/LinkList.js'

export default class CameraManager extends Manager
{

  startup ()
  {
    CameraManager._instance = this
    this._cameraList = new LinkList()
  }

  static get instance ()
  {
    if (CameraManager._instance != null)
    {
      return CameraManager._instance
    } else
    {
      CameraManager._instance = new CameraManager()
      return CameraManager._instance
    }
  }

  shutdown ()
  {

  }

  /**
   *
   * @return {LinkList}
   */
  get cameraList ()
  {
    return this._cameraList
  }

  /**
   *
   * @param {LinkList} value
   */
  set cameraList (value)
  {
    this._cameraList = value
  }
}

