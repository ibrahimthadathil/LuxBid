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

interface User {
  id: string
  name: string
  email: string
  createdAt: string
  status: string
  imageUrl: string
}

interface UserDetailsModalProps {
  user: User
}

export function UserDetailsModal({ user }: UserDetailsModalProps) {
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
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">User ID</p>
              <p className="text-sm text-muted-foreground">{user.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Created At</p>
              <p className="text-sm text-muted-foreground">{user.createdAt}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

