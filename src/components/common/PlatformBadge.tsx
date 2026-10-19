import type { CSSProperties } from 'react'
import { PLATFORM_META } from '../../constants/platforms'
import type { Platform } from '../../types/post'

export function PlatformBadge({ platform }: { platform: Platform }) {
  const meta = PLATFORM_META[platform]
  return <span className="platform-badge" title={meta.label} style={{ '--platform': meta.color } as CSSProperties}>{meta.mark}</span>
}
