import Region from './Region.js'

/**
 * @property {RectH} _rectH
 * */
class RegionRectH extends Region
{

  constructor (minX, minX, width, hight)
  {
    super()
    this._rectH = new RectH(minX, minX, width, hight)
  }

  getMinX ()
  {
    return this._rectH.getMinX()
  }

  getMaxX ()
  {
    return this._rectH.getMaxX()
  }

  getMinY ()
  {
    return this._rectH.getMinY()
  }

  getMaxY ()
  {
    return this._rectH.getMaxY()
  }

  /**
   * @param {RegionRectH} region
   */
  union (region)
  {
    var minX, maxX, minY, maxY

    minX = this.getMinX() < region.getMinX() ? this.getMinX() : region.getMinX()
    maxX = this.getMaxX() > region.getMaxX() ? this.getMaxX() : region.getMaxX()
    minY = this.getMinY() < region.getMinY() ? this.getMinY() : region.getMinY()
    maxY = this.getMaxY() < region.getMaxY() ? this.getMaxY() : region.getMaxY()

    return new RegionRectH(minX, minY, maxX - minX, maxY - minY)
  }

  /**
   *
   * @param {RegionRectH} region
   */
  isInsect (region)
  {

  }

  isInsectVector (vector)
  {
    if (vector.getDimension() >= 2)
    {
      if (vector.getValue(0) < this.getMinX() && vector.getValue(1) > this.getMaxX())
      {
        return true
      }
      else if (vector.getValue(0) > this.getMinX() && vector.getValue(1) > this.getMaxX())
      {

      } else
      {
        throw new RegionException('vector must be 2dH (3d)')
      }
    }
  }

  /**
   *
   * @param matrix
   * @return {RegionRectH}
   */
  transform (matrix)
  {
    var newRect = new RectH(this._rectH.getMinX(), this._rectH.getMinY(), this._rectH.getWidth(), this._rectH.getHight())
    newRect.transfrom(matrix)
    this._rectH = new RectH(this._getBound(newRect))
    return this
  }

  /**
   *
   * @param matrix
   * @return {RegionRectH}
   */

  transformCopy (matrix)
  {
    var newRect = new RectH(this._rectH.getMinX(), this._rectH.getMinY(), this._rectH.getWidth(), this._rectH.getHight())
    newRect.transfrom(matrix)
    return new RegionRectH(this._getBound(newRect))
  }

  _getBound (rectH)
  {
    var vectorArray = rectH.getVectorArray()
    var minX = vectorArray[0][0]
    var maxX = vectorArray[0][0]
    var minY = vectorArray[0][1]
    var maxY = vectorArray[0][1]
    for (var i = 1; i < vectorArray.length; i++)
    {
      minX = this._chooseItem(minX, vectorArray[i][0], true)
      maxX = this._chooseItem(maxX, vectorArray[i][0], false)
      minY = this._chooseItem(minY, vectorArray[i][1], true)
      maxY = this._chooseItem(maxY, vectorArray[i][1], false)
    }
    return minX, minY, maxX - minX, maxY - minY
  }

  _chooseItem (oldItem, newItem, isMin)
  {
    return !((newItem < oldItem) ^ isMin) ? newItem : oldItem
  }
}