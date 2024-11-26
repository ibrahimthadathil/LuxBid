import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/Button"
import { Iuser } from "@/types/user"
interface ModalProps<T>{
  data:T,
  action:Function
}
export function UserDetailsModal<T extends Iuser>({data,action}:ModalProps<T>) {
  return (
    <Dialog>
      <DialogTrigger asChild >
        <Button
          variant="secondary"
          size="sm"
          className="h-7 rounded-md bg-muted px-3 text-xs font-medium"
        >
          view
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={data.profile} alt={data.firstName} className="object-cover"/>
              <AvatarFallback>
                {data.firstName
                  .split(" ")
                  .map((n:string) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{data.firstName}</h3>
              <p className="text-sm text-muted-foreground">{data.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Phone:</p>
              <p className="text-sm text-muted-foreground">{data.phone ? `+91 ${data.phone}`:'Not Added'}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Joined At</p>
              <p className="text-sm text-muted-foreground">{new Date(data.createdAt as Date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status :</p>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  data.isActive 
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.isActive?'Active':'Blocked' }
              </span>
            </div>
            <div>
              <button onClick={()=>action(data.email)} className={`${data.isActive ? 'border border-red-600':'border border-green-600'} ${data.isActive ?'hover:bg-red-600':'hover:bg-green-600'} p-1 px-2 rounded-lg`}>
                {data.isActive ? 'Block':'Active'}  
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

