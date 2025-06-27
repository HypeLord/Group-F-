"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { History, ArrowDownLeft, ArrowUpRight, Download, Filter, Search, DollarSign } from "lucide-react"

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

interface TransactionHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  transactions: Transaction[]
  userEmail: string
}

export function TransactionHistoryModal({ isOpen, onClose, transactions, userEmail }: TransactionHistoryModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.method.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus

    const matchesDate = (!dateFrom || transaction.date >= dateFrom) && (!dateTo || transaction.date <= dateTo)

    return matchesSearch && matchesType && matchesStatus && matchesDate
  })

  // Calculate totals
  const totalSent = transactions.filter((t) => t.type === "sent").reduce((sum, t) => sum + t.amount, 0)

  const totalReceived = transactions
    .filter((t) => t.type === "received" || t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0)

  const exportTransactions = () => {
    const csvContent = [
      ["Date", "Time", "Type", "Amount", "From", "To", "Method", "Status", "Reference"],
      ...filteredTransactions.map((t) => [
        t.date,
        t.time,
        t.type,
        t.amount.toString(),
        t.from,
        t.to,
        t.method,
        t.status,
        t.reference,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `zeus-transactions-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <History className="mr-2 h-5 w-5 text-yellow-400" />
            Transaction History
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete record of all your transactions and account activity
          </DialogDescription>
        </DialogHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Sent</p>
                  <p className="text-red-400 text-2xl font-bold">-${totalSent.toFixed(2)}</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Received</p>
                  <p className="text-green-400 text-2xl font-bold">+${totalReceived.toFixed(2)}</p>
                </div>
                <ArrowDownLeft className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Net Balance</p>
                  <p
                    className={`text-2xl font-bold ${
                      (totalReceived - totalSent) >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ${(totalReceived - totalSent).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800 border-slate-600 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-lg">
              <Filter className="mr-2 h-4 w-4" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search" className="text-white text-sm">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Reference, name, method..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="type-filter" className="text-white text-sm">
                  Type
                </Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status-filter" className="text-white text-sm">
                  Status
                </Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date-from" className="text-white text-sm">
                  From Date
                </Label>
                <Input
                  id="date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="date-to" className="text-white text-sm">
                  To Date
                </Label>
                <Input
                  id="date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-400 text-sm">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </p>
              <Button
                onClick={exportTransactions}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction List */}
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white">All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No transactions found matching your criteria</p>
                </div>
              ) : (
                filteredTransactions.map((transaction, index) => (
                  <div key={transaction.id}>
                    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "received" || transaction.type === "deposit"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transaction.type === "received" || transaction.type === "deposit" ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-white font-medium">
                              {transaction.type === "received"
                                ? `From ${transaction.from}`
                                : transaction.type === "deposit"
                                  ? `Deposit via ${transaction.from}`
                                  : `To ${transaction.to}`}
                            </p>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                transaction.type === "sent"
                                  ? "bg-red-500/20 text-red-400"
                                  : transaction.type === "received"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {transaction.type.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>
                              {transaction.date} at {transaction.time}
                            </span>
                            <span>•</span>
                            <span>{transaction.method}</span>
                            <span>•</span>
                            <span className="font-mono">Ref: {transaction.reference}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold text-lg ${
                            transaction.type === "received" || transaction.type === "deposit"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.type === "received" || transaction.type === "deposit" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </p>
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
                      </div>
                    </div>
                    {index < filteredTransactions.length - 1 && <Separator className="bg-slate-600" />}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
