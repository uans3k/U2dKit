export default class BoolMatrix
{
  constructor (num, isTrue = false)
  {
    this._matrix = new Array(num)
    this._num = num
    for (let i = 0; i < num; i++)
    {
      let line = new Array(num)
      for (let j = 0; j < num; j++)
      {
        line[j] = true
      }
      this._matrix[i] = line
    }
  }

  getValue (i, j)
  {
    return this._matrix[i][j]
  }

  setValue (i, j, bool)
  {
    this._matrix[i][j] = bool
  }
}