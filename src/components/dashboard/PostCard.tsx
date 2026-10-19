import { ChevronDown, CircleAlert, Clock3, ImagePlus, RotateCcw } from 'lucide-react'
import { PlatformBadge } from '../common/PlatformBadge'
import { formatTime } from '../../lib/date'
import type { Post } from '../../types/post'

export function PostCard({ post, onRetry }: { post: Post; onRetry: (post: Post) => void }) {
  return <article className={`post-row ${post.status === 'failed' ? 'has-error' : ''}`}><div className="post-main"><div className="post-meta"><div className="platforms">{post.platforms.map((platform) => <PlatformBadge key={platform} platform={platform} />)}</div><span className="post-time"><Clock3 size={14} /> {formatTime(post.scheduledAt)}</span></div><p className="post-content">{post.content}</p>{post.mediaUrl && <div className="media-chip"><ImagePlus size={14} /> Image attached</div>}{post.errorMessage && <p className="error-message"><CircleAlert size={14} /> {post.errorMessage}</p>}</div><div className="post-status"><span className={`status-pill ${post.status}`}><span /> {post.status}</span>{post.status === 'failed' && <button className="retry-button" onClick={() => onRetry(post)}><RotateCcw size={14} /> Retry</button>}<ChevronDown size={18} className="row-chevron" /></div></article>
}
