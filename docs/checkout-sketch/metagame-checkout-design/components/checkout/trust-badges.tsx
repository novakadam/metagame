import { Shield, RotateCcw, Award } from "lucide-react"

const TRUST_ITEMS = [
  {
    icon: Award,
    title: "15 éve a piacon",
    description: "Megbízható TCG kereskedő",
  },
  {
    icon: RotateCcw,
    title: "30 napos visszaküldés",
    description: "Egyszerű visszaküldési folyamat",
  },
  {
    icon: Shield,
    title: "Biztonságos fizetés",
    description: "SSL titkosított tranzakciók",
  },
]

export function TrustBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {TRUST_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className="flex items-center gap-3 p-4 bg-burgundy-deep/60 rounded-sm"
          >
            <div className="w-9 h-9 bg-primary/10 flex items-center justify-center flex-shrink-0 rounded-sm">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
