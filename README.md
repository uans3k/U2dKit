# 如何使用
完整示例参考template文件夹

## 配置文件设置


设置canvas组件id,宽高,u2dkit包路径，以及初始场景


参考 /template/ProjectConfig.js

```
const projectConfig = {
  canvasID: 'uans3k',
  designX: 610, 
  designY: 545,
  fps: 60,
  /**
   * the path is related to where load the "Game.js"
   */
  u2dkitDir: '../u2dkit',
  resourceDir: './Resource',
  scenes: Scenes
}
```


## 场景集配置

参考 /template/Scenes.js
```
const Scenes =
  [
    XiaoYuAnScene
  ]
```

## 场景设置

配置场景，一个场景中的实例包含 位置信息（transform）, 组件（components),孩子（children）
通过为实例挂载组件赋予实例功能
```
const XiaoYuAnScene =

  {
    'instance': new GameObject(),
    'name': 'root',
    // "layer": [1],
    // "tag":"root"
    'transform':
      {
        'x': 0,
        'y': 0,
        'rotation': 0,
        'sx': 1,
        'sy': 1,
        'z': 0
      },
    'components':
      [
        {
          'instance': new RootBehavior()
        },
        {
          'instance': new RectCollider(),
          'rect': new Rect(0, 0, 10000, 10000),
          'targetLayers': []
        }
      ],
    'children':
      [
        {
          'instance': new GameObject(),
          'name': 'map',
          'transform':
            {
              'x': 0,
              'y': 0,
              'rotation': 0,
              'sx': 1,
              'sy': 1,
              'z': 1
            },
          'components':
            [
            ],
          'children':
            [
            ]
        }
      ]
  }
```

## 组件介绍

相机,用于最后渲染所使用的相机
```
{
  'instance': new Camera(),
  'depth': 1
}
```

渲染组件，用于完成图形渲染，包考文字和图片
```
 {
   'instance': new SpriteRenderer(),
   'imgUrl': '图片.png',
   'rect': new Rect(-18, -17.25, 36, 34.5)
 }
 -----------------------------------------------------
 {
   'instance': new TextRenderer(),
   'text': '文字内容',
   'anchor': new Vector2(0, -30)
 }
```

碰撞组件，用于碰撞检测
```
 {
   'instance': new RectCollider(),
   'rect': new Rect(-10, -10, 20, 20),
   'targetLayers': [1, 2]
 }
```

脚本，用于编写实例的行为
```
{
   'instance': new SpriteRenderer(),
   'imgUrl': 'minus.png',
   'rect': new Rect(-18, -17.25, 36, 34.5)
}
```


## 生命周期


