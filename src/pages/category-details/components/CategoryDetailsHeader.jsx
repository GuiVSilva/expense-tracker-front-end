import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export const CategoryDetailsHeader = ({ categoryName }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Detalhe da Categoria</h1>
        <p className="text-sm text-muted-foreground">
          Analise completa de gastos para <span className="text-primary font-medium">{categoryName}</span>
        </p>
      </div>

      <Button asChild variant="outline">
        <Link to="/monthly-budget">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Orcamento
        </Link>
      </Button>
    </div>
  )
}
