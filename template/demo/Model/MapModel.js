import LinkList from '../../../u2dkit/RunTime/DataStructure/LinkList.js'
import Point    from './Point.js'

const MapModel =
  {
    isChange: false,
    mapUrl: 'map_test.png',
    points: new LinkList()
  }

let testP1 = new Point(1, '蛇皮萧哥1号', 100, 100)
let testP2 = new Point(2, '蛇皮萧哥2号', 200, 100)
let testP3 = new Point(3, '蛇皮萧哥3号', 300, 100)

MapModel.points.pushTail(testP1)
MapModel.points.pushTail(testP2)
MapModel.points.pushTail(testP3)

export default MapModel