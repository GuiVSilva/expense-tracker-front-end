import {
  Tag,
  Utensils,
  Car,
  Tv,
  Zap,
  ShoppingCart,
  Briefcase,
  Gift,
  Heart,
  GraduationCap,
  Smartphone
} from 'lucide-react'

export const categoryIcons = {
  Alimentacao: Utensils,
  Transporte: Car,
  Entretenimento: Tv,
  Contas: Zap,
  Compras: ShoppingCart,
  Saude: Heart,
  Educacao: GraduationCap,
  Tecnologia: Smartphone,
  Renda: Briefcase,
  'Renda Extra': Gift
}

export const categoryColors = {
  Alimentacao: 'bg-accent/15 text-accent border-accent/30',
  Transporte: 'bg-chart-4/15 text-chart-4 border-chart-4/30',
  Entretenimento: 'bg-chart-5/15 text-chart-5 border-chart-5/30',
  Contas: 'bg-destructive/15 text-destructive border-destructive/30',
  Compras: 'bg-accent/15 text-accent border-accent/30',
  Saude: 'bg-destructive/15 text-destructive border-destructive/30',
  Educacao: 'bg-chart-4/15 text-chart-4 border-chart-4/30',
  Tecnologia: 'bg-chart-5/15 text-chart-5 border-chart-5/30',
  Renda: 'bg-primary/15 text-primary border-primary/30',
  'Renda Extra': 'bg-primary/15 text-primary border-primary/30'
}

export const getCategoryIcon = category => {
  return categoryIcons[category] || Tag
}
