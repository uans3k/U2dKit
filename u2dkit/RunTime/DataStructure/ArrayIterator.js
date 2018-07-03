import Iterator               from './Iterator.js'
import DataStructureException from './DataStructureException.js'

export default class ArrayIterator extends Iterator
{

  constructor (array)
  {
    super()
    this._index = 0
    this._array = array
  }

  begin ()
  {
    this._index = 0
    return this._array[this._index]
  }

  hasNotEnd ()
  {
    return this._index < this._array.length
  }

  next ()
  {
    if (this._index < this._array.length - 1)
    {
      this._index += 1
      return this._array[this._index]
    } else
    {
      this._index = this._array.length
      return this._array[this._array.length - 1]
    }
  }
}