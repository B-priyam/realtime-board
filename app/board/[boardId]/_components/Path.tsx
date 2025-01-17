import { getSvgPathFromStroke } from "@/lib/utils"
import getStoke from "perfect-freehand"
import React from "react"

interface PathProps {
    x:number,
    y:number,
    points : number[][]
    fill:string,
    onPointerDown?:(e:React.PointerEvent)=>void,
    selectionColor?: string,
    stroke?: string
    
}

export default function Path({fill,points,x,y,onPointerDown,selectionColor,stroke
}:PathProps) {
  return (
    <path 
    className="drop-shadow-md"
    onPointerDown={onPointerDown}
    d={getSvgPathFromStroke(
        getStoke(points,{
            size:16,
            thinning:0.5,
            smoothing:0.5,
            streamline:0.5
        })
    )}
    style={{
        transform :`translate(${x}px,${y}px)`
    }}
    x={0}
    y={0}
    fill={fill}
    stroke={stroke}
    strokeWidth={1}
    />
  )
}
