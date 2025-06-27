"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, User, Shield, Bell, Briefcase, DollarSign, Save } from "lucide-react"

interface PreferencesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  const [activeTab, setActiveTab] = useState("profile")

  // Profile Settings
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [dateOfBirth, setDateOfBirth] = useState("1990-01-01")
  const [address, setAddress] = useState("123 Main St, City, State 12345")

  // Professional Settings
  const [accountType, setAccountType] = useState("personal")
  const [businessName, setBusinessName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [taxId, setTaxId] = useState("")
  const [monthlyVolume, setMonthlyVolume] = useState("")
  const [businessDescription, setBusinessDescription] = useState("")

  // Security Settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(true)

  const handleSave = () => {
    alert("Preferences saved successfully!")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Settings className="mr-2 h-5 w-5 text-yellow-400" />
            Account Preferences
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your account settings and professional preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" />
              Professional
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="mr-1 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-1 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dob" className="text-white">
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-white">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Professional Account Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your account for business use and compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="account-type" className="text-white">
                    Account Type
                  </Label>
                  <Select value={accountType} onValueChange={setAccountType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Account</SelectItem>
                      <SelectItem value="business">Business Account</SelectItem>
                      <SelectItem value="enterprise">Enterprise Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {accountType !== "personal" && (
                  <>
                    <div>
                      <Label htmlFor="business-name" className="text-white">
                        Business Name
                      </Label>
                      <Input
                        id="business-name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter your business name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="business-type" className="text-white">
                        Business Type
                      </Label>
                      <Select value={businessType} onValueChange={setBusinessType}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tax-id" className="text-white">
                          Tax ID / EIN
                        </Label>
                        <Input
                          id="tax-id"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="XX-XXXXXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="monthly-volume" className="text-white">
                          Expected Monthly Volume
                        </Label>
                        <Select value={monthlyVolume} onValueChange={setMonthlyVolume}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-10k">$0 - $10,000</SelectItem>
                            <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                            <SelectItem value="500k+">$500,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="business-description" className="text-white">
                        Business Description
                      </Label>
                      <Textarea
                        id="business-description"
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Describe your business activities..."
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Transaction Limits & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-700 p-3 rounded">
                    <p className="text-gray-400">Daily Limit</p>
                    <p className="text-white font-semibold">
                      {accountType === "personal" ? "$5,000" : accountType === "business" ? "$25,000" : "$100,000"}
                    </p>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <p className="text-gray-400">Monthly Limit</p>
                    <p className="text-white font-semibold">
                      {accountType === "personal" ? "$50,000" : accountType === "business" ? "$500,000" : "Unlimited"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account security and authentication methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Biometric Authentication</Label>
                    <p className="text-sm text-gray-400">Use fingerprint or face recognition</p>
                  </div>
                  <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
                </div>
                <div>
                  <Label htmlFor="session-timeout" className="text-white">
                    Session Timeout (minutes)
                  </Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="bg-slate-800 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Email Notifications</Label>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">SMS Notifications</Label>
                    <p className="text-sm text-gray-400">Receive notifications via text message</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Push Notifications</Label>
                    <p className="text-sm text-gray-400">Receive push notifications on your device</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Transaction Alerts</Label>
                    <p className="text-sm text-gray-400">Get notified for all transactions</p>
                  </div>
                  <Switch checked={transactionAlerts} onCheckedChange={setTransactionAlerts} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-600 text-white hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
