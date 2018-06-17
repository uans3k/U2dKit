export default class UObject
{
  constructor ()
  {
    var len = arguments.length
    var ctor = 'this.constructor' + len
    var js = ''
    js += 'if(' + ctor + ')\n'
    js += '{\n'
    js += ctor + '.apply(this,arguments)\n'
    js += '}'
    eval(js)
  }

  getClassName ()
  {
    if (this.constructor && this.constructor.toString())
    {

      if (this.constructor.name)
      {
        return this.constructor.name
      }
      var str = this.constructor.toString()
      /*
       * executed if the return of object.constructor.toString() is
       * "[object objectClass]"
       */
      if (str.charAt(0) == '[')
      {
        var arr = str.match(/\[\w+\s*(\w+)\]/)
      } else
      {
        /*
         * executed if the return of object.constructor.toString() is
         * "function objectClass () {}"
         * for IE Firefox
         */
        var arr = str.match(/function\s*(\w+)/)
      }
      if (arr && arr.length == 2)
      {
        return arr[1]
      }
    }
    return undefined
  };

  static getInstance (jspath, className)
  {
    import('../' + jspath).then
    (
      _ =>
      {
        return eval('new ' + className + '()')
      }
    )
    // var clazz = require('../' + jspath)
  }

  isType (type)
  {
    return this instanceof type
  }

  getType ()
  {
    return this.constructor
  }
}