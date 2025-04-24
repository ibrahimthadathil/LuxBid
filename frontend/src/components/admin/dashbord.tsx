"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, ShoppingCart, DollarSign } from "lucide-react"
import { useRQ } from "@/hooks/userRQ"
import { dashboardData } from "@/service/Api/adminApi"
import Loader from "../global/Loader"

export default function AdminDashboard() {
  const {isLoading,data}= useRQ(dashboardData,'dashboard')
  // Sample data for the dashboard
  const statsData = [
    {
      title: "Total Users",
      value: "12,345",
      icon: Users,
      change: "+12% from last month",
    },
    {
      title: "Total Sales",
      value: "$89,456",
      icon: DollarSign,
      change: "+23% from last month",
    },
    {
      title: "Total Orders",
      value: "5,678",
      icon: ShoppingCart,
      change: "+8% from last month",
    },
  ]

  const topAuctions = [
    { id: 1, name: "Vintage Watch Collection", bids: 45, currentBid: "$12,500", status: "Live" },
    { id: 2, name: "Modern Art Painting", bids: 38, currentBid: "$8,900", status: "Live" },
    { id: 3, name: "Antique Furniture Set", bids: 32, currentBid: "$6,700", status: "Scheduled" },
    { id: 4, name: "Rare Coin Collection", bids: 29, currentBid: "$5,200", status: "Live" },
    { id: 5, name: "Sports Memorabilia", bids: 25, currentBid: "$4,800", status: "Scheduled" },
  ]

  // Update the auctionStatusData for the pie chart
  const auctionStatusData = [
    { name: "Live Auctions", value: 65, fill: "#4f46e5" },
    { name: "Scheduled Auctions", value: 35, fill: "#8b5cf6" },
  ]

  // Update the genderData for the line chart
  const genderData = [
    { month: "Jan", male: 400, female: 240 },
    { month: "Feb", male: 300, female: 290 },
    { month: "Mar", male: 500, female: 380 },
    { month: "Apr", male: 280, female: 390 },
    { month: "May", male: 590, female: 430 },
    { month: "Jun", male: 490, female: 380 },
    { month: "Jul", male: 600, female: 450 },
    { month: "Aug", male: 700, female: 520 },
    { month: "Sep", male: 400, female: 350 },
    { month: "Oct", male: 500, female: 410 },
    { month: "Nov", male: 450, female: 380 },
    { month: "Dec", male: 480, female: 400 },
  ]

  const topSellers = [
    { id: 1, name: "Sarah Johnson", sales: 145, revenue: "$24,500", avatar: "SJ" },
    { id: 2, name: "Michael Chen", sales: 132, revenue: "$21,800", avatar: "MC" },
    { id: 3, name: "Emily Rodriguez", sales: 118, revenue: "$19,200", avatar: "ER" },
    { id: 4, name: "David Kim", sales: 105, revenue: "$17,900", avatar: "DK" },
    { id: 5, name: "Jessica Williams", sales: 98, revenue: "$16,400", avatar: "JW" },
  ]

  // Add this custom 3D pie chart rendering function
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, _index }:any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    isLoading?<Loader/>:<div className="flex flex-col p-4 md:p-6 space-y-6 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>

      {/* First Row - Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Second Row - Top Auctions and Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Auctions Table - 2/3 width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top 5 Auctions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Bids</TableHead>
                  <TableHead>Current Bid</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAuctions.map((auction) => (
                  <TableRow key={auction.id}>
                    <TableCell className="font-medium">{auction.name}</TableCell>
                    <TableCell>{auction.bids}</TableCell>
                    <TableCell>{auction.currentBid}</TableCell>
                    <TableCell>
                      <Badge variant={auction.status === "Live" ? "default" : "secondary"}>{auction.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 3D Pie Chart - 1/3 width */}
        <Card>
          <CardHeader>
            <CardTitle>Auction Status</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={auctionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    innerRadius={30}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {auctionStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.fill}
                        stroke={entry.fill}
                        style={{
                          filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3))",
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Third Row - Gender Line Graph */}
      <Card>
        <CardHeader>
          <CardTitle>User Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={genderData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="male"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Male"
                />
                <Line
                  type="monotone"
                  dataKey="female"
                  stroke="#ec4899"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Female"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Fourth Row - Top Sellers */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Sellers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topSellers.map((seller:any,index:number) => (
                <TableRow key={seller.id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={seller.profile} alt={seller.name} />
                      <AvatarFallback>{seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{seller.name}</span>
                  </TableCell>
                  <TableCell>{seller.auctionCount}</TableCell>
                  <TableCell>{seller.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
