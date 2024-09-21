import Image from "next/image"
import { CreateOrganization } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent
} from "@/components/ui/dialog"


const EmptyOrg = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center ">
      empty
      <Image src={"/elements.png"} alt="empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6 ">
        welcome to boards
      </h2>
      <p className="text-muted-foreground text-sm mt-2 ">
        Create an organization to get started
      </p>
      <div className="mt-6 "> 
        <Dialog>
            <DialogTrigger asChild className=" ">
                <Button size={"lg"} >Create organization</Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px] ">
                <CreateOrganization/>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default EmptyOrg
