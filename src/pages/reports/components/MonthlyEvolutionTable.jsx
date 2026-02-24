import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatCurrency, formatPercent } from '../utils/reportsUtils'

export const MonthlyEvolutionTable = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolucao mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mes</TableHead>
              <TableHead>Receitas</TableHead>
              <TableHead>Despesas</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead>Var. Receita</TableHead>
              <TableHead>Var. Despesa</TableHead>
              <TableHead>Var. Saldo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.label}>
                <TableCell>{row.label}</TableCell>
                <TableCell>{formatCurrency(row.income)}</TableCell>
                <TableCell>{formatCurrency(row.expense)}</TableCell>
                <TableCell
                  className={row.balance >= 0 ? 'text-primary font-medium' : 'text-destructive font-medium'}
                >
                  {formatCurrency(row.balance)}
                </TableCell>
                <TableCell className={index === 0 ? 'text-muted-foreground' : row.incomeDelta >= 0 ? 'text-primary' : 'text-destructive'}>
                  {index === 0 ? '-' : formatPercent(row.incomeDelta)}
                </TableCell>
                <TableCell className={index === 0 ? 'text-muted-foreground' : row.expenseDelta > 0 ? 'text-destructive' : 'text-primary'}>
                  {index === 0 ? '-' : formatPercent(row.expenseDelta)}
                </TableCell>
                <TableCell className={index === 0 ? 'text-muted-foreground' : row.balanceDelta >= 0 ? 'text-primary' : 'text-destructive'}>
                  {index === 0 ? '-' : formatPercent(row.balanceDelta)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
