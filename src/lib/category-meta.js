import {
  Banknote,
  Briefcase,
  Building2,
  Car,
  CircleDollarSign,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  MoreHorizontal,
  PiggyBank,
  Receipt,
  Smartphone,
  Tag,
  Trophy,
  UserRound
} from 'lucide-react'

export const categoryIcons = {
  Moradia: Home,
  Alimentação: Receipt,
  Transporte: Car,
  Saúde: HeartPulse,
  Educação: GraduationCap,
  Lazer: Trophy,
  Aluguel: Building2,
  'Despesas Pessoais': UserRound,
  Impostos: Landmark,
  Salário: Briefcase,
  'Celular/TV/Internet': Smartphone,
  'Renda extra': CircleDollarSign,
  Investimentos: PiggyBank,
  Outros: MoreHorizontal
}

export const categoryColors = {
  Moradia: 'bg-chart-4/15 text-chart-4 border-chart-4/30',
  Alimentação: 'bg-accent/15 text-accent border-accent/30',
  Transporte: 'bg-chart-4/15 text-chart-4 border-chart-4/30',
  Saúde: 'bg-destructive/15 text-destructive border-destructive/30',
  Educação: 'bg-chart-4/15 text-chart-4 border-chart-4/30',
  Lazer: 'bg-chart-5/15 text-chart-5 border-chart-5/30',
  Aluguel: 'bg-destructive/15 text-destructive border-destructive/30',
  'Despesas Pessoais': 'bg-accent/15 text-accent border-accent/30',
  Impostos: 'bg-destructive/15 text-destructive border-destructive/30',
  Salário: 'bg-primary/15 text-primary border-primary/30',
  'Celular/TV/Internet': 'bg-chart-5/15 text-chart-5 border-chart-5/30',
  'Renda extra': 'bg-primary/15 text-primary border-primary/30',
  Investimentos: 'bg-primary/15 text-primary border-primary/30',
  Outros: 'bg-accent/15 text-accent border-accent/30'
}

export const getCategoryIcon = category => categoryIcons[category] || Tag

export const getCategoryColor = category =>
  categoryColors[category] || 'bg-secondary text-foreground border-border'
