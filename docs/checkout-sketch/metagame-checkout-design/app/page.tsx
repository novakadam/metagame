"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, Clock } from "lucide-react"
import { CheckoutHeader } from "@/components/checkout/checkout-header"
import { CustomerForm } from "@/components/checkout/customer-form"
import { DeliveryOptions } from "@/components/checkout/delivery-options"
import { PaymentOptions } from "@/components/checkout/payment-options"
import { ExpressPaymentModal } from "@/components/checkout/express-payment-modal"
import { OrderSummary } from "@/components/checkout/order-summary"
import { TrustBadges } from "@/components/checkout/trust-badges"
import { DecorativeFrame } from "@/components/checkout/decorative-frame"

export type DeliveryMethod = "bolt" | "klub" | "delivery"
export type PaymentMethod = "card" | "cod" | "applepay" | "googlepay"

export interface CartItem {
  id: string
  name: string
  subtitle: string
  price: number
  quantity: number
  image: string
  stock: number
  availableBolt: boolean
  availableKlub: boolean
}

const CART_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Riftbound: Viktor",
    subtitle: "Origins Champion Deck",
    price: 12358,
    quantity: 1,
    image: "/images/products/riftbound-viktor-deck.png",
    stock: 3,
    availableBolt: true,
    availableKlub: false,
  },
  {
    id: "2",
    name: "Riftbound TCG",
    subtitle: "Origins Booster Display (24 pack)",
    price: 12800,
    quantity: 2,
    image: "/images/products/riftbound-origins-display.png",
    stock: 8,
    availableBolt: true,
    availableKlub: true,
  },
  {
    id: "3",
    name: "Magic: Edge of Eternities",
    subtitle: "Play Boosters Display",
    price: 24900,
    quantity: 1,
    image: "/images/products/magic-eternities-boosters.png",
    stock: 25,
    availableBolt: true,
    availableKlub: true,
  },
]

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("bolt")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS)
  const [loggedInUser, setLoggedInUser] = useState<{
    email: string
    firstName: string
    lastName: string
    phone: string
  } | null>(null)
  const [expressPaymentModal, setExpressPaymentModal] = useState<{
    isOpen: boolean
    type: "applepay" | "googlepay"
  }>({ isOpen: false, type: "applepay" })

  const handleLogin = (userData: { email: string; firstName: string; lastName: string; phone: string }) => {
    setLoggedInUser(userData)
  }

  const handleExpressPay = (type: "applepay" | "googlepay") => {
    setExpressPaymentModal({ isOpen: true, type })
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.min(newQuantity, item.stock) } : item
    ))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = deliveryMethod === "delivery" ? 1900 : 0
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-background relative">
      <DecorativeFrame />
      
      {/* Express Payment Modal */}
      <ExpressPaymentModal
        isOpen={expressPaymentModal.isOpen}
        onClose={() => setExpressPaymentModal({ ...expressPaymentModal, isOpen: false })}
        paymentType={expressPaymentModal.type}
        total={total}
        deliveryMethod={deliveryMethod}
      />
      
      {/* Header - Full width, at the very top */}
      <CheckoutHeader />
      
      <div className="relative z-10">
        {/* Info bar - back link, timer, secure badge on same row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            {/* Left - Back link */}
            <Link 
              href="#" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Vissza a kosárhoz</span>
            </Link>
            
            {/* Center - Timer */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-warning">
              <Clock className="w-4 h-4" />
              <span>A kosár tartalma 15 percig foglalva</span>
            </div>
            
            {/* Right - Secure badge */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-success" />
              <span className="hidden sm:inline">Biztonságos fizetés</span>
            </div>
          </div>
        </div>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left column - Forms */}
            <div className="lg:col-span-7 space-y-6">
              <CustomerForm userData={loggedInUser} onLogin={handleLogin} />
              <DeliveryOptions 
                selected={deliveryMethod} 
                onSelect={setDeliveryMethod}
                items={items}
              />
              <PaymentOptions 
                selected={paymentMethod} 
                onSelect={setPaymentMethod}
                onExpressPay={handleExpressPay}
              />
              <TrustBadges />
            </div>

            {/* Right column - Order Summary */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-8">
                <OrderSummary 
                  items={items}
                  onQuantityChange={handleQuantityChange}
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  deliveryMethod={deliveryMethod}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>&copy; metagame 2026</p>
              <div className="flex items-center gap-8">
                <a href="#" className="hover:text-primary transition-colors">ÁSZF</a>
                <a href="#" className="hover:text-primary transition-colors">Adatvédelem</a>
                <a href="#" className="hover:text-primary transition-colors">Információ</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
