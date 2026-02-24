import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { periodOptions } from '../utils/reportsUtils'

export const ReportsHeader = ({ period, setPeriod, onOpenExport }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Relatorios</h1>
        <p className="text-sm text-muted-foreground">
          Visao consolidada de receitas, despesas, evolucao e categorias.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <div className="w-full sm:w-56">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={onOpenExport} className="bg-transparent">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>
    </div>
  )
}
