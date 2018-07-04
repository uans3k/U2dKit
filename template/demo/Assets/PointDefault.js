import TextRenderer   from '../../../u2dkit/RunTime/Render/Text/TextRenderer.js'
import RectCollider   from '../../../u2dkit/RunTime/Physic/RectCollider.js'
import Rect           from '../../../u2dkit/RunTime/Shape/Rect.js'
import SpriteRenderer from '../../../u2dkit/RunTime/Render/Sprite/SpriteRenderer.js'
import PointBehavior  from '../Script/PointBehavior.js'

let PointDefault = {
  'name': 'point',
  'tag': 'point',
  'transform':
    {
      'x': 100,
      'y': 100,
      'rotation': 0,
      'sx': 1,
      'sy': 1,
      'z': 5
    },
  'components':
    [
      {
        'class': TextRenderer,
        'text': '萧哥是个大蛇皮',
        'x': 0,
        'y': -30
      },
      {
        'class': SpriteRenderer,
        'imgUrl': 'point.png',
        'rect':
          {
            'class': Rect,
            'minX': -10,
            'minY': -10,
            'width': 20,
            'height': 20
          }
      },
      {
        'class': RectCollider,
        'rect':
          {
            'class': Rect,
            'minX': -10,
            'minY': -10,
            'width': 20,
            'height': 20
          },
      },
      {
        'class': PointBehavior
      }
    ],
  'children':
    []
}

export default PointDefault
