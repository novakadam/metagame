"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

interface RegisterFormProps {
  onRegister: (userData: { email: string; firstName: string; lastName: string; phone: string }) => void
  onCancel: () => void
}

export function RegisterForm({ onRegister, onCancel }: RegisterFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [createAccount, setCreateAccount] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("A jelszavak nem egyeznek")
      return
    }

    if (password.length < 6) {
      setError("A jelszonak legalabb 6 karakter hosszunak kell lennie")
      return
    }

    setIsLoading(true)
    
    // Simulate registration - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    onRegister({
      email,
      firstName: "",
      lastName: "",
      phone: ""
    })
    
    setIsLoading(false)
  }

  return (
    <div className="bg-card p-5 mb-4 section-depth animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-foreground">Gyors regisztracio</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reg-email" className="text-xs uppercase tracking-wider text-muted-foreground">
            E-mail cim
          </Label>
          <Input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="pelda@email.com"
            required
            className="h-10 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reg-password" className="text-xs uppercase tracking-wider text-muted-foreground">
              Jelszo
            </Label>
            <Input
              id="reg-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-10 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-confirm" className="text-xs uppercase tracking-wider text-muted-foreground">
              Jelszo megerositese
            </Label>
            <Input
              id="reg-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-10 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="flex items-start gap-3">
          <Checkbox
            id="reg-create"
            checked={createAccount}
            onCheckedChange={(checked) => setCreateAccount(checked === true)}
            className="mt-0.5 border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-sm"
          />
          <Label htmlFor="reg-create" className="text-sm font-normal text-foreground cursor-pointer">
            Fiok letrehozasa a rendeleshez
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !createAccount}
          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-sm"
        >
          {isLoading ? "Regisztracio..." : "Regisztracio es vasarlas folytatasa"}
        </Button>
      </form>
    </div>
  )
}
