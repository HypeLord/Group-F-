"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Building2, Smartphone, Bitcoin, Banknote, Wallet } from "lucide-react"

interface AddMoneyModalProps {
  isOpen: boolean
  onClose: () => void
  onAddMoney: (amount: string, method: string, details: any) => void
}

export function AddMoneyModal({ isOpen, onClose, onAddMoney }: AddMoneyModalProps) {
  const [amount, setAmount] = useState("")
  const [activeTab, setActiveTab] = useState("bank")

  // Bank Account States
  const [bankAccount, setBankAccount] = useState("")
  const [routingNumber, setRoutingNumber] = useState("")

  // Card States
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  // Crypto States
  const [cryptoType, setCryptoType] = useState("")
  const [walletAddress, setWalletAddress] = useState("")

  // Mobile Money States
  const [mobileProvider, setMobileProvider] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let details = {}
    let methodName = ""

    switch (activeTab) {
      case "bank":
        details = { bankAccount, routingNumber }
        methodName = "Bank Account"
        break
      case "card":
        details = { cardNumber: `****${cardNumber.slice(-4)}`, expiryDate }
        methodName = "Credit/Debit Card"
        break
      case "crypto":
        details = { cryptoType, walletAddress }
        methodName = `${cryptoType} Wallet`
        break
      case "mobile":
        details = { mobileProvider, phoneNumber }
        methodName = `${mobileProvider} Mobile Money`
        break
    }

    onAddMoney(amount, methodName, details)

    // Reset form
    setAmount("")
    setBankAccount("")
    setRoutingNumber("")
    setCardNumber("")
    setExpiryDate("")
    setCvv("")
    setCryptoType("")
    setWalletAddress("")
    setMobileProvider("")
    setPhoneNumber("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Wallet className="mr-2 h-5 w-5 text-yellow-400" />
            Add Money to Fintech Wallet
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose your preferred method to add funds to your account
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="bank" className="flex items-center">
              <Building2 className="mr-1 h-4 w-4" />
              Bank
            </TabsTrigger>
            <TabsTrigger value="card" className="flex items-center">
              <CreditCard className="mr-1 h-4 w-4" />
              Card
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex items-center">
              <Bitcoin className="mr-1 h-4 w-4" />
              Crypto
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center">
              <Smartphone className="mr-1 h-4 w-4" />
              Mobile
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-6">
              <Label htmlFor="amount" className="text-white">
                Amount to Add
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white text-2xl font-bold text-center"
                step="0.01"
                min="1"
                required
              />
            </div>

            <TabsContent value="bank" className="space-y-4">
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building2 className="mr-2 h-5 w-5" />
                    Bank Account Transfer
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Add money directly from your bank account (1-3 business days)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bank-account" className="text-white">
                      Account Number
                    </Label>
                    <Input
                      id="bank-account"
                      placeholder="Enter your account number"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="routing" className="text-white">
                      Routing Number
                    </Label>
                    <Input
                      id="routing"
                      placeholder="9-digit routing number"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      maxLength={9}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="card" className="space-y-4">
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Credit/Debit Card
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Instant transfer with small processing fee
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="card-number" className="text-white">
                      Card Number
                    </Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-white">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-white">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crypto" className="space-y-4">
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Bitcoin className="mr-2 h-5 w-5" />
                    Cryptocurrency
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Convert crypto to USD and add to your wallet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="crypto-type" className="text-white">
                      Cryptocurrency
                    </Label>
                    <Select value={cryptoType} onValueChange={setCryptoType} required>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="litecoin">Litecoin (LTC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="wallet-address" className="text-white">
                      Wallet Address
                    </Label>
                    <Input
                      id="wallet-address"
                      placeholder="Enter your wallet address"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white font-mono text-sm"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mobile" className="space-y-4">
              <Card className="bg-slate-800 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Mobile Money
                  </CardTitle>
                  <CardDescription className="text-gray-400">Add money using mobile money services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mobile-provider" className="text-white">
                      Mobile Money Provider
                    </Label>
                    <Select value={mobileProvider} onValueChange={setMobileProvider} required>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpesa">M-Pesa</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="orange">Orange Money</SelectItem>
                        <SelectItem value="vodacom">Vodacom M-Pesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mobile-phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="mobile-phone"
                      placeholder="+1 (555) 123-4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Banknote className="mr-2 h-4 w-4" />
                Add ${amount || "0.00"}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
