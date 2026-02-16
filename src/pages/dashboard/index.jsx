import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Target,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react'

const mockBalance = {
  total: 12450.0,
  income: 8500.0,
  expenses: 3250.0,
  percentChange: 12.5
}

const mockTransactions = [
  {
    id: 1,
    description: 'Salário',
    category: 'Renda',
    amount: 5500.0,
    type: 'income',
    date: '2026-02-01',
    icon: TrendingUp
  },
  {
    id: 2,
    description: 'Supermercado Extra',
    category: 'Alimentação',
    amount: 450.0,
    type: 'expense',
    date: '2026-02-02',
    icon: CreditCard
  },
  {
    id: 3,
    description: 'Freelance Design',
    category: 'Renda Extra',
    amount: 1200.0,
    type: 'income',
    date: '2026-02-01',
    icon: TrendingUp
  },
  {
    id: 4,
    description: 'Netflix',
    category: 'Entretenimento',
    amount: 55.9,
    type: 'expense',
    date: '2026-02-01',
    icon: CreditCard
  }
]

const mockGoals = [
  { id: 1, name: 'Reserva de Emergência', current: 8000, target: 15000 },
  { id: 2, name: 'Viagem', current: 3500, target: 5000 }
]

const mockCategories = [
  { name: 'Alimentação', amount: 850, color: 'bg-destructive', percent: 26 },
  { name: 'Transporte', amount: 520, color: 'bg-accent', percent: 16 },
  { name: 'Contas', amount: 780, color: 'bg-chart-5', percent: 24 }
]

export const Dashboard = () => {
  const { user } = useAuth()

  const formatCurrency = value => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    })
  }

  return (
    <div className="space-y-8">
      {/* 1. Saudação */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Bem-vindo de volta,{' '}
          <span className="font-semibold text-primary">
            {user?.name?.split(' ')[0] || 'Usuário'}
          </span>
          !
        </p>
      </div>

      {/* 2. Grid de Cards Superiores (Resumo Financeiro) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Saldo Total */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-medium">
                Saldo Total
              </span>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              {formatCurrency(mockBalance.total)}
            </div>
            <div className="flex items-center gap-1 text-sm text-primary">
              <ArrowUpRight className="w-4 h-4" /> +{mockBalance.percentChange}%
              este mês
            </div>
          </CardContent>
        </Card>

        {/* Receitas */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-medium">
                Receitas
              </span>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              {formatCurrency(mockBalance.income)}
            </div>
            <div className="text-sm text-muted-foreground">Entradas do mês</div>
          </CardContent>
        </Card>

        {/* Despesas */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-medium">
                Despesas
              </span>
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              {formatCurrency(mockBalance.expenses)}
            </div>
            <div className="text-sm text-destructive flex items-center gap-1">
              <ArrowDownRight className="w-4 h-4" /> -3.1% vs mês anterior
            </div>
          </CardContent>
        </Card>

        {/* Economia */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-medium">
                Economia
              </span>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              {formatCurrency(mockBalance.income - mockBalance.expenses)}
            </div>
            <div className="text-sm text-accent font-medium">
              61.8% da receita poupado
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Seção Inferior: Transações e Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da Esquerda: Transações Recentes */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-foreground">
              Transações Recentes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
            >
              Ver todas <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.map(transaction => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.type === 'income' ? 'bg-emerald-500/10' : 'bg-destructive/10'}`}
                    >
                      <transaction.icon
                        className={`w-5 h-5 ${transaction.type === 'income' ? 'text-emerald-500' : 'text-destructive'}`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {transaction.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-bold ${transaction.type === 'income' ? 'text-emerald-500' : 'text-destructive'}`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}{' '}
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coluna da Direita: Widgets Auxiliares */}
        <div className="space-y-6">
          {/* Gastos por Categoria */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-semibold text-foreground">
                Categorias
              </CardTitle>
              <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${category.color}`}
                      />
                      <span className="text-muted-foreground">
                        {category.name}
                      </span>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(category.amount)}
                    </span>
                  </div>
                  <Progress value={category.percent} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Metas Ativas */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-semibold">
                Metas de Economia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockGoals.map(goal => {
                const progress = (goal.current / goal.target) * 100
                return (
                  <div
                    key={goal.id}
                    className="p-3 rounded-lg border border-border bg-secondary/20"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] bg-primary/10 text-primary border-none"
                      >
                        {progress.toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-1.5 mb-2" />
                    <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                      <span>{formatCurrency(goal.current)}</span>
                      <span>{formatCurrency(goal.target)}</span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
