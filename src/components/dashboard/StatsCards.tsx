import type { Post } from '../../types/post'

export function StatsCards({ posts }: { posts: Post[] }) {
  const stats = [
    ['All posts', posts.length, ''],
    ['Scheduled', posts.filter((post) => post.status === 'scheduled').length, ''],
    ['Published', posts.filter((post) => post.status === 'published').length, ''],
    ['Needs attention', posts.filter((post) => post.status === 'failed').length, 'danger-text'],
  ] as const
  return <section className="stats">{stats.map(([label, value, className]) => <div key={label}><span className="stat-label">{label}</span><strong className={className}>{value}</strong></div>)}</section>
}
