import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const GoalsHeader = ({ onCreate }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Metas Financeiras</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie metas, acompanhe progresso e veja previsoes de conclusao.
        </p>
      </div>
      <Button onClick={onCreate}>
        <Plus className="w-4 h-4 mr-2" />
        Nova Meta
      </Button>
    </div>
  )
}
