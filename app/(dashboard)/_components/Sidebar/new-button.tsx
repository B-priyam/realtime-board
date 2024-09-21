"use client"
import { Plus } from "lucide-react"
import { CreateOrganization } from "@clerk/nextjs"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import Hint from "@/components/Hint"


const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
            <Hint label="Create organization" side="right" align="start" sideOffset={18}>
            <button className="bg-white/25 w-full h-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition ">
                <Plus className="text-white"/>
            </button>
            </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization path="/"/>
      </DialogContent>
    </Dialog>
  )
}

export default NewButton
