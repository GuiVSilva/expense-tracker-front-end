import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Eye, HandCoins, Pencil, Trash2 } from 'lucide-react'
import {
  calculateOpenAmount,
  canEditAmount,
  formatCurrency,
  formatDate,
  getStatusMeta,
  getTypeMeta
} from '../utils/accountsPayableReceivableUtils'

export const AccountsTable = ({
  accounts,
  onPay,
  onViewDetails,
  onEdit,
  onDelete
}) => {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descricao</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Acoes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map(account => {
            const typeMeta = getTypeMeta(account.type)
            const statusMeta = getStatusMeta(account.status)
            const openAmount = calculateOpenAmount(account)

            return (
              <TableRow key={account.id}>
                <TableCell className="font-medium text-foreground">
                  {account.description}
                  {account.installmentTotal > 1 && (
                    <div className="text-xs text-muted-foreground">
                      Parcela {account.installmentIndex}/{account.installmentTotal}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={typeMeta.className}>{typeMeta.label}</Badge>
                </TableCell>
                <TableCell>{account.category}</TableCell>
                <TableCell>{formatDate(account.dueDate)}</TableCell>
                <TableCell className="text-right">
                  <div className="font-semibold text-foreground">
                    {formatCurrency(account.amount)}
                  </div>
                  {account.status !== 'paid' && (
                    <div className="text-xs text-muted-foreground">
                      Em aberto: {formatCurrency(openAmount)}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={statusMeta.className}>{statusMeta.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => onEdit(account)}
                      disabled={!canEditAmount(account.status)}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => onPay(account)}
                      disabled={account.status === 'paid'}
                    >
                      <HandCoins className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => onViewDetails(account)}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      className="bg-transparent text-destructive border-destructive/30 hover:bg-destructive/10"
                      onClick={() => onDelete(account)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}

          {!accounts.length && (
            <TableRow>
              <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                Nenhuma conta encontrada com os filtros atuais.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
