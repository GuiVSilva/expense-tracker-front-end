import { Link } from 'react-router'
import { Wallet, Mail, KeyRound, Lock, ShieldCheck } from 'lucide-react'
import { StepIndicator } from './StepIndicator'

export const BrandingSection = ({ step }) => {
  const getStepIcon = () => {
    switch (step) {
      case 'email':
        return <Mail className="w-10 h-10 text-chart-4" />
      case 'code':
        return <KeyRound className="w-10 h-10 text-primary" />
      case 'password':
        return <Lock className="w-10 h-10 text-accent" />
      case 'success':
        return <ShieldCheck className="w-10 h-10 text-primary" />
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 'email':
        return (
          <>
            Recupere sua <span className="text-chart-4">conta</span>
          </>
        )
      case 'code':
        return (
          <>
            Verifique sua <span className="text-primary">identidade</span>
          </>
        )
      case 'password':
        return (
          <>
            Crie uma <span className="text-accent">nova senha</span>
          </>
        )
      case 'success':
        return (
          <>
            Senha <span className="text-primary">redefinida</span>
          </>
        )
      default:
        return null
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 'email':
        return 'Informe o e-mail vinculado a sua conta e enviaremos um codigo de verificacao para redefinir sua senha.'
      case 'code':
        return 'Enviamos um codigo de 6 digitos para o seu e-mail. Insira o codigo para continuar com a recuperacao.'
      case 'password':
        return 'Escolha uma senha forte e segura para proteger sua conta e suas informacoes financeiras.'
      case 'success':
        return 'Sua senha foi alterada com sucesso. Agora voce pode acessar sua conta normalmente.'
      default:
        return ''
    }
  }

  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-card via-background to-card">
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-chart-4/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
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

      {/* Conteudo */}
      <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Wallet className="w-7 h-7 text-primary" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            ExpenseTracker
          </span>
        </Link>

        <div className="mb-12">
          <div className="w-20 h-20 bg-card border border-border rounded-2xl flex items-center justify-center mb-8">
            {getStepIcon()}
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            {getStepTitle()}
          </h1>

          <p className="text-lg text-muted-foreground max-w-md text-pretty">
            {getStepDescription()}
          </p>
        </div>

        {/* Indicador de etapas */}
        <StepIndicator currentStep={step} />
      </div>
    </div>
  )
}
