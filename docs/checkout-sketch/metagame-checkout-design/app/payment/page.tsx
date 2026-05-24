"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Lock, CreditCard, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CheckoutHeader } from "@/components/checkout/checkout-header"
import { DecorativeFrame } from "@/components/checkout/decorative-frame"

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  // Simulate payment processing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const orderTotal = "62 858 Ft"

  return (
    <div className="min-h-screen bg-background relative">
      <DecorativeFrame />
      
      {/* Header */}
      <CheckoutHeader />
      
      <div className="relative z-10">
        <main className="max-w-lg mx-auto px-4 py-12">
          {/* Payment Card */}
          <div className="bg-card p-8 rounded-sm card-gold">
            {/* Secure badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Biztonságos kapcsolat</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-serif text-center text-foreground mb-2">
              Biztonságos fizetés
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Átirányítunk a bankkártyás fizetési felületre.
            </p>

            {/* Order details */}
            <div className="bg-burgundy-deep p-4 rounded-sm mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Fizetendő összeg</span>
                <span className="text-xl font-semibold text-primary tabular-nums">{orderTotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fizetési mód</span>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-foreground">Bankkártya</span>
                </div>
              </div>
            </div>

            {/* Processing state */}
            {isProcessing && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-foreground font-medium">Fizetés feldolgozása...</p>
                <p className="text-sm text-muted-foreground mt-1">Kérjük, ne zárja be az ablakot</p>
              </div>
            )}

            {/* Complete state */}
            {isComplete && (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <p className="text-foreground font-medium mb-6">Fizetés sikeres!</p>
                
                <Link href="/success">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold btn-glow rounded-sm">
                    Fizetés sikeres – tovább
                  </Button>
                </Link>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border/20">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>PCI DSS</span>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-6">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Vissza a pénztárhoz
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
