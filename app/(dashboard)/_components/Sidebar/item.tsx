"use client"

import Image from "next/image"

import {
    useOrganization,
    useOrganizationList
} from "@clerk/nextjs"

import {cn} from "@/lib/utils"

interface ItemProps {
    id:string,
    name:string,
    imgUrl:string
}
import React from 'react'
import Hint from "@/components/Hint"

const Item = ({id,name,imgUrl}:ItemProps) => {

    const {organization} = useOrganization();
    const {setActive} = useOrganizationList();

    const isActive = organization?.id === id;

    const onClick = () => {
        if(!setActive) return

        setActive({organization:id})
    }

  return (
    <div className="aspect-square relative">
        <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image 
        fill
        src={imgUrl}
        onClick={onClick}
        alt={name}
        className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
        )}
        />
        </Hint>
      
    </div>
  )
}

export default Item
