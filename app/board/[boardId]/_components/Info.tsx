"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import {  useQuery } from "convex/react"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Hint from "@/components/Hint"
import { useRenameModel } from "@/store/useRenameModal"
import { Actions } from "@/components/Actions"
import { Menu } from "lucide-react"



interface InfoProps {
  boardId : string
}

const font = Poppins({
  weight : ["600"],
  subsets: ["latin"]
})

const TabSeperator = () => {
  return (
    <div className="text-neutral-300 px-1.5">|</div>
  )
}

const Info = ({boardId}:InfoProps) => {
  const data = useQuery(api.board.get , {id:boardId as Id<"boards">})
  const {onOpen} = useRenameModel()

  if(!data){
    return <InfoSkeleton/>
  }
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint label="Go to Boards" side="bottom" sideOffset={10}>

        <Button className="px-2 " variant={"board"} asChild>
      <Link href={"/"} >
          <Image 
          src={"/logo.svg"}
          alt="logo"
          height={40}
          width={40}
          />
          <span className={cn("font-semibold text-xl ml-2 text-black",font.className)}>Board</span>
        </Link>
        </Button>
          </Hint>
          <TabSeperator/>
          <Hint label="Edit title" side="bottom" sideOffset={10} >
          <Button variant={"board"} onClick={()=>{onOpen(data._id,data.title)}} className="text-base font-normal px-2">{data.title}</Button>
          </Hint>
          <TabSeperator/>
          <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
              <div>
                <Hint label="Main Menu" side="bottom" sideOffset={10}>
                  <Button size={"icon"} variant={"board"}>
                    <Menu  />
                  </Button>
                </Hint>
              </div>
          </Actions>
    </div>
  )
}

export default Info

export const InfoSkeleton = () => {
    return (
        <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px] '>
        </div>
    )
}