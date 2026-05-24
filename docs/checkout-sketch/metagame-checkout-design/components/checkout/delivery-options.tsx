"use client"

import { useState } from "react"
import { MapPin, Store, Truck, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { DeliveryMethod, CartItem } from "@/app/page"

interface DeliveryOptionsProps {
  selected: DeliveryMethod
  onSelect: (method: DeliveryMethod) => void
  items: CartItem[]
}

const DELIVERY_OPTIONS = [
  {
    id: "bolt" as const,
    label: "Metagame Bolt",
    description: "1132 Budapest, Kádár utca 10.",
    hours: "H-SZ 10-18",
    price: "Ingyenes",
    icon: Store,
  },
  {
    id: "klub" as const,
    label: "Metagame Klub",
    description: "1132 Budapest, Kresz Géza utca 36.",
    hours: "H-P 16-22, SZ 10-18",
    price: "Ingyenes",
    icon: MapPin,
  },
  {
    id: "delivery" as const,
    label: "Házhozszállítás",
    description: "GLS futárszolgálat",
    hours: "1-3 munkanap",
    price: "1 900 Ft",
    icon: Truck,
  },
]

export function DeliveryOptions({ selected, onSelect, items }: DeliveryOptionsProps) {
  const [showAddress, setShowAddress] = useState(selected === "delivery")

  const handleSelect = (method: DeliveryMethod) => {
    onSelect(method)
    setShowAddress(method === "delivery")
  }

  const boltAvailable = items.every(item => item.availableBolt)
  const klubAvailable = items.every(item => item.availableKlub)

  const getAvailability = (method: DeliveryMethod) => {
    if (method === "bolt") return boltAvailable
    if (method === "klub") return klubAvailable
    return true
  }

  return (
    <section className="bg-card p-6 section-depth">
      <h2 className="text-lg font-serif text-foreground mb-6">Átvétel módja</h2>

      <div className="space-y-2">
        {DELIVERY_OPTIONS.map((option) => {
          const isAvailable = getAvailability(option.id)
          const Icon = option.icon
          const isSelected = selected === option.id

          return (
            <button
              key={option.id}
              onClick={() => isAvailable && handleSelect(option.id)}
              disabled={!isAvailable}
              className={cn(
                "w-full flex items-start gap-4 p-4 transition-all text-left rounded-sm",
                isSelected
                  ? "bg-burgundy-lighter option-selected"
                  : "bg-burgundy-deep hover:bg-burgundy-light",
                !isAvailable && "opacity-40 cursor-not-allowed"
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
                </div>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{option.hours}</p>
                
                {option.id !== "delivery" && (
                  <div className="flex items-center gap-1 mt-2">
                    {isAvailable ? (
                      <>
                        <Check className="w-3 h-3 text-success" />
                        <span className="text-xs text-success">Minden termék elérhető</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 text-destructive" />
                        <span className="text-xs text-destructive">Nem minden termék elérhető</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="text-right flex-shrink-0">
                <span className={cn(
                  "text-sm font-medium",
                  option.price === "Ingyenes" ? "text-success" : "text-foreground"
                )}>
                  {option.price}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {showAddress && (
        <div className="mt-6 pt-6 border-t border-border/20 space-y-4">
          <h3 className="text-sm font-medium text-foreground">Szállítási cím</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-xs uppercase tracking-wider text-muted-foreground">
                Irányítószám <span className="text-destructive">*</span>
              </Label>
              <Input
                id="zip"
                placeholder="1234"
                className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="city" className="text-xs uppercase tracking-wider text-muted-foreground">
                Város <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Budapest"
                className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-xs uppercase tracking-wider text-muted-foreground">
              Utca, házszám <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              placeholder="Példa utca 123."
              className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressNote" className="text-xs uppercase tracking-wider text-muted-foreground">
              Megjegyzés a futárnak
            </Label>
            <Input
              id="addressNote"
              placeholder="Pl. kapucsengő, emelet, ajtó"
              className="h-11 bg-burgundy-deep border-0 focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/40 rounded-sm"
            />
          </div>
        </div>
      )}
    </section>
  )
}
