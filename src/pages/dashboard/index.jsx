import { useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Bell,
  Search,
  Menu,
  X,
  Home,
  CreditCard,
  PieChart,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Target,
  Calendar,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

// Dados mockados
const mockUser = {
  name: 'João Silva',
  email: 'joao@email.com',
  avatar: null
}

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
  },
  {
    id: 5,
    description: 'Conta de Luz',
    category: 'Contas',
    amount: 280.0,
    type: 'expense',
    date: '2026-01-30',
    icon: CreditCard
  },
  {
    id: 6,
    description: 'Uber',
    category: 'Transporte',
    amount: 45.0,
    type: 'expense',
    date: '2026-01-29',
    icon: CreditCard
  }
]

const mockGoals = [
  { id: 1, name: 'Reserva de Emergência', current: 8000, target: 15000 },
  { id: 2, name: 'Viagem', current: 3500, target: 5000 },
  { id: 3, name: 'Novo Notebook', current: 2100, target: 4500 }
]

const mockCategories = [
  { name: 'Alimentação', amount: 850, color: 'bg-destructive', percent: 26 },
  { name: 'Transporte', amount: 520, color: 'bg-accent', percent: 16 },
  { name: 'Entretenimento', amount: 380, color: 'bg-chart-4', percent: 12 },
  { name: 'Contas', amount: 780, color: 'bg-chart-5', percent: 24 },
  { name: 'Outros', amount: 720, color: 'bg-muted-foreground', percent: 22 }
]

export const Dashboard = () => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  console.log('user', user)
  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    {
      icon: CreditCard,
      label: 'Transações',
      href: '/transacoes',
      active: false
    },
    { icon: PieChart, label: 'Relatórios', href: '/relatorios', active: false },
    { icon: Target, label: 'Metas', href: '/metas', active: false },
    {
      icon: Settings,
      label: 'Configurações',
      href: '/configuracoes',
      active: false
    }
  ]

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
    <div className="min-h-screen bg-background">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">
                ExpenseTracker
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-sidebar-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-sidebar-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-sidebar-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sidebar-foreground">
                      {mockUser.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {mockUser.email}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-foreground"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Bem-vindo de volta, {mockUser.name.split(' ')[0]}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex bg-transparent"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="relative bg-transparent"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Nova Transação</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Cards de resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Saldo Total */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
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
                  <ArrowUpRight className="w-4 h-4" />+
                  {mockBalance.percentChange}% este mês
                </div>
              </CardContent>
            </Card>

            {/* Receitas */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Receitas
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {formatCurrency(mockBalance.income)}
                </div>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <ArrowUpRight className="w-4 h-4" />
                  +8.2% vs mês anterior
                </div>
              </CardContent>
            </Card>

            {/* Despesas */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Despesas
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {formatCurrency(mockBalance.expenses)}
                </div>
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <ArrowDownRight className="w-4 h-4" />
                  -3.1% vs mês anterior
                </div>
              </CardContent>
            </Card>

            {/* Economia */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Economia
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {formatCurrency(mockBalance.income - mockBalance.expenses)}
                </div>
                <div className="flex items-center gap-1 text-sm text-accent">
                  <ArrowUpRight className="w-4 h-4" />
                  61.8% da receita
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transações Recentes */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Transações Recentes
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  Ver todas
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map(transaction => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            transaction.type === 'income'
                              ? 'bg-primary/10'
                              : 'bg-destructive/10'
                          }`}
                        >
                          <transaction.icon
                            className={`w-5 h-5 ${
                              transaction.type === 'income'
                                ? 'text-primary'
                                : 'text-destructive'
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold ${
                            transaction.type === 'income'
                              ? 'text-primary'
                              : 'text-destructive'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sidebar direita */}
            <div className="space-y-6">
              {/* Gastos por Categoria */}
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Gastos por Categoria
                  </CardTitle>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCategories.map((category, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${category.color}`}
                            />
                            <span className="text-sm text-foreground">
                              {category.name}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {formatCurrency(category.amount)}
                          </span>
                        </div>
                        <Progress value={category.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Metas */}
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Minhas Metas
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Plus className="w-4 h-4 mr-1" />
                    Nova
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockGoals.map(goal => {
                      const progress = (goal.current / goal.target) * 100
                      return (
                        <div
                          key={goal.id}
                          className="p-4 rounded-lg bg-secondary/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground">
                              {goal.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary"
                            >
                              {progress.toFixed(0)}%
                            </Badge>
                          </div>
                          <Progress value={progress} className="h-2 mb-2" />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{formatCurrency(goal.current)}</span>
                            <span>{formatCurrency(goal.target)}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Próximos pagamentos */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Próximos Pagamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                      <div>
                        <div className="font-medium text-foreground">
                          Aluguel
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Vence em 3 dias
                        </div>
                      </div>
                      <div className="text-destructive font-semibold">
                        {formatCurrency(1500)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
                      <div>
                        <div className="font-medium text-foreground">
                          Internet
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Vence em 7 dias
                        </div>
                      </div>
                      <div className="text-accent font-semibold">
                        {formatCurrency(120)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <div>
                        <div className="font-medium text-foreground">
                          Cartão de Crédito
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Vence em 12 dias
                        </div>
                      </div>
                      <div className="text-foreground font-semibold">
                        {formatCurrency(890)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
