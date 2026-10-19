import type { Platform } from '../types/post'

export const PLATFORM_META: Record<Platform, { label: string; color: string; limit: number; mark: string }> = {
  facebook: { label: 'Facebook', color: '#1877f2', limit: 5000, mark: 'f' },
  instagram: { label: 'Instagram', color: '#e34c8b', limit: 2200, mark: '◎' },
  x: { label: 'X', color: '#111827', limit: 280, mark: '𝕏' },
  tiktok: { label: 'TikTok', color: '#111827', limit: 2200, mark: '♪' },
  linkedin: { label: 'LinkedIn', color: '#0a66c2', limit: 3000, mark: 'in' },
}

export const COMPOSER_PLATFORMS: Platform[] = ['instagram', 'facebook', 'x', 'tiktok']
