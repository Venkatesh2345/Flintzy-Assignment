import type { Platform, PostStatus } from '../types/post'

export interface QueueFilters {
  search: string
  platform: Platform | 'all'
  status: PostStatus | 'all'
}

export function readFiltersFromUrl(): QueueFilters {
  const params = new URLSearchParams(window.location.search)
  return {
    search: params.get('q') ?? '',
    platform: (params.get('platform') as QueueFilters['platform']) ?? 'all',
    status: (params.get('status') as QueueFilters['status']) ?? 'all',
  }
}

export function writeFiltersToUrl(filters: QueueFilters) {
  const params = new URLSearchParams()
  if (filters.search) params.set('q', filters.search)
  if (filters.platform !== 'all') params.set('platform', filters.platform)
  if (filters.status !== 'all') params.set('status', filters.status)
  window.history.replaceState(null, '', params.toString() ? `?${params}` : window.location.pathname)
}
