import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Search, Filter, Download, X } from 'lucide-react'

export const TransactionsFilters = ({
  filters,
  uniqueCategories,
  onFilterChange,
  onClearFilters
}) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <Card className="bg-card border-border mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar transações..."
              value={filters.search}
              onChange={e => onFilterChange('search', e.target.value)}
              className="pl-10 bg-secondary border-border h-10"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Quick type filters */}
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <button
                onClick={() => onFilterChange('type', 'all')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filters.type === 'all'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => onFilterChange('type', 'income')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filters.type === 'income'
                    ? 'bg-primary/15 text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Receitas
              </button>
              <button
                onClick={() => onFilterChange('type', 'expense')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filters.type === 'expense'
                    ? 'bg-destructive/15 text-destructive shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Despesas
              </button>
            </div>

            {/* More filters toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`bg-transparent ${showFilters ? 'border-primary text-primary' : ''}`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>

            {/* Export */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Categoria</Label>
              <Select
                value={filters.category}
                onValueChange={v => onFilterChange('category', v)}
              >
                <SelectTrigger className="bg-secondary border-border w-full">
                  <SelectValue placeholder="Todas categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas categorias</SelectItem>
                  {uniqueCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Ordenar por
              </Label>
              <Select
                value={filters.sortBy}
                onValueChange={v => onFilterChange('sortBy', v)}
              >
                <SelectTrigger className="bg-secondary border-border w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Data (mais recente)</SelectItem>
                  <SelectItem value="date-asc">Data (mais antiga)</SelectItem>
                  <SelectItem value="amount-desc">Valor (maior)</SelectItem>
                  <SelectItem value="amount-asc">Valor (menor)</SelectItem>
                  <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Limpar filtros
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
