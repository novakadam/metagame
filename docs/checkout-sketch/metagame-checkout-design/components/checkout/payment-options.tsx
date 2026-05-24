"use client"

import { CreditCard, Banknote } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaymentMethod } from "@/app/page"

interface PaymentOptionsProps {
  selected: PaymentMethod
  onSelect: (method: PaymentMethod) => void
  onExpressPay?: (type: "applepay" | "googlepay") => void
}

const PAYMENT_OPTIONS = [
  {
    id: "card" as const,
    label: "Bankkártya",
    description: "Visa, Mastercard, Maestro",
    icon: CreditCard,
  },
  {
    id: "cod" as const,
    label: "Utánvét",
    description: "Fizetés átvételkor készpénzben",
    extra: "+500 Ft",
    icon: Banknote,
  },
]

export function PaymentOptions({ selected, onSelect, onExpressPay }: PaymentOptionsProps) {
  return (
    <section className="bg-card p-6 section-depth">
      <h2 className="text-lg font-serif text-foreground mb-6">Fizetési mód</h2>

      <div className="space-y-2">
        {PAYMENT_OPTIONS.map((option) => {
          const Icon = option.icon
          const isSelected = selected === option.id

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "w-full flex items-start gap-4 p-4 transition-all text-left rounded-sm",
                isSelected
                  ? "bg-burgundy-lighter option-selected"
                  : "bg-burgundy-deep hover:bg-burgundy-light"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                isSelected
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/40"
              )}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon className={cn("w-4 h-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                  <span className="font-medium text-foreground">{option.label}</span>
                  {option.extra && (
                    <span className="text-xs text-muted-foreground">({option.extra})</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              </div>
            </button>
          )
        })}

        {/* Quick pay */}
        <div className="pt-4 mt-4 border-t border-border/20">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Gyors fizetés</p>
          <div className="flex gap-3">
            {/* Apple Pay - Official style: black bg, white text */}
            <button
              onClick={() => {
                onSelect("applepay")
                onExpressPay?.("applepay")
              }}
              className={cn(
                "flex-1 h-12 transition-all flex items-center justify-center gap-1 rounded-sm font-medium",
                selected === "applepay"
                  ? "bg-black ring-2 ring-primary text-white"
                  : "bg-black hover:bg-neutral-900 text-white"
              )}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span>Pay</span>
            </button>
            {/* Google Pay - Official style: white bg, dark text */}
            <button
              onClick={() => {
                onSelect("googlepay")
                onExpressPay?.("googlepay")
              }}
              className={cn(
                "flex-1 h-12 transition-all flex items-center justify-center gap-1.5 rounded-sm font-medium",
                selected === "googlepay"
                  ? "bg-white ring-2 ring-primary text-neutral-800"
                  : "bg-white hover:bg-neutral-100 text-neutral-800"
              )}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Pay</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
