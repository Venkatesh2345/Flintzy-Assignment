import type { Post } from '../../types/post'
import { PostCard } from './PostCard'

export function PostQueue({ groupedPosts, onRetry }: { groupedPosts: Record<string, Post[]>; onRetry: (post: Post) => void }) {
  return <div className="queue">{Object.entries(groupedPosts).map(([day, posts]) => <section className="day-group" key={day}><div className="day-heading"><span>{day}</span><span className="day-line" /><span className="day-count">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span></div>{posts.map((post) => <PostCard key={post.id} post={post} onRetry={onRetry} />)}</section>)}</div>
}
