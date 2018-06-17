/**
 *Unlike shape ,region is a shape which axis aligned
 * */

export default class Region
{

  constructor ()
  {
  }

  intersect (region)
  {
    throw  new RegionException('not impl')
  }

  union (region)
  {
    throw  new RegionException('not impl')
  }

  isInsect (region)
  {
    throw  new RegionException('not impl')
  }

}