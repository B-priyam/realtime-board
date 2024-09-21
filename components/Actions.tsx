"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./ConfirmModal";
import { Button } from "./ui/button";
import { useRenameModel } from "@/store/useRenameModal";

interface ActionProps {
    children :React.ReactNode;
    side?: DropdownMenuContentProps["side"]
    sideOffset?: DropdownMenuContentProps["sideOffset"]
    id:string,
    title:string
}

export const Actions = ({children,side,sideOffset,id,title}:ActionProps)=>{
    const {onOpen} = useRenameModel()

    const onCopyLink = () =>{
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
        .then(()=>toast.success("link copied"))
        .catch(()=>toast.error("failed to copy link"))
    }

    const {mutate,pending} = useApiMutation(api.board.remove)

    const onDelete = ()=> {
        mutate({id})
        .then(()=>toast.success("board deleted"))
        .catch(()=>toast.error("failed to delete board"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset}
            className="w-60"
            onClick={e=>e.stopPropagation()}
            >
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink} >
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={()=>onOpen(id,title)} >
                    <Pencil  className="h-4 w-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal header="delete board ?" description="This will delete the board and all of its contents" disable={pending} onConfirm={onDelete} >
                <Button className="p-3 cursor-pointer text-sm w-full justify-start font-normal "
                variant={"ghost"}
                >
                    <Trash2 className="h-4 w-4 mr-2"/>
                    delete
                </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

