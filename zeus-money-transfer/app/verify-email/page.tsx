"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      router.push("/")
    } else {
      setEmail(userEmail)
    }
  }, [router])

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === "123456") {
      setIsVerified(true)
      setTimeout(() => {
        router.push("/verify-phone")
      }, 2000)
    }
  }

  const resendCode = () => {
    alert("Verification code sent to your email!")
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
            <p className="text-gray-300">Redirecting to phone verification...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Button variant="ghost" onClick={() => router.push("/")} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <CardTitle className="text-white">Verify Your Email</CardTitle>
            <CardDescription className="text-gray-300">We've sent a 6-digit code to {email}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-white">
                  Verification Code
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-400 text-center">Demo code: 123456</p>
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Verify Email
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={resendCode}
                className="w-full text-gray-300 hover:bg-white/10"
              >
                Resend Code
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
