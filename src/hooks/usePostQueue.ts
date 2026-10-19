import { useEffect, useMemo, useState } from 'react'
import seedPosts from '../data/posts.json'
import { getDayLabel } from '../lib/date'
import { readFiltersFromUrl, writeFiltersToUrl, type QueueFilters } from '../lib/filters'
import type { Post, PostDraft } from '../types/post'

const initialPosts = seedPosts as Post[]

export function usePostQueue() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [filters, setFilters] = useState<QueueFilters>(readFiltersFromUrl)
  const [isLoading, setIsLoading] = useState(true)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 550)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => writeFiltersToUrl(filters), [filters])

  const filteredPosts = useMemo(() => posts.filter((post) => {
    const matchesSearch = !filters.search || post.content.toLowerCase().includes(filters.search.toLowerCase())
    const matchesPlatform = filters.platform === 'all' || post.platforms.includes(filters.platform)
    const matchesStatus = filters.status === 'all' || post.status === filters.status
    return matchesSearch && matchesPlatform && matchesStatus
  }), [filters, posts])

  const groupedPosts = useMemo(() => filteredPosts.reduce<Record<string, Post[]>>((groups, post) => {
    const day = getDayLabel(post.scheduledAt)
    if (!groups[day]) groups[day] = []
    groups[day].push(post)
    return groups
  }, {}), [filteredPosts])

  const createPost = (draft: PostDraft) => {
    setPosts((current) => [{ ...draft, id: `p-${Date.now()}`, status: 'scheduled' }, ...current])
    setNotice('Post scheduled successfully.')
  }

  const retryPost = (post: Post) => {
    setPosts((current) => current.map((item) => item.id === post.id ? { ...item, status: 'scheduled', errorMessage: undefined } : item))
    setNotice('Retrying post…')
    window.setTimeout(() => {
      if (Math.random() < 0.2) {
        setPosts((current) => current.map((item) => item.id === post.id ? { ...item, status: 'failed', errorMessage: 'The retry failed. Please try again.' } : item))
        setNotice('Retry failed — the post was restored.')
      } else {
        setNotice('Post queued successfully.')
      }
    }, 1000)
  }

  const updateFilter = <K extends keyof QueueFilters>(key: K, value: QueueFilters[K]) => setFilters((current) => ({ ...current, [key]: value }))

  return { posts, filteredPosts, groupedPosts, filters, isLoading, notice, setNotice, updateFilter, createPost, retryPost }
}
