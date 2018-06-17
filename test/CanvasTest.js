import Matrix2x3  from '../core/math/Matrix2x3.js'
import UObject    from '../core/uobject/uobject.js'


var canvas = document.getElementById('canvas1')
var context = canvas.getContext('2d')

var rotMat = Matrix2x3.rotation(30)
var invMat = rotMat.inverse()

UObject.getInstance('uobject/GameObject.js', GameObject)

// var testClass = new TestClass(10.0)
//
// alert(testClass.getValue())

// context.rect(100, 100, 100, 100)
// context.stroke()
// context.clip()
//
// var cos = Math.cos(30)
// var sin = Math.sin(30)

var array = invMat.getData()

// alert(array)

// context.transform(array[0][0],array[0][1],array[1][0],array[1][1],0,0)

// context.transform(1, 0, 0, 1, 100, 100)

// context.fillStyle = 'green'
// // context.fillRect(0, 0, 150, 150)

var img = new Image()
img.src = './test3.jpeg'

img.onload = function ()
{
  context.save()

  // context.rect(100, 100, 100, 100)
  // context.stroke()
  // context.clip()

  // context.transform(1, 0, 0, 1, 100, 100)

  context.rect(200, 200, 100, 100)
  context.clip()
  context.transform(1, 0, 0, 1, 200, 200)

  context.drawImage(img, 0, 0, 200, 200)
  context.transform(array[0][0], array[0][1], array[1][0], array[1][1], 0, 0)
  context.drawImage(img, 0, 0, 200, 200)

  context.restore()
}


