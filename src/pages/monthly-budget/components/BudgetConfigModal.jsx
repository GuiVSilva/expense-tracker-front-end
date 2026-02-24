import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { formatCurrency } from '../utils/monthlyBudgetUtils'

export const BudgetConfigModal = ({
  open,
  setOpen,
  categories,
  selectedCategory,
  selectedCategoryId,
  limitValue,
  setLimitValue,
  onCategoryChange,
  onSave
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Configurar orcamento por categoria</DialogTitle>
          <DialogDescription>
            Escolha a categoria e ajuste o limite mensal de gastos.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={String(selectedCategoryId || '')}
              onValueChange={onCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-limit">Limite mensal</Label>
            <Input
              id="budget-limit"
              type="number"
              min="1"
              value={limitValue}
              onChange={event => setLimitValue(event.target.value)}
              placeholder="1000"
            />
          </div>

          {selectedCategory && (
            <div className="rounded-lg border border-border bg-secondary/40 p-3 space-y-1">
              <p className="text-xs text-muted-foreground">Gasto atual da categoria</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(selectedCategory.spent)}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={!Number(limitValue)}>
            Salvar limite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
