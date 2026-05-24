"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { CartItem, DeliveryMethod } from "@/app/page"

interface OrderSummaryProps {
  items: CartItem[]
  onQuantityChange: (id: string, quantity: number) => void
  subtotal: number
  shipping: number
  total: number
  deliveryMethod: DeliveryMethod
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("hu-HU").format(price) + " Ft"
}

export function OrderSummary({
  items,
  onQuantityChange,
  subtotal,
  shipping,
  total,
  deliveryMethod,
}: OrderSummaryProps) {
  return (
    <div className="bg-card card-gold overflow-hidden rounded-sm">
      {/* Header */}
      <div className="p-6 bg-burgundy-lighter/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif text-foreground">Rendelés</h2>
          <span className="text-sm text-muted-foreground">{items.length} termék</span>
        </div>
      </div>

      {/* Items */}
      <div className="p-5 space-y-4 max-h-[360px] overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            {/* Image - larger with shadow */}
            <div className="relative w-[88px] h-[88px] flex-shrink-0 overflow-hidden rounded-sm shadow-lg shadow-black/40">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              {item.stock <= 5 && (
                <div className="absolute top-1 left-1 bg-warning text-warning-foreground text-[10px] px-1.5 py-0.5 font-medium rounded-sm">
                  Még {item.stock} db
                </div>
              )}
            </div>

            {/* Details - simplified */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="text-sm font-medium text-foreground truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
              </div>

              {/* Quantity & Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                    className="w-7 h-7 bg-burgundy-deep flex items-center justify-center hover:bg-burgundy-light transition-colors rounded-sm"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className={cn(
                      "w-7 h-7 bg-burgundy-deep flex items-center justify-center transition-colors rounded-sm",
                      item.quantity >= item.stock
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-burgundy-light"
                    )}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-lg font-semibold text-primary tabular-nums">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="p-6 bg-burgundy-deep space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Részösszeg</span>
          <span className="text-foreground">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Szállítás</span>
          <span className={cn(shipping === 0 ? "text-success" : "text-foreground")}>
            {shipping === 0 ? "Ingyenes" : formatPrice(shipping)}
          </span>
        </div>

        <div className="h-px bg-border/30 my-4" />

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Végösszeg</span>
          <span className="text-3xl font-bold text-primary price-large">
            {formatPrice(total)}
          </span>
        </div>

        {/* Warning */}
        {deliveryMethod === "klub" && items.some(item => !item.availableKlub) && (
          <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-sm mt-4">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-destructive">
              Egyes termékek nem érhetők el a Klubban. Kérjük válassz másik átvételi módot.
            </p>
          </div>
        )}

        {/* CTA */}
        <Link href="/payment">
          <Button 
            className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg mt-4 btn-glow rounded-sm"
          >
            Fizetés
          </Button>
        </Link>

        <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
          Folytatom a vásárlást
        </button>
      </div>
    </div>
  )
}
