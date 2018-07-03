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

  setProperty (propName,value)
  {
    // if(this[propName])
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
  }

  /**
   * can't use need CommonJS require
   * or add "<Script></Script>"
   *
   * @param className
   * @param args
   * @return {Object}
   */
  static newInstance (classpath, className)
  {
    // let len = arguments.length - 1
    // if (len > 0)
    // {
    //   let args = arguments[1]
    //   for (let i = 1; i < len; i++)
    //   {
    //     args += ','
    //     args += arguments[i + 1]
    //   }
    //   return eval('new ' + className + '(' + args + ')')
    // } else
    // {
    //   return eval('new ' + className + '()')
    // }

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