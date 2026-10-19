import { Search, SlidersHorizontal } from 'lucide-react'
import { PLATFORM_META } from '../../constants/platforms'
import type { QueueFilters } from '../../lib/filters'
import { POST_STATUSES, type Platform, type PostStatus } from '../../types/post'

interface Props { filters: QueueFilters; onChange: <K extends keyof QueueFilters>(key: K, value: QueueFilters[K]) => void }
export function QueueToolbar({ filters, onChange }: Props) {
  return <section className="toolbar"><div className="search-wrap"><Search size={17} /><input value={filters.search} onChange={(event) => onChange('search', event.target.value)} placeholder="Search posts..." aria-label="Search posts" /></div><div className="filters"><select value={filters.platform} onChange={(event) => onChange('platform', event.target.value as Platform | 'all')} aria-label="Filter by platform"><option value="all">All platforms</option>{Object.entries(PLATFORM_META).map(([value, meta]) => <option key={value} value={value}>{meta.label}</option>)}</select><select value={filters.status} onChange={(event) => onChange('status', event.target.value as PostStatus | 'all')} aria-label="Filter by status"><option value="all">All statuses</option>{POST_STATUSES.map((value) => <option key={value} value={value}>{value[0].toUpperCase() + value.slice(1)}</option>)}</select><span className="filter-icon"><SlidersHorizontal size={17} /></span></div></section>
}
