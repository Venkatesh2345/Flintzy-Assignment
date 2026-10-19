import { CircleAlert, LoaderCircle, Search } from 'lucide-react'

export function LoadingState() { return <div className="state"><LoaderCircle className="spin" /><p>Loading your queue…</p></div> }
export function ErrorState({ message }: { message: string }) { return <div className="state"><CircleAlert /><p>{message}</p></div> }
export function EmptyState() { return <div className="state"><Search /><h3>No posts found</h3><p>Try changing your search or filters.</p></div> }
