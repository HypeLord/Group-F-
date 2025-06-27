"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Receipt,
  Download,
  Share2,
  CheckCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  CreditCard,
  Hash,
} from "lucide-react"

interface Transaction {
  id: number
  type: "sent" | "received" | "deposit"
  amount: number
  from: string
  to: string
  date: string
  time: string
  status: string
  method: string
  reference: string
}

interface TransactionReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function TransactionReceiptModal({ isOpen, onClose, transaction }: TransactionReceiptModalProps) {
  if (!transaction) return null

  const downloadReceipt = () => {
    const receiptContent = `
FINTECH - TRANSACTION RECEIPT
========================================

Transaction Reference: ${transaction.reference}
Date: ${transaction.date}
Time: ${transaction.time}
Status: ${transaction.status.toUpperCase()}

Transaction Details:
-------------------
Type: ${transaction.type.toUpperCase()}
Amount: $${transaction.amount.toFixed(2)}
From: ${transaction.from}
To: ${transaction.to}
Method: ${transaction.method}

Thank you for using Fintech!
For support, contact: support@fintech-app.com
    `.trim()

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `zeus-receipt-${transaction.reference}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const shareReceipt = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Fintech Transaction Receipt",
          text: `Transaction ${transaction.reference} - $${transaction.amount.toFixed(2)} ${transaction.type}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `Fintech Transaction Receipt\nRef: ${transaction.reference}\nAmount: $${transaction.amount.toFixed(2)}\nStatus: ${transaction.status}`
      navigator.clipboard.writeText(shareText)
      alert("Receipt details copied to clipboard!")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Receipt className="mr-2 h-5 w-5 text-yellow-400" />
            Transaction Receipt
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Receipt for transaction {transaction.reference}
          </DialogDescription>
        </DialogHeader>

        <Card className="bg-slate-800 border-slate-600">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div
                className={`p-4 rounded-full ${
                  transaction.status === "completed"
                    ? "bg-green-500/20 text-green-400"
                    : transaction.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }`}
              >
                {transaction.status === "completed" ? (
                  <CheckCircle className="h-8 w-8" />
                ) : transaction.type === "received" || transaction.type === "deposit" ? (
                  <ArrowDownLeft className="h-8 w-8" />
                ) : (
                  <ArrowUpRight className="h-8 w-8" />
                )}
              </div>
            </div>
            <CardTitle className="text-white text-2xl mb-2">
              {transaction.type === "received" || transaction.type === "deposit" ? "+" : "-"}$
              {transaction.amount.toFixed(2)}
            </CardTitle>
            <Badge
              variant="secondary"
              className={`${
                transaction.status === "completed"
                  ? "bg-green-500/20 text-green-400"
                  : transaction.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >
              {transaction.status.toUpperCase()}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            <Separator className="bg-slate-600" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <Hash className="h-4 w-4 mr-2" />
                  <span className="text-sm">Reference</span>
                </div>
                <span className="text-white font-mono text-sm">{transaction.reference}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Date</span>
                </div>
                <span className="text-white text-sm">{transaction.date}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Time</span>
                </div>
                <span className="text-white text-sm">{transaction.time}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="text-sm">Method</span>
                </div>
                <span className="text-white text-sm">{transaction.method}</span>
              </div>
            </div>

            <Separator className="bg-slate-600" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">From:</span>
                <span className="text-white text-sm">{transaction.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">To:</span>
                <span className="text-white text-sm">{transaction.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Type:</span>
                <span className="text-white text-sm capitalize">{transaction.type}</span>
              </div>
            </div>

            <Separator className="bg-slate-600" />

            <div className="flex space-x-2">
              <Button
                onClick={downloadReceipt}
                variant="outline"
                className="flex-1 border-slate-600 text-white hover:bg-slate-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                onClick={shareReceipt}
                variant="outline"
                className="flex-1 border-slate-600 text-white hover:bg-slate-700"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={onClose} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Close Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
