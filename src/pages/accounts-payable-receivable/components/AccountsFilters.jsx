import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { FilterX, Search } from 'lucide-react'
import {
  accountTypeOptions,
  statusOptions
} from '../utils/accountsPayableReceivableUtils'

export const AccountsFilters = ({
  filters,
  categories,
  onFilterChange,
  onClearFilters
}) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={filters.search}
              onChange={e => onFilterChange('search', e.target.value)}
              placeholder="Buscar por descricao..."
              className="pl-10 bg-secondary border-border"
            />
          </div>

          <div className="lg:col-span-2">
            <Select
              value={filters.type}
              onValueChange={value => onFilterChange('type', value)}
            >
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                {accountTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2">
            <Select
              value={filters.status}
              onValueChange={value => onFilterChange('status', value)}
            >
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2">
            <Select
              value={filters.category}
              onValueChange={value => onFilterChange('category', value)}
            >
              <SelectTrigger className="w-full bg-secondary border-border">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                {(categories || []).map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-1">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full bg-transparent"
            >
              <FilterX className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
