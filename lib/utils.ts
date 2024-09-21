import { camera, Color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "@/types/Canvas"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#DC2626",
  "#D97706",
  "#056996",
  "#7C3AED",
  "#DB2777",
]
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId:number):string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
  e:React.PointerEvent,
  camera:camera
) {
  return {
    x:Math.round(e.clientX - camera.x),
    y:Math.round(e.clientY - camera.y)
  }
}

export function colorToCss (color:Color) {
  return `#${color.r.toString(16).padStart(2,'0')}${color.g.toString(16).padStart(2,'0')}${color.b.toString(16).padStart(2,'0')}`
}

export function resizeBounce(bounds:XYWH,corner:Side,point:Point):XYWH{
  const result =  {
    x:bounds.x,
    y:bounds.y,
    width:bounds.width,
    height:bounds.height
  }

  if((corner & Side.Left) === Side.Left){
    result.x = Math.min(point.x , bounds.x+bounds.width)
    result.width = Math.abs(bounds.x+bounds.width - point.x)
  }
  if((corner & Side.Right) === Side.Right){
    result.x = Math.min(point.x , bounds.x)
    result.width = Math.abs(point.x - bounds.x )
  }
  if((corner & Side.Top) === Side.Top){
    result.y = Math.min(point.y , bounds.y+bounds.height)
    result.height = Math.abs(bounds.y+bounds.height - point.y)
  }
  if((corner & Side.Bottom) === Side.Bottom){
    result.y = Math.min(point.y , bounds.y)
    result.height = Math.abs(point.y - bounds.y)
  }

  return result
}

export function findIntersectingLayersWithRectangle(layerIds:readonly string[],layers:ReadonlyMap<string,Layer>,
a:Point,
b:Point
 ) {
    const rectangle = {
      x: Math.min(a.x,b.x),
      y: Math.min(a.y,b.y),
      width : Math.abs(a.x-b.x),
      height : Math.abs(a.y-b.y)
    }
    const ids = [];
    for(const layerid of layerIds){
      const layer = layers.get(layerid)
      if(layer == null){
        continue
      } 
      const {x,y,height,width} = layer;

      if(rectangle.x + rectangle.width > x && rectangle.x < x+width &&
      rectangle.y + rectangle.height > y &&
      rectangle.y < y + height
      ){
        ids.push(layerid)
      }
    }
    return ids
}

export function getContrastingTextColor(color:Color){
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b

  return luminance > 128 ? "black" : "white"
}

export function penPointsToPathLayer(
  points:number[][],
  color:Color
):PathLayer {
  if(points.length < 2){
    throw new Error("cannot transform points with less than 2 points")
  }
  let left = Number.POSITIVE_INFINITY
  let top = Number.POSITIVE_INFINITY
  let right = Number.NEGATIVE_INFINITY
  let bottom = Number.NEGATIVE_INFINITY

  for(const point of points){
    const [x,y] = point;
    if(left > x){
      left = x
    }
    if(top > y){
      top = y
    }
    if(right < x){
      right = x
    }
    if(bottom < y){
      bottom = y
    }
  }
  return {
    type : LayerType.Path,
    x:left,
    y:right,
    width: right - left,
    height: bottom - top,
    fill:color,
    points:points.map(([x,y,pressure])=>[x-left,y-top,pressure])
  }
}

export function getSvgPathFromStroke (stroke:number[][]){
  if(!stroke.length) return ""

  const d = stroke.reduce(
    (acc,[x0,y0],i,arr)=>{
      const [x1,y1] = arr[(i+1)%arr.length]
      acc.push(x0,y0,(x0+x1)/2,(y0+y1)/2);
      return acc
    },
    ["M",...stroke[0],"Q"]
  )
  d.push("Z");
  return d.join(" ")
}