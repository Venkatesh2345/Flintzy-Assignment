import { Check, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { PostComposer } from './components/composer/PostComposer'
import { LoadingState, EmptyState, ErrorState } from './components/common/AsyncState'
import { AppShell } from './components/layout/AppShell'
import { PostQueue } from './components/dashboard/PostQueue'
import { QueueToolbar } from './components/dashboard/QueueToolbar'
import { StatsCards } from './components/dashboard/StatsCards'
import { usePostQueue } from './hooks/usePostQueue'
import './styles.css'

export default function App() {
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const queue = usePostQueue()

  return <AppShell><main className="page"><div className="page-heading"><div><p className="eyebrow">CONTENT WORKSPACE</p><h1>Post queue</h1><p className="subheading">Plan once. Show up everywhere.</p></div><button className="primary-button" onClick={() => setIsComposerOpen(true)}><Plus size={18} /> Compose post</button></div><StatsCards posts={queue.posts} /><QueueToolbar filters={queue.filters} onChange={queue.updateFilter} />{queue.notice && <div className="notice"><Check size={16} /> {queue.notice}<button onClick={() => queue.setNotice('')} aria-label="Dismiss notification"><X size={14} /></button></div>}{queue.isLoading ? <LoadingState /> : queue.filteredPosts.length === 0 ? <EmptyState /> : <PostQueue groupedPosts={queue.groupedPosts} onRetry={queue.retryPost} />}</main>{isComposerOpen && <PostComposer onClose={() => setIsComposerOpen(false)} onCreate={(draft) => { queue.createPost(draft); setIsComposerOpen(false) }} />}</AppShell>
}
