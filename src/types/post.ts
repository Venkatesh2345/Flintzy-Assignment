export const PLATFORMS = ['facebook', 'instagram', 'x', 'tiktok', 'linkedin'] as const
export type Platform = (typeof PLATFORMS)[number]

export const POST_STATUSES = ['scheduled', 'published', 'failed'] as const
export type PostStatus = (typeof POST_STATUSES)[number]

export interface Post {
  id: string
  content: string
  platforms: Platform[]
  mediaUrl?: string
  scheduledAt: string
  status: PostStatus
  errorMessage?: string
}

export type PostDraft = Omit<Post, 'id' | 'status'>
