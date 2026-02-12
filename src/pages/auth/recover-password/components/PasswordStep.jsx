import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Eye, EyeOff, Check, ArrowRight } from 'lucide-react'

export const PasswordStep = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  onSubmit
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
  const allPasswordChecks = Object.values(passwordChecks).every(Boolean)
  const passwordsMatch = password === confirmPassword && confirmPassword !== ''

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(password)
  }

  return (
    <>
      <div className="text-center lg:text-left mb-8">
        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
          <Lock className="w-7 h-7 text-accent" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Nova senha
        </h2>
        <p className="text-muted-foreground">
          Crie uma senha forte para proteger sua conta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password">Nova senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Crie sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-card border-border focus:border-primary pr-12"
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Repita a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`h-12 bg-card border-border focus:border-primary pr-12 ${
                confirmPassword && !passwordsMatch
                  ? 'border-destructive'
                  : ''
              }`}
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {confirmPassword && !passwordsMatch && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
              As senhas nao coincidem
            </p>
          )}
        </div>

        {/* Validações de senha */}
        <div className="space-y-2.5 p-4 rounded-xl bg-card border border-border">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Requisitos da senha:
          </p>
          {[
            {
              check: passwordChecks.length,
              label: 'Minimo 8 caracteres'
            },
            {
              check: passwordChecks.uppercase,
              label: 'Uma letra maiuscula'
            },
            { check: passwordChecks.number, label: 'Um numero' },
            {
              check: passwordChecks.special,
              label: 'Um caractere especial (!@#$%)'
            }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  item.check
                    ? 'bg-primary text-primary-foreground scale-100'
                    : 'bg-border text-transparent scale-90'
                }`}
              >
                <Check className="w-3 h-3" />
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  item.check
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!allPasswordChecks || !passwordsMatch || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Redefinindo...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Redefinir senha
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </Button>
      </form>
    </>
  )
}