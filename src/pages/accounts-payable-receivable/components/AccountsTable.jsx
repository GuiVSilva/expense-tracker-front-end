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
import {
  Eye,
  HandCoins,
  MoreVertical,
  Pencil,
  Search,
  Trash2
} from 'lucide-react'
import { getCategoryColor, getCategoryIcon } from '@/lib/category-meta'
import { calculateOpenAmount } from '../utils/accountsPayableReceivableUtils'
import { formatCurrency, formatDate } from '@/lib/formatters'
import {
  getResolvedAccountStatus,
  getStatusMeta,
  getTypeMeta
} from '@/lib/account-meta'
import { AccountsTableSkeleton } from './AccountsLoading'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { AccountDeleteModal } from './AccountDeleteModal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { AccountEditModal } from './AccountEditModal'
import { AccountPayModal } from './AccountPayModal'
import { AccountViewModal } from './AccountViewModal'

export const AccountsTable = ({
  accounts,
  categories,
  currentPage,
  onPageChange,
  totalPages,
  isLoading,
  onClearFilters
}) => {
  const [line, setLine] = useState({})
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalPay, setOpenModalPay] = useState(false)
  const [openModalView, setOpenModalView] = useState(false)

  const handleOpenModalEdit = item => {
    setLine(item)
    setOpenModalEdit(true)
  }

  const handleCloseModalEdit = () => setOpenModalEdit(false)

  const handleOpenModalDelete = item => {
    setLine(item)
    setOpenModalDelete(true)
  }

  const handleCloseModalDelete = () => setOpenModalDelete(false)

  const handleOpenModalPay = item => {
    setLine(item)
    setOpenModalPay(true)
  }

  const handleCloseModalPay = () => setOpenModalPay(false)

  const handleOpenModalView = item => {
    setLine(item)
    setOpenModalView(true)
  }

  const handleCloseModalView = () => setOpenModalView(false)

  if (isLoading) {
    return <AccountsTableSkeleton />
  }

  if (accounts.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex flex-col items-center gap-3 py-12">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Search className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Nenhuma conta encontrada</p>
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
              <TableHead className="text-muted-foreground">Descricao</TableHead>
              <TableHead className="text-muted-foreground">Tipo</TableHead>
              <TableHead className="text-muted-foreground">Categoria</TableHead>
              <TableHead className="text-muted-foreground">
                Vencimento
              </TableHead>
              <TableHead className="text-muted-foreground text-right">
                Valor
              </TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map(account => {
              const typeMeta = getTypeMeta(account.type)
              const resolvedStatus = getResolvedAccountStatus(
                account.status,
                account.dueDate
              )
              const statusMeta = getStatusMeta(account.status, account.dueDate)
              const openAmount = calculateOpenAmount(account)
              const categoryName = account.category?.name
              const canEditAccount = resolvedStatus === 'pending'
              const CategoryIcon = getCategoryIcon(categoryName)

              return (
                <TableRow key={account.id}>
                  <TableCell className="font-medium text-foreground">
                    {account.description}
                    {account.installmentTotal > 1 && (
                      <div className="text-xs text-muted-foreground">
                        Parcela {account.installmentNumber}/
                        {account.installmentTotal}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={typeMeta.className}>
                      {typeMeta.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-normal ${getCategoryColor(categoryName)}`}
                    >
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {categoryName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(account.dueDate)}
                  </TableCell>
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
                    <Badge className={statusMeta.className}>
                      {statusMeta.label}
                    </Badge>
                  </TableCell>

                  <TableCell>
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
                          variant="warning"
                          disabled={!canEditAccount}
                          onClick={e => {
                            e.stopPropagation()
                            if (!canEditAccount) return
                            handleOpenModalEdit(account)
                          }}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="primary"
                          onClick={e => {
                            e.stopPropagation()
                            handleOpenModalPay(account)
                          }}
                        >
                          <HandCoins className="w-3.5 h-3.5 mr-2" />
                          Pagar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="info"
                          onClick={e => {
                            e.stopPropagation()
                            handleOpenModalView(account)
                          }}
                        >
                          <Eye className="w-3.5 h-3.5 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={e => {
                            e.stopPropagation()
                            handleOpenModalDelete(account)
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

      <AccountDeleteModal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        account={line}
      />

      <AccountEditModal
        open={openModalEdit}
        onClose={handleCloseModalEdit}
        account={line}
        categories={categories}
      />

      <AccountPayModal
        open={openModalPay}
        onClose={handleCloseModalPay}
        account={line}
      />

      <AccountViewModal
        open={openModalView}
        onClose={handleCloseModalView}
        account={line}
      />
    </>
  )
}
