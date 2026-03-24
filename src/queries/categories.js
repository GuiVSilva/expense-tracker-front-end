import { queryOptions } from '@tanstack/react-query'
import { categoriesService } from '@/services/categories'

const CATEGORIES_STALE_TIME = 1000 * 60 * 5
const CATEGORIES_GC_TIME = 1000 * 60 * 30

export const categoriesQueryKey = ['categories']

export const categoriesQueryOptions = queryOptions({
  queryKey: categoriesQueryKey,
  queryFn: () => categoriesService.getCategories(),
  staleTime: CATEGORIES_STALE_TIME,
  gcTime: CATEGORIES_GC_TIME
})
