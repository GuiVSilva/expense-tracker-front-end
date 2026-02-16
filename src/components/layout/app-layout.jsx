import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import {
  Wallet,
  Home,
  CreditCard,
  PieChart,
  Target,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/AuthContext'

export const AppLayout = () => {1
  const { user, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: CreditCard, label: 'Transações', href: '/transactions' }
    // { icon: PieChart, label: 'Relatórios', href: '/relatorios' },
    // { icon: Target, label: 'Metas', href: '/metas' },
    // { icon: Settings, label: 'Configurações', href: '/configuracoes' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Botão de menu flutuante - apenas no mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
        aria-label="Abrir menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay para mobile quando o menu está aberto */}
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
          {/* Header do Sidebar */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sidebar-primary/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-sidebar-primary" />
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

          {/* Navegação */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setSidebarOpen(false)} // Fecha o menu ao clicar em um link
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Perfil do usuário */}
          <div className="p-4 border-t border-sidebar-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-sidebar-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-sidebar-primary" />
                  </div>
                  <div className="flex-1 text-left overflow-hidden">
                    <div className="font-medium text-sidebar-foreground truncate">
                      {user?.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" /> Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" /> Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={signOut}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal - sem header */}
      <div className="lg:pl-64">
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
