"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Check } from "lucide-react"
import { LoginModal } from "./login-modal"

interface UserData {
  email: string
  firstName: string
  lastName: string
  phone: string
}

interface CustomerFormProps {
  userData?: UserData | null
  onLogin?: (userData: UserData) => void
}

export function CustomerForm({ userData, onLogin }: CustomerFormProps) {
  const [createAccount, setCreateAccount] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  // Auto-fill when user logs in
  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        lastName: userData.lastName || "",
        firstName: userData.firstName || "",
        email: userData.email || "",
        phone: userData.phone || ""
      }))
    }
  }, [userData])

  const handleLoginSuccess = (loginData: UserData) => {
    setShowLoginModal(false)
    onLogin?.(loginData)
  }

  return (
    <>
      <section className="bg-card p-6 section-depth">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-serif text-foreground">Vasarloi adatok</h2>
          {userData && (
            <div className="flex items-center gap-2 text-sm text-success">
              <Check className="w-4 h-4" />
              <span>Bejelentkezve: {userData.email}</span>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-xs uppercase tracking-wider text-muted-foreground">
                Vezeteknev <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Kovacs"
                className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-xs uppercase tracking-wider text-muted-foreground">
                Keresztnev <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Janos"
                className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
              E-mail cim <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="kovacs.janos@example.com"
              className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
            />
            
            {/* Auth options under email - only show when not logged in */}
            {!userData && (
              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-muted-foreground">
                  A rendeles visszaigazolasat erre a cimre kuldjuk
                </p>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Mar van fiokom? Bejelentkezes
                </button>
              </div>
            )}
            {userData && (
              <p className="text-xs text-muted-foreground">
                A rendeles visszaigazolasat erre a cimre kuldjuk
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-muted-foreground">
              Telefonszam <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+36 30 123 4567"
              className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
            />
          </div>

          {/* Account creation checkbox and password fields - only show when not logged in */}
          {!userData && (
            <>
              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="createAccount"
                  checked={createAccount}
                  onCheckedChange={(checked) => setCreateAccount(checked === true)}
                  className="mt-0.5 border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-sm"
                />
                <div>
                  <Label htmlFor="createAccount" className="text-sm font-normal text-foreground cursor-pointer">
                    Szeretnek fiokot letrehozni a rendeleshez
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Gyorsabb vasarlas es rendeleskovetes
                  </p>
                </div>
              </div>

              {/* Password fields - show when create account is checked */}
              {createAccount && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Jelszo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Min. 8 karakter"
                      className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Jelszo megerositese <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Jelszo ujra"
                      className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
      />
    </>
  )
}
