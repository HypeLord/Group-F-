"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export default function FacialRecognitionPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      router.push("/")
    }
  }, [router])

  const startCamera = async () => {
    try {
      setError("")
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsScanning(true)

      // Simulate facial recognition after 3 seconds
      setTimeout(() => {
        setIsScanning(false)
        setIsVerified(true)
        mediaStream.getTracks().forEach((track) => track.stop())
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }, 3000)
    } catch (err) {
      setError("Camera access denied. Please allow camera permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScanning(false)
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Face Verified!</h2>
            <p className="text-gray-300">Welcome to Zeus Dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Button variant="ghost" onClick={() => router.push("/verify-phone")} className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <Camera className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <CardTitle className="text-white">Facial Recognition</CardTitle>
            <CardDescription className="text-gray-300">
              Complete your identity verification with facial recognition
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 bg-black rounded-lg object-cover"
              />
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="text-center">
                    <div className="animate-pulse">
                      <div className="w-32 h-32 border-4 border-purple-400 rounded-full mx-auto mb-4"></div>
                    </div>
                    <p className="text-white font-semibold">Scanning face...</p>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              {!isScanning ? (
                <Button onClick={startCamera} className="w-full bg-purple-500 hover:bg-purple-600">
                  <Camera className="mr-2 h-4 w-4" />
                  Start Face Scan
                </Button>
              ) : (
                <Button onClick={stopCamera} variant="destructive" className="w-full">
                  Stop Scanning
                </Button>
              )}
            </div>

            <div className="text-xs text-gray-400 text-center space-y-1">
              <p>• Position your face in the center</p>
              <p>• Ensure good lighting</p>
              <p>• Remove glasses if possible</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
