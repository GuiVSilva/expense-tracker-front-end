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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  MoreVertical,
  Trash2
} from 'lucide-react'
import { getCategoryColor, getCategoryIcon } from '@/lib/category-meta'
import { formatPaymentMethod } from '@/lib/payment-methods'
import { TransactionsTableSkeleton } from './TransactionsLoading'

export const TransactionsList = ({
  transactions,
  currentPage,
  totalPages,
  isLoading,
  formatCurrency,
  formatDateShort,
  handleOpenDialogDelete,
  onPageChange,
  onClearFilters
}) => {
  if (isLoading) {
    return <TransactionsTableSkeleton />
  }

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
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground pl-6">
                Descrição
              </TableHead>
              <TableHead className="text-muted-foreground">Categoria</TableHead>
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
              const categoryName =
                transaction.category?.name || transaction.category
              const CatIcon = getCategoryIcon(categoryName)
              return (
                <TableRow
                  key={transaction.id}
                  className="border-border group hover:bg-secondary/50"
                >
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          transaction.type === 'INCOME'
                            ? 'bg-primary/10'
                            : 'bg-destructive/10'
                        }`}
                      >
                        {transaction.type === 'INCOME' ? (
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
                      className={`font-normal ${getCategoryColor(categoryName)}`}
                    >
                      <CatIcon className="w-3 h-3 mr-1" />
                      {categoryName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateShort(transaction.date)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatPaymentMethod(transaction.method)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${transaction.type === 'INCOME' ? 'text-primary' : 'text-destructive'}`}
                    >
                      {transaction.type === 'INCOME' ? '+' : '-'}
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
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={e => {
                            e.stopPropagation()
                            handleOpenDialogDelete(transaction)
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
      </div>

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 1}
              href="#"
              onClick={event => {
                event.preventDefault()
                if (currentPage > 1) {
                  onPageChange(currentPage - 1)
                }
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              onClick={event => event.preventDefault()}
              className="pointer-events-none"
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              disabled={currentPage === totalPages}
              href="#"
              onClick={event => {
                event.preventDefault()
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1)
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
