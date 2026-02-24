import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const AccountsHeader = ({ onNew }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contas a Receber/Pagar</h1>
        <p className="text-sm text-muted-foreground">
          Controle vencimentos, pagamentos e recebimentos em uma unica tela.
        </p>
      </div>

      <Button onClick={onNew}>
        <Plus className="w-4 h-4 mr-2" />
        Nova conta
      </Button>
    </div>
  )
}
