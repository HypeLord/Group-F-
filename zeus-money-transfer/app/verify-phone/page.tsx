"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, ArrowLeft, CheckCircle } from "lucide-react"

export default function VerifyPhonePage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState(1)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      router.push("/")
    }
  }, [router])

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber) {
      setStep(2)
    }
  }

  const handleCodeVerification = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === "789012") {
      setIsVerified(true)
      setTimeout(() => {
        router.push("/facial-recognition")
      }, 2000)
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Phone Verified!</h2>
            <p className="text-gray-300">Proceeding to facial recognition...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Button variant="ghost" onClick={() => router.push("/verify-email")} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <Phone className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <CardTitle className="text-white">{step === 1 ? "Add Phone Number" : "Verify Phone Number"}</CardTitle>
            <CardDescription className="text-gray-300">
              {step === 1 ? "Enter your phone number for SMS verification" : `We've sent a code to ${phoneNumber}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                  Send Verification Code
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCodeVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sms-code" className="text-white">
                    SMS Code
                  </Label>
                  <Input
                    id="sms-code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-gray-400 text-center">Demo code: 789012</p>
                </div>
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                  Verify Phone
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-300 hover:bg-white/10"
                >
                  Change Phone Number
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
