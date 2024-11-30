"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
interface IColumns<T>{
key?:string,
header:string,
render?:(item:T,i:number)=>React.ReactNode
}
interface TableProps<T>{
  data:T[];
  columns:IColumns<T>[];
}
export default function DataTable<T extends Record<string ,any>>({data,columns}:TableProps<T>) {
  console.log('from table');
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <Table >
        <TableHeader className="bg-muted/50 ">
          <TableRow className="hover:bg-transparent ">
            {
              columns.map((e,i)=>(
                <TableHead key={i} className=" text-center">{e.header}</TableHead>
              ))
            }
           
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {
            data.length ? data.map((item,i) => (
              <TableRow
                key={(item as T)._id || i}
                className="bg-card hover:bg-muted/50 dark:hover:bg-muted/50"
              >
                {
                  columns.map((e,i)=>(
                    <TableCell key={i} className="font-medium">{e.render ? e.render(item,i):e.key?item[e.key]:'Not found'}</TableCell>
  
                  ))
                }
                
              </TableRow>
            )) : <TableRow>
            <TableCell colSpan={columns.length} className="h-14 text-center text-yellow-800 ">
             No data available
            </TableCell>
          </TableRow>
          }
        </TableBody>
      </Table>
    </div>
  )
}

