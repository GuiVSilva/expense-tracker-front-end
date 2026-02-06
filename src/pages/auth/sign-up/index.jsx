import { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Eye,
  EyeOff,
  Wallet,
  ArrowRight,
  Check,
  User,
  Mail,
  Lock
} from 'lucide-react'

export const SignUp = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  })

  const passwordRequirements = [
    { text: 'Mínimo 8 caracteres', met: formData.password.length >= 8 },
    { text: 'Uma letra maiúscula', met: /[A-Z]/.test(formData.password) },
    { text: 'Uma letra minúscula', met: /[a-z]/.test(formData.password) },
    { text: 'Um número', met: /[0-9]/.test(formData.password) }
  ]

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    // Simulando cadastro
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Redireciona para o dashboard
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Lado esquerdo - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            to="/"
            className="flex items-center gap-3 mb-8 lg:hidden justify-center"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              ExpenseTracker
            </span>
          </Link>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Crie sua conta
            </h2>
            <p className="text-muted-foreground">
              Comece a controlar suas finanças hoje
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-12 bg-card border-border focus:border-primary pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-12 bg-card border-border focus:border-primary pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Crie uma senha forte"
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="h-12 bg-card border-border focus:border-primary pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password requirements */}
              {formData.password && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-xs ${
                        req.met ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.met ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        {req.met && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value
                    })
                  }
                  className="h-12 bg-card border-border focus:border-primary pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-destructive">
                    As senhas não coincidem
                  </p>
                )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={
                isLoading ||
                !formData.terms ||
                formData.password !== formData.confirmPassword
              }
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Criando conta...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Criar conta
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>

      {/* Lado direito - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-bl from-card via-background to-card">
        {/* Elementos decorativos */}
        <div className="absolute inset-0">
          <div className="absolute top-32 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 left-20 w-96 h-96 bg-chart-4/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-64 h-64 bg-destructive/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Wallet className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              ExpenseTracker
            </span>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            Junte-se a milhares de{' '}
            <span className="text-primary">usuários</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-12 max-w-md text-pretty">
            Crie sua conta em segundos e comece a ter controle total das suas
            finanças pessoais.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">50k+</div>
              <div className="text-sm text-muted-foreground">
                Usuários ativos
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">R$2M+</div>
              <div className="text-sm text-muted-foreground">Gerenciados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chart-4 mb-1">4.9</div>
              <div className="text-sm text-muted-foreground">Avaliação</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border">
            <p className="text-foreground italic mb-4">
              &ldquo;O ExpenseTracker mudou completamente a forma como eu
              gerencio meu dinheiro. Super intuitivo e fácil de usar!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Maria Silva</div>
                <div className="text-sm text-muted-foreground">
                  Empreendedora
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
