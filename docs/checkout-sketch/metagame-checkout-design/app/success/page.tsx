import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, MapPin, Clock, Mail, CreditCard, Package } from "lucide-react"
import { CheckoutHeader } from "@/components/checkout/checkout-header"
import { DecorativeFrame } from "@/components/checkout/decorative-frame"
import { Button } from "@/components/ui/button"

// Mock order data
const ORDER = {
  orderNumber: "#MG-2026-10482",
  email: "kovacs.janos@email.com",
  paymentMethod: "Bankkartya",
  deliveryMethod: "Szemelyes atvetel - Metagame Bolt",
  pickup: {
    name: "Metagame Bolt",
    address: "1132 Budapest, Kadar utca 10.",
    hours: "H-SZ 10-18",
  },
  items: [
    {
      id: "1",
      name: "Riftbound: Viktor",
      subtitle: "Origins Champion Deck",
      price: 12358,
      quantity: 1,
      image: "/images/products/riftbound-viktor-deck.png",
    },
    {
      id: "2",
      name: "Riftbound TCG",
      subtitle: "Origins Booster Display (24 pack)",
      price: 12800,
      quantity: 2,
      image: "/images/products/riftbound-origins-display.png",
    },
    {
      id: "3",
      name: "Magic: Edge of Eternities",
      subtitle: "Play Boosters Display",
      price: 24900,
      quantity: 1,
      image: "/images/products/magic-eternities-boosters.png",
    },
  ],
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("hu-HU", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " Ft"
}

export default function SuccessPage() {
  const subtotal = ORDER.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal // No shipping for pickup

  return (
    <div className="min-h-screen bg-background relative">
      <DecorativeFrame />
      
      {/* Header */}
      <CheckoutHeader />
      
      <div className="relative z-10">
        {/* Back link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vissza a fooldala</span>
          </Link>
        </div>
        
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Success Icon & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 border border-success/30 mb-6">
              <Check className="w-8 h-8 text-success" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-serif font-medium text-foreground mb-2">
              Sikeres rendeles
            </h1>
            <p className="text-muted-foreground">
              Koszonjuk, a rendelesedet rogzitettuk.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-card rounded-sm p-6 mb-6">
            <div className="space-y-4">
              {/* Order Number */}
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Rendelésszam</p>
                  <p className="text-foreground font-medium">{ORDER.orderNumber}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Visszaigazolas elkuldve</p>
                  <p className="text-foreground">{ORDER.email}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Fizetesi mod</p>
                  <p className="text-foreground">{ORDER.paymentMethod}</p>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Atvetel modja</p>
                  <p className="text-foreground">{ORDER.deliveryMethod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Information */}
          <div className="bg-card-elevated rounded-sm p-6 mb-6 border border-border-gold/30">
            <h2 className="text-lg font-serif font-medium text-foreground mb-4">
              Atveteli informacio
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">{ORDER.pickup.name}</p>
                  <p className="text-muted-foreground">{ORDER.pickup.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Nyitvatartas</p>
                  <p className="text-foreground">{ORDER.pickup.hours}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border/30">
              Ertesitunk, amint a rendelesed atveheto.
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-sm p-6 mb-8">
            <h2 className="text-lg font-serif font-medium text-foreground mb-4">
              Rendeles osszegzese
            </h2>
            
            {/* Products */}
            <div className="space-y-4 mb-6">
              {ORDER.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-sm shadow-lg shadow-black/40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">{item.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">Mennyiseg: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-border/30 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Reszosszeg</span>
                <span className="text-foreground tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Szallitas</span>
                <span className="text-foreground">Ingyenes</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border/30">
                <span className="text-foreground font-medium">Vegosszeg</span>
                <span className="text-xl font-bold text-primary tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Button 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold btn-glow"
              asChild
            >
              <Link href="#">Rendeles reszletei</Link>
            </Button>
            <Button 
              variant="outline"
              className="w-full h-12 border-border hover:border-primary hover:bg-primary/5"
              asChild
            >
              <Link href="/">Vissza a vasarlashoz</Link>
            </Button>
            <div className="text-center">
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Uj megjelenések bongeszese
              </Link>
            </div>
          </div>

          {/* Trust / Reassurance */}
          <div className="mt-8 pt-6 border-t border-border/30 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              A rendelesed statuszat e-mailben is elkuldtuk.
            </p>
            <p className="text-sm text-muted-foreground">
              Kerdes eseten keresd ugyfelszolgalatunkat.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>&copy; metagame 2026</p>
              <div className="flex items-center gap-8">
                <a href="#" className="hover:text-primary transition-colors">ASZF</a>
                <a href="#" className="hover:text-primary transition-colors">Adatvedelem</a>
                <a href="#" className="hover:text-primary transition-colors">Informacio</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
