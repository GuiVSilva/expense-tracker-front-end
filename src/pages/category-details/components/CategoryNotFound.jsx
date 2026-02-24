import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router'

export const CategoryNotFound = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Categoria nao encontrada</h2>
        <p className="text-sm text-muted-foreground">
          Nao foi possivel localizar os dados da categoria solicitada.
        </p>
        <Button asChild>
          <Link to="/monthly-budget">Voltar para Orcamento Mensal</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
