import SpriteRenderer  from '../../../u2dkit/RunTime/Render/Sprite/SpriteRenderer.js'
import Rect            from '../../../u2dkit/RunTime/Shape/Rect.js'
import Camera          from '../../../u2dkit/RunTime/Canvas/Camera.js'
import RectCollider    from '../../../u2dkit/RunTime/Physic/RectCollider.js'
import RootBehavior    from '../Script/RootBehavior.js'
import MapBehavior     from '../Script/MapBehavior.js'
import RecycleBehavior from '../Script/RecycleBehavior.js'
import PlusBehavior    from '../Script/PlusBehavior.js'
import MinusBehavior   from '../Script/MinusBehavior.js'

const XiaoYuAnScene =
  {
    'name': 'root',
    // "layer": 1,
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
          'class': RootBehavior
        },
        {
          'class': RectCollider,
          'rect':
            {
              'class': Rect,
              'minX': 0,
              'minY': 0,
              'width': 10000,
              'height': 10000
            },
          'targetLayers': []
        },
      ],
    'children':
      [
        {
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
                'class': SpriteRenderer,
                'rect':
                  {
                    'class': Rect,
                    'minX': 0,
                    'minY': 0,
                    'width': 610,
                    'height': 460
                  }
              },
              {
                'class': RectCollider,
                'rect':
                  {
                    'class': Rect,
                    'minX': 0,
                    'minY': 0,
                    'width': 610,
                    'height': 460
                  },
                'targetLayers': []
              },
              {
                'class': MapBehavior
              }
            ],
          'children':
            []
        },
        {
          'name': 'mainCamera',
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
                'class': Camera,
                'depth': 1
              },
            ],
          'children':
            []
        },
        {
          'name': 'recycle',
          'transform':
            {
              'x': 54.5,
              'y': 405.5,
              'rotation': 0,
              'sx': 1,
              'sy': 1,
              'z': 2
            },
          'components':
            [
              {
                'class': SpriteRenderer,
                'imgUrl': 'recycle.png',
                'rect':
                  {
                    'class': Rect,
                    'minX': -34.5,
                    'minY': -34.5,
                    'width': 69,
                    'height': 69
                  }
              },
              {
                'class': RectCollider,
                // 'targetLayers': [1, 2],
                'rect':
                  {
                    'class': Rect,
                    'minX': -34.5,
                    'minY': -34.5,
                    'width': 69,
                    'height': 69
                  }
              },
              {
                'class': RecycleBehavior
              }
            ],
          'children':
            []
        },
        {
          'name': 'plus',
          'layer': 1,
          'transform':
            {
              'x': 573,
              'y': 388.25,
              'rotation': 0,
              'sx': 1,
              'sy': 1,
              'z': 2
            },
          'components':
            [
              {
                'class': SpriteRenderer,
                'imgUrl': 'plus.png',
                'rect':
                  {
                    'class': Rect,
                    'minX': -18,
                    'minY': -17.25,
                    'width': 36,
                    'height': 34.5
                  }

              },
              {
                'class': RectCollider,
                'rect':
                  {
                    'class': Rect,
                    'minX': -18,
                    'minY': -17.25,
                    'width': 36,
                    'height': 34.5
                  },
                'targetLayers': []
              },
              {
                'class': PlusBehavior
              }
            ],
          'children':
            []
        },
        {
          'name': 'minus',
          'transform':
            {
              'x': 573,
              'y': 422.75,
              'rotation': 0,
              'sx': 1,
              'sy': 1,
              'z': 2
            },
          'components':
            [
              {
                'class': SpriteRenderer,
                'imgUrl': 'minus.png',
                'rect':
                  {
                    'class': Rect,
                    'minX': -18,
                    'minY': -17.25,
                    'width': 36,
                    'height': 34.5
                  },
              },
              {
                'class': RectCollider,
                'rect':
                  {
                    'class': Rect,
                    'minX': -18,
                    'minY': -17.25,
                    'width': 36,
                    'height': 34.5
                  },
                'targetLayers': []
              },
              {
                'class': MinusBehavior
              }
            ],
          'children':
            []
        }
      ]
  }

export default XiaoYuAnScene