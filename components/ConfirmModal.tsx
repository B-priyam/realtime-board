"use client"

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"


interface confirmModalProps {
    children : React.ReactNode
    onConfirm :()=>void
    disable?: boolean
    header :string,
    description?: string,

}

const ConfirmModal = ({children,onConfirm,disable,header,description}:confirmModalProps) => {

    const onHandleConfirm = () =>{
        onConfirm()
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>
                {header}
            </AlertDialogTitle>
            <AlertDialogDescription>
                {description}
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction
            disabled={disable}
            onClick={onHandleConfirm}
            >
                Confirm
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>

    </AlertDialog>
)

}

export default ConfirmModal