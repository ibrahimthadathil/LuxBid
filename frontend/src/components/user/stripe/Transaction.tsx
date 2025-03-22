
import { useRQ } from "@/hooks/userRQ"
import { getTransactionHistory } from "@/service/Api/userApi"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"

interface Transaction {
  _id: string
  transactionId: string
  amount: number
  paymentType: string
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED"
  auctionId: {
    _id: string
    title: string
  }
  paymentDate: string
}

const Transaction = () => {
  const {data,isLoading} = useRQ(getTransactionHistory,'transaction')
  const navigate =useNavigate()
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "COMPLETED":
      case "REFUNDED":
        return "bg-green-500 hover:bg-green-600"
      case "PENDING":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "FAILED":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    return moment(dateString).format("MMM D, YYYY, h:mm A")
  }

  const formatAmount = (amount: number, status: Transaction["status"]) => {
    const value = status === "REFUNDED" ? amount : -amount
    return value.toFixed(2)
  }

  const calculateTotals = (transactions: Transaction[]) => {
    return transactions.reduce(
      (acc, transaction) => {
        const amount = transaction.status === "REFUNDED" ? transaction.amount : -transaction.amount
        if (amount > 0) {
          acc.credit += amount
        } else {
          acc.debit += Math.abs(amount)
        }
        acc.net += amount
        return acc
      },
      { debit: 0, credit: 0, net: 0 },
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const totals = calculateTotals(data || [])

  return (
    <div className="w-full max-h-full h-full overflow-y-auto flex flex-col gap-6  p-4">
 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">-${totals.debit.toFixed(2) || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${totals.credit.toFixed(2)||0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.net >= 0 ? "text-green-500" : "text-red-500"}`}>
              ${totals.net.toFixed(2)||0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Auction Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
         {data.length>0? data?.map((transaction:Transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{transaction.auctionId.title}</TableCell>
              <TableCell
                className={
                  transaction.status === "REFUNDED" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
                }
              >
                {formatAmount(transaction.amount, transaction.status)}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
              </TableCell>
              <TableCell>{transaction.paymentType}</TableCell>
              <TableCell>{formatDate(transaction.paymentDate)}</TableCell>
            </TableRow>
          )): <TableRow >
            <TableCell colSpan={5} className="h-24 text-center">
              <div className="flex  items-center justify-center gap-4">
                <p>Not committed to any deals. Join Now...</p>
                <Button onClick={() => navigate("/AllDeals")} variant="outline">
                  View Deals
                </Button>
              </div>
            </TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </div>
  )
}

export default Transaction

