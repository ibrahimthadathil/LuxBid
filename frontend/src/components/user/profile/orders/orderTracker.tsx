"use client"

import { useState } from "react"
import { Check, Package, Truck, Home } from "lucide-react"
import { cn } from "@/lib/utils"

type OrderStatus = "processing" | "shipped" | "delivered"

interface DeliveryTrackerProps {
  currentStatus?: OrderStatus
  processingDate?: Date
  shippedDate?: Date
  deliveredDate?: Date
}

export default function DeliveryTracker({
  currentStatus = "processing",
  processingDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  shippedDate = currentStatus === "processing" ? undefined : new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  deliveredDate = currentStatus === "delivered" ? new Date() : undefined,
}: DeliveryTrackerProps) {
  const steps = [
    {
      id: "processing",
      name: "Processing",
      description: "Your order is being prepared",
      icon: Package,
      date: processingDate,
    },
    {
      id: "shipped",
      name: "Shipped",
      description: "Your order is on the way",
      icon: Truck,
      date: shippedDate,
    },
    {
      id: "delivered",
      name: "Delivered",
      description: "Your order has arrived",
      icon: Home,
      date: deliveredDate,
    },
  ]

  // For demo purposes
  const [status, setStatus] = useState<OrderStatus>(currentStatus)

  // Helper to determine if a step is completed
  const isCompleted = (stepId: string) => {
    if (stepId === "processing") return true
    if (stepId === "shipped") return status === "shipped" || status === "delivered"
    if (stepId === "delivered") return status === "delivered"
    return false
  }

  // Helper to determine if a step is the current one
  const isCurrent = (stepId: string) => {
    return stepId === status
  }

  // Format date to readable string
  const formatDate = (date?: Date) => {
    if (!date) return "Pending"
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Order Status</h2>

      <div className="relative">
        {/* Status steps */}
        <div className="flex flex-col md:flex-row justify-between mb-8 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10 mb-8 md:mb-0">
              {/* Status circle */}
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2",
                  isCompleted(step.id)
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent(step.id)
                      ? "bg-secondary border-primary text-primary"
                      : "bg-background border-muted-foreground text-muted-foreground",
                )}
              >
                {isCompleted(step.id) ? <Check className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
              </div>

              {/* Status text */}
              <div className="mt-3 text-center">
                <h3
                  className={cn(
                    "font-medium",
                    isCompleted(step.id) || isCurrent(step.id) ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                <p className={cn("text-xs mt-1", isCompleted(step.id) ? "text-foreground" : "text-muted-foreground")}>
                  {formatDate(step.date)}
                </p>
              </div>
            </div>
          ))}

          {/* Connecting lines */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted hidden md:block">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: status === "processing" ? "0%" : status === "shipped" ? "50%" : "100%",
              }}
            />
          </div>
        </div>

        {/* Current status message */}
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium text-lg">Current Status</h3>
          <p className="text-muted-foreground">
            {status === "processing" && "Your order is being prepared and will be shipped soon."}
            {status === "shipped" && "Your order is on its way! Track your package for delivery updates."}
            {status === "delivered" && "Your order has been delivered. Enjoy your purchase!"}
          </p>
        </div>
      </div>
    </div>
  )
}