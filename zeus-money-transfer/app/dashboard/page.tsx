"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Send,
  Eye,
  EyeOff,
  CreditCard,
  History,
  LogOut,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
} from "lucide-react"
import { AddMoneyModal } from "@/components/add-money-modal"
import { PreferencesModal } from "@/components/preferences-modal"
import { TransactionHistoryModal } from "@/components/transaction-history-modal"

export default function DashboardPage() {
  const [balance, setBalance] = useState(5420.5)
  const [showBalance, setShowBalance] = useState(true)
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [transferType, setTransferType] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "received",
      amount: 250.0,
      from: "John Doe",
      to: userEmail,
      date: "2024-01-15",
      time: "10:30 AM",
      status: "completed",
      method: "Bank Transfer",
      reference: "TXN001250",
    },
    {
      id: 2,
      type: "sent",
      amount: 100.0,
      from: userEmail,
      to: "Jane Smith",
      date: "2024-01-14",
      time: "2:15 PM",
      status: "completed",
      method: "Instant Transfer",
      reference: "TXN002100",
    },
    {
      id: 3,
      type: "received",
      amount: 500.0,
      from: "Mike Johnson",
      to: userEmail,
      date: "2024-01-13",
      time: "9:45 AM",
      status: "completed",
      method: "Standard Transfer",
      reference: "TXN003500",
    },
  ])
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [addMoneyMethod, setAddMoneyMethod] = useState("")
  const [addAmount, setAddAmount] = useState("")
  const [showPreferences, setShowPreferences] = useState(false)
  const [showTransactionHistory, setShowTransactionHistory] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    if (!email) {
      router.push("/")
    } else {
      setUserEmail(email)
    }
  }, [router])

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    if (recipient && amount && transferType) {
      const transferAmount = Number.parseFloat(amount)
      if (transferAmount > balance) {
        alert("Insufficient balance!")
        return
      }

      // Create new transaction record
      const newTransaction = {
        id: transactions.length + 1,
        type: "sent",
        amount: transferAmount,
        from: userEmail,
        to: recipient,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "completed",
        method:
          transferType === "instant"
            ? "Instant Transfer"
            : transferType === "standard"
              ? "Standard Transfer"
              : "International Transfer",
        reference: `TXN${String(Date.now()).slice(-6)}`,
      }

      // Update balance and add transaction
      setBalance((prev) => prev - transferAmount)
      setTransactions((prev) => [newTransaction, ...prev])

      alert(`Successfully transferred $${amount} to ${recipient}`)
      setRecipient("")
      setAmount("")
      setTransferType("")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const handleAddMoney = (amount: string, method: string, details: any) => {
    const amountNum = Number.parseFloat(amount)

    // Create new deposit transaction record
    const newTransaction = {
      id: transactions.length + 1,
      type: "deposit",
      amount: amountNum,
      from: method,
      to: userEmail,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "completed",
      method: method,
      reference: `DEP${String(Date.now()).slice(-6)}`,
    }

    // Update balance and add transaction
    setBalance((prev) => prev + amountNum)
    setTransactions((prev) => [newTransaction, ...prev])

    alert(`Successfully added $${amount} from ${method}`)
    setShowAddMoney(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-yellow-400 mr-2" />
              <h1 className="text-2xl font-bold text-white">Fintech</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{userEmail}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/10">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Card */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Account Balance</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/10"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {showBalance ? `$${balance.toFixed(2)}` : "••••••"}
                </div>
                <p className="text-gray-300 text-sm">Available Balance</p>
                <div className="mt-4 space-y-2">
                  <Button
                    onClick={() => setShowAddMoney(true)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Money
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowTransactionHistory(true)}
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <History className="mr-2 h-4 w-4" />
                    Transaction History
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPreferences(true)}
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transfer Money Card */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Send className="mr-2 h-5 w-5" />
                  Send Money
                </CardTitle>
                <CardDescription className="text-gray-300">Transfer money securely to any account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTransfer} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient" className="text-white">
                        Recipient
                      </Label>
                      <Input
                        id="recipient"
                        placeholder="Email or phone number"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-white">
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        step="0.01"
                        min="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transfer-type" className="text-white">
                      Transfer Type
                    </Label>
                    <Select value={transferType} onValueChange={setTransferType} required>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select transfer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">Instant Transfer (+$2.99)</SelectItem>
                        <SelectItem value="standard">Standard Transfer (1-3 days)</SelectItem>
                        <SelectItem value="international">International Transfer (+$5.99)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                    <Send className="mr-2 h-4 w-4" />
                    Send Money
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <Card className="backdrop-blur-sm bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-300">Your latest money transfers and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
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
                      <div>
                        <p className="text-white font-medium">
                          {transaction.type === "received"
                            ? `From ${transaction.from}`
                            : transaction.type === "deposit"
                              ? `Deposit via ${transaction.from}`
                              : `To ${transaction.to}`}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {transaction.date} at {transaction.time}
                        </p>
                        <p className="text-gray-500 text-xs">Ref: {transaction.reference}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === "received" || transaction.type === "deposit"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {transaction.type === "received" || transaction.type === "deposit" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </p>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 mb-1">
                        {transaction.status}
                      </Badge>
                      <p className="text-gray-400 text-xs">{transaction.method}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <AddMoneyModal isOpen={showAddMoney} onClose={() => setShowAddMoney(false)} onAddMoney={handleAddMoney} />

        <PreferencesModal isOpen={showPreferences} onClose={() => setShowPreferences(false)} />
        <TransactionHistoryModal
          isOpen={showTransactionHistory}
          onClose={() => setShowTransactionHistory(false)}
          transactions={transactions}
          userEmail={userEmail}
        />
      </div>
    </div>
  )
}
