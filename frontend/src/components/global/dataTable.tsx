"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserDetailsModal } from "@/components/global/userModal"

// This would typically come from your database
const users = [
  {
    id: "LB01",
    name: "john samual",
    email: "john@gmail.com",
    createdAt: "12/03/2023",
    status: "Active",
    imageUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "LB02",
    name: "peter adam",
    email: "peter@gmail.com",
    createdAt: "12/03/2023",
    status: "Blocked",
    imageUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "LB03",
    name: "abraham philip",
    email: "jabraham@gmail.com",
    createdAt: "12/03/2023",
    status: "Active",
    imageUrl: "/placeholder.svg?height=32&width=32",
  },
]

export default function DataTable() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <Table >
        <TableHeader className="bg-muted/50 ">
          <TableRow className="hover:bg-transparent ">
            <TableHead className="w-[100px] text-center">No</TableHead>
            <TableHead className="text-center">User name</TableHead>
            <TableHead className="text-center">email</TableHead>
            <TableHead className="text-center">CreatedAt</TableHead>
            <TableHead className="text-center">status</TableHead>
            <TableHead className="text-center">Participants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="bg-card hover:bg-muted/50 dark:hover:bg-muted/50"
            >
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-yellow-500">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    user.status === "Active"
                      ? " text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <UserDetailsModal user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

