import Transform    from '../../RunTime/Base/Transform.js'
import Vector2      from '../../RunTime/Math/Vector2.js'
import Rotator      from '../../RunTime/Math/Rotator.js'
import UObject      from '../../RunTime/Base/UObject.js'
import TouchEvent   from '../../RunTime/Script/TouchEvent.js'
import EventManager from '../../RunTime/Script/EventManager.js'
import LinkList     from '../../RunTime/DataStructure/LinkList.js'

var canvas = document.getElementById('canvas1')
var context = canvas.getContext('2d')

let linkList = new LinkList()

for (let i = 1; i < 30; i++)
{
  linkList.pushTail(Math.round(Math.random() * 20))
}



alert(linkList)

linkList.sort
(
  (left, right) =>
  {
    return left < right
  }
)

alert(linkList)

// var rotMat = MatrixH3x3.rotation(45)
// var scaleMat = MatrixH3x3.scale(0.5, 1.0)

// var transMat = MatrixH3x3.translate(100, 100)
//
// alert(transMat.getData())

// var mat = rotMat.inverse()
//
// alert(mat.getData())

// var scaleMat = Matrix2x2H.scale(0.5, 1)
// alert(scaleMat)
// var rotMat = Matrix2x2H.rotateL(45)
// alert(rotMat)
// var transMat = Matrix2x2H.translate(100, 100)
// alert(transMat)
// var mat = scaleMat.multMatrixL(rotMat).multMatrixL(transMat)
//
// alert(mat)

// const Script = document.createElement('Script')
// Script.type = 'module'
// Script.textContent = 'import Transform from \'../u2dkit/RunTime/Render/Transform.js\''
//
// Script.async = false
//
// document.documentElement.appendChild(Script)

var t1 = new Transform()
var t2 = new Transform()

var scale = new Vector2(0.5, 0.5)
var rotator = new Rotator(Math.PI * 45 / 180)
var trans = new Vector2(100, 100)

// var tt = UObject.newInstance(t1.getClassName())
//
// alert(tt.getClassName())

t1.position = trans
t1.rotator = rotator
t1.scale = scale

var scale2 = new Vector2(0.9, 0.9)
var rotator2 = new Rotator(Math.PI * 45 / 180)
var trans2 = new Vector2(200, 200)

t2.position = trans2
t2.rotator = rotator2
t2.scale = scale2

// t1.attachParent(t2)
// t1.attachParent(null)
// t2.attachParent(t1)
// t2.attachParent(null)

// t1.multScale(1, 0.5)
// t2.attachParent(null)
// t2.attachParent(t1)
var mat1 = t1.getLocalToWorldMatrix()

// alert(mat1)

var mat2 = t2.getLocalToWorldMatrix()

// alert(mat2)

// var invMat = rotMat.inverse()

// alert(rotMat.getData())
// alert(scaleMat.getData())
// alert(mat.getData())

// var tt = new StaticTest()

// UObject.getInstance('Base/GameObject.js', GameObject)

// var testClass = new TestClass(10.0)
//
// alert(testClass.getValue())

// context.rect(100, 100, 100, 100)
// context.stroke()
// context.clip()
//
// var cos = Math.cos(30)
// var sin = Math.sin(30)

// var array = mat.getData()

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

  // context.rect(200, 200, 100, 100)
  // context.clip()

  context.transform(mat1.m11, mat1.m12, mat1.m21, mat1.m22, mat1.dx, mat1.dy)
  context.drawImage(img, 0, 0, 100, 100)

  context.restore()

  context.save()

  context.transform(mat2.m11, mat2.m12, mat2.m21, mat2.m22, mat2.dx, mat2.dy)
  context.drawImage(img, 0, 0, 100, 100)

  // context.drawImage(img, 0, 0, 100, 100)

  context.restore()
}

function importModule (url)
{
  return new Promise((resolve, reject) =>
  {
    const script = document.createElement('Script')
    const tempGlobal = '__tempModuleLoadingVariable' +
      Math.random().toString(32).substring(2)
    script.type = 'module'
    script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m;`

    script.onload = () =>
    {
      resolve(window[tempGlobal])
      delete window[tempGlobal]
      script.remove()
    }

    script.onerror = () =>
    {
      reject(new Error('Failed to load module Script with URL ' + url))
      delete window[tempGlobal]
      script.remove()
    }

    document.documentElement.appendChild(script)
  })
}