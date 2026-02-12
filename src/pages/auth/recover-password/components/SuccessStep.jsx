import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'

export const SuccessStep = ({ onNavigate }) => {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-foreground mb-3">
        Senha redefinida!
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
        Sua senha foi alterada com sucesso. Use sua nova senha para acessar o
        sistema.
      </p>

      <Button
        onClick={() => onNavigate('/login')}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        <div className="flex items-center gap-2">
          Ir para o login
          <ArrowRight className="w-5 h-5" />
        </div>
      </Button>
    </div>
  )
}
