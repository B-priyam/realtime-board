"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRenameModel } from "@/store/useRenameModal"
import { FormEvent, FormEventHandler, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export const RenameModal = ()=> {
    const {mutate,pending} = useApiMutation(api.board.update)

    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModel()
    const [title,setTitle] = useState(initialValues.title)

    useEffect(()=>{
        setTitle(initialValues.title)
    },[initialValues.title])

    const onSubmit:FormEventHandler<HTMLFormElement> = (e)=> {
        e.preventDefault()
        mutate({
            id:initialValues.id,
            title:title
        })
        .then(()=>{toast.success("board renamed") 
            onClose()})
        .catch((err)=>toast.error("failed to rename board",err.message))
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new Title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                    disabled={false}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Board title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                            type="button"
                            variant={"outline"}
                            >
                                cancel
                            </Button>
                            </DialogClose>
                            <Button
                            disabled={false}
                            type="submit"
                            >
                                Save
                            </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}