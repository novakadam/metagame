"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LoginModal } from "./login-modal"
import { RegisterForm } from "./register-form"

interface AuthSectionProps {
  onLogin: (userData: { email: string; firstName: string; lastName: string; phone: string }) => void
}

export function AuthSection({ onLogin }: AuthSectionProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = (userData: { email: string; firstName: string; lastName: string; phone: string }) => {
    onLogin(userData)
    setShowLogin(false)
  }

  const handleRegister = (userData: { email: string; firstName: string; lastName: string; phone: string }) => {
    onLogin(userData)
    setShowRegister(false)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 mb-2">
        {/* Left - Login */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Van mar fiokod?</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLogin(true)}
            className="text-primary hover:text-primary hover:bg-primary/10 h-8 px-3 rounded-sm"
          >
            Bejelentkezes
          </Button>
        </div>

        {/* Right - Register */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Uj vagy?</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRegister(!showRegister)}
            className="text-primary hover:text-primary hover:bg-primary/10 h-8 px-3 rounded-sm"
          >
            Gyors regisztracio
          </Button>
        </div>
      </div>

      {/* Inline registration form */}
      {showRegister && (
        <RegisterForm 
          onRegister={handleRegister}
          onCancel={() => setShowRegister(false)}
        />
      )}

      {/* Login modal */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </>
  )
}
