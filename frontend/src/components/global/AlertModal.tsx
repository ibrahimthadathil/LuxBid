import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/Button"
import { Tcategory } from "@/types/user"
import React from "react"
interface categoryProps{
  contents:string|React.ReactNode[],category:Tcategory,style?:string,action:Function
}  
  export function AlertModal({contents,style,action,category}:categoryProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='ghost' className={style}>{contents[0]}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            {contents[1]}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-500 hover:cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>action(category._id)}>Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  