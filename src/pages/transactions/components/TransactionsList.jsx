import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  MoreVertical,
  Eye,
  Trash2
} from 'lucide-react'
import { categoryColors, getCategoryIcon } from '../utils/categoryUtils'

export const TransactionsList = ({
  transactions,
  formatCurrency,
  formatDateShort,
  onViewDetails,
  onDelete,
  onClearFilters
}) => {
  if (transactions.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex flex-col items-center gap-3 py-12">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Search className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Nenhuma transação encontrada</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-primary"
          >
            Limpar filtros
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {/* Versão Desktop - Tabela (visível apenas em md pra cima) */}
      <Card className="bg-card border-border hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground pl-6">
                  Descrição
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Categoria
                </TableHead>
                <TableHead className="text-muted-foreground">Data</TableHead>
                <TableHead className="text-muted-foreground">Método</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Valor
                </TableHead>
                <TableHead className="text-muted-foreground text-right pr-6">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(transaction => {
                const CatIcon = getCategoryIcon(transaction.category)
                return (
                  <TableRow
                    key={transaction.id}
                    className="border-border group cursor-pointer hover:bg-secondary/50"
                    onClick={() => onViewDetails(transaction)}
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            transaction.type === 'income'
                              ? 'bg-primary/10'
                              : 'bg-destructive/10'
                          }`}
                        >
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="w-4 h-4 text-primary" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {transaction.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`font-normal ${categoryColors[transaction.category] || 'bg-secondary text-foreground border-border'}`}
                      >
                        <CatIcon className="w-3 h-3 mr-1" />
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateShort(transaction.date)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {transaction.method}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${transaction.type === 'income' ? 'text-primary' : 'text-destructive'}`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={e => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={e => {
                              e.stopPropagation()
                              onViewDetails(transaction)
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={e => {
                              e.stopPropagation()
                              onDelete(transaction)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Versão Mobile - Cards (visível apenas em telas menores que md) */}
      <div className="md:hidden space-y-3">
        {transactions.map(transaction => {
          const CatIcon = getCategoryIcon(transaction.category)
          return (
            <Card
              key={transaction.id}
              className="bg-card border-border cursor-pointer hover:border-border/80 transition-colors"
              onClick={() => onViewDetails(transaction)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income'
                          ? 'bg-primary/10'
                          : 'bg-destructive/10'
                      }`}
                    >
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {transaction.description}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={`text-xs font-normal ${categoryColors[transaction.category] || ''}`}
                        >
                          <CatIcon className="w-3 h-3 mr-1" />
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDateShort(transaction.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${transaction.type === 'income' ? 'text-primary' : 'text-destructive'}`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={e => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={e => {
                            e.stopPropagation()
                            onViewDetails(transaction)
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={e => {
                            e.stopPropagation()
                            onDelete(transaction)
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
