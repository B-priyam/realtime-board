"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const EmptyBoards = () => {
  const router = useRouter()
  const {mutate , pending} = useApiMutation(api.board.create)
  const { organization } = useOrganization()
  const onClick = () => {
    if(!organization) return
    mutate({
      orgId: organization.id,
      title:"untitled"
    })
    .then((id)=>{
      toast.success("board created")
      router.push(`/board/${id}`)
    })
    .catch((err)=>{
      toast.error("failed to create board")
    })
  }

  return (
    <div className="h-[100%] flex flex-col items-center justify-normal">
      <Image
      src={"/note.png"}
      height={110}
      width={110}
      alt="Empty"
      />
      <h2 className="text-2xl mt-6 font-semibold  ">
        Create your first Board
      </h2>
      <p className="text-muted-foreground text-sm mt-2 ">
        start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size={"lg"}>
            Create board 
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoards
