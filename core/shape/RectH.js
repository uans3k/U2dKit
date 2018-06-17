class RectH extends Shape
{
  _width = 0.0
  _hight = 0.0

  constructor (minX, minY, width, hight)
  {
    var vectorArray = new Array(4)
    vectorArray[0] = new Vector([minX, minY, 1])
    vectorArray[1] = new Vector([minX + width, minY, 1])
    vectorArray[2] = new Vector([minX, minY + hight, 1])
    vectorArray[3] = new Vector([minX + width, minY + hight, 1])
    super(vectorArray)
    this._width = width
    this._hight = hight
  }

  getWidth ()
  {
    return this._width
  }

  getHight ()
  {
    return this._hight
  }

  getMinX ()
  {
    return this.getVectorArray()[0][0]
  }

  getMaxX ()
  {
    return this.getVectorArray()[1][0]
  }

  getMinY ()
  {
    return this.getVectorArray()[0][1]
  }

  getMaxY ()
  {
    return this.getVectorArray()[3][1]
  }

}
