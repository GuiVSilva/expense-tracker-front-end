import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { exportTypeOptions } from '../utils/reportsUtils'

export const ReportsExportModal = ({
  open,
  setOpen,
  exportType,
  setExportType,
  periodLabel,
  onExport
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle>Exportacao de relatorios</DialogTitle>
          <DialogDescription>
            Selecione o tipo de relatorio para baixar em CSV.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Periodo aplicado</p>
            <p className="text-sm font-medium text-foreground">{periodLabel}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Tipo de exportacao</p>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                {exportTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg-transparent"
          >
            Cancelar
          </Button>
          <Button onClick={onExport}>Exportar CSV</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
