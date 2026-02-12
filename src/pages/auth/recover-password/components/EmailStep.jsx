import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowRight } from 'lucide-react'

export const EmailStep = ({
  email,
  setEmail,
  emailError,
  setEmailError,
  isLoading,
  onSubmit
}) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(email)
  }

  return (
    <>
      <div className="text-center lg:text-left mb-8">
        <div className="w-14 h-14 bg-chart-4/10 rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
          <Mail className="w-7 h-7 text-chart-4" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Esqueceu a senha?
        </h2>
        <p className="text-muted-foreground">
          Informe seu e-mail para receber o codigo de recuperacao
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                setEmailError('')
              }}
              className={`h-12 bg-card border-border focus:border-chart-4 pl-12 ${
                emailError ? 'border-destructive' : ''
              }`}
              required
            />
          </div>
          {emailError && (
            <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
              {emailError}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!email || !isValidEmail || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Enviando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Enviar codigo
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </Button>
      </form>
    </>
  )
}
