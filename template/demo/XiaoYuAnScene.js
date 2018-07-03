import GameObject      from '../../u2dkit/RunTime/Base/GameObject.js'
import SpriteRenderer  from '../../u2dkit/RunTime/Render/Sprite/SpriteRenderer.js'
import Rect            from '../../u2dkit/RunTime/Shape/Rect.js'
import Camera          from '../../u2dkit/RunTime/Canvas/Camera.js'
import RectCollider    from '../../u2dkit/RunTime/Physic/RectCollider.js'
import PointBehavior   from './PointBehavior.js'
import RecycleBehavior from './RecycleBehavior.js'
import TextRenderer    from '../../u2dkit/RunTime/Render/Text/TextRenderer.js'
import Vector2         from '../../u2dkit/RunTime/Math/Vector2.js'
import RootBehavior    from './RootBehavior.js'
import MapBehavior     from './MapBehavior.js'

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
        },
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
              {
                'instance': new SpriteRenderer(),
                'imgUrl': 'map.png',
                'rect': new Rect(0, 0, 610, 460)
              },
              {
                'instance': new RectCollider(),
                'rect': new Rect(0, 0, 610, 460),
                'targetLayers': []
              },
              {
                'instance': new MapBehavior()
              }
            ],
          'children':
            [
              {
                'instance': new GameObject(),
                'name': 'point3',
                'tag': 'point',
                'transform':
                  {
                    'x':100,
                    'y': 100,
                    'rotation': 0,
                    'sx': 1,
                    'sy': 1,
                    'z': 5
                  },
                'components':
                  [
                    {
                      'instance': new TextRenderer(),
                      'text': '萧哥是个大蛇皮',
                      'anchor': new Vector2(0, -30)
                    },
                    {
                      'instance': new SpriteRenderer(),
                      'imgUrl': 'point.png',
                      'rect': new Rect(-10, -10, 20, 20)
                    },
                    {
                      'instance': new RectCollider(),
                      'rect': new Rect(-10, -10, 20, 20),
                      'targetLayers': [1, 2]
                    },
                    {
                      'instance': new PointBehavior()
                    }
                  ],
                'children':
                  []
              },

            ]
        },
        {
          'instance': new GameObject(),
          'name': 'mapCamera',
          'transform':
            {
              'x': 0,
              'y': 0,
              'rotation': 0,
              'sx': 1,
              'sy': 1
            },
          'components':
            [
              {
                'instance': new Camera(),
                'depth': 1
              },
            ],
          'children':
            []
        },
        {
          'instance': new GameObject(),
          'name': 'recycle',
          'transform':
            {
              'x': 34.5,
              'y': 510.5,
              'rotation': 0,
              'sx': 1,
              'sy': 1,
              'z': 2
            },
          'components':
            [
              {
                'instance': new SpriteRenderer(),
                'imgUrl': 'recycle.png',
                'rect': new Rect(-34.5, -34.5, 69, 69)
              },
              {
                'instance': new RectCollider(),
                // 'targetLayers': [1, 2],
                'rect': new Rect(-34.5, -34.5, 69, 69)
              },
              {
                'instance': new RecycleBehavior()
              }
            ],
          'children':
            []
        },
        {
          'instance': new GameObject(),
          'name': 'plus',
          'layer': 1,
          'transform':
            {
              'x': 592,
              'y': 493.25,
              'rotation': 0,
              'sx': 1,
              'sy': 1,
              'z': 2
            },
          'components':
            [
              {
                'instance': new SpriteRenderer(),
                'imgUrl': 'plus.png',
                'rect': new Rect(-18, -17.25, 36, 34.5)
              },
              {
                'instance': new RectCollider(),
                'rect': new Rect(-18, -17.25, 36, 34.5),
                'targetLayers': []
              },
              {
                'instance': new RecycleBehavior()
              }
            ],
          'children':
            []
        },
        {
          'instance': new GameObject(),
          'name': 'minus',
          'transform':
            {
              'x': 592,
              'y': 527.75,
              'rotation': 0,
              'sx': 1,
              'sy': 1,
              'z': 2
            },
          'components':
            [
              {
                'instance': new SpriteRenderer(),
                'imgUrl': 'minus.png',
                'rect': new Rect(-18, -17.25, 36, 34.5)
              },
              {
                'instance': new RectCollider(),
                'rect': new Rect(-18, -17.25, 36, 34.5),
                'targetLayers': []
              },
              {
                'instance': new RecycleBehavior()
              }
            ],
          'children':
            []
        }
      ]
  }

export default XiaoYuAnScene