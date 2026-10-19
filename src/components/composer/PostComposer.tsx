import { useState } from 'react'
import { CalendarDays, Check, CircleAlert, ImagePlus, Send, X } from 'lucide-react'
import { COMPOSER_PLATFORMS, PLATFORM_META } from '../../constants/platforms'
import { getLocalInputValue, toUtc } from '../../lib/date'
import type { Platform, PostDraft } from '../../types/post'
import { PlatformBadge } from '../common/PlatformBadge'

interface Props { onClose: () => void; onCreate: (draft: PostDraft) => void }

export function PostComposer({ onClose, onCreate }: Props) {
  const [content, setContent] = useState('')
  const [selected, setSelected] = useState<Platform[]>(['instagram'])
  const [mediaUrl, setMediaUrl] = useState('')
  const [scheduledAt, setScheduledAt] = useState(getLocalInputValue())
  const [submitError, setSubmitError] = useState('')
  const overLimit = selected.filter((platform) => content.length > PLATFORM_META[platform].limit)

  const togglePlatform = (platform: Platform) => setSelected((current) => current.includes(platform) ? current.filter((item) => item !== platform) : [...current, platform])
  const submit = () => {
    if (!selected.length) return setSubmitError('Select at least one platform.')
    if (!content.trim()) return setSubmitError('Write something before scheduling.')
    if (overLimit.length) return setSubmitError(`${PLATFORM_META[overLimit[0]].label} has a ${PLATFORM_META[overLimit[0]].limit.toLocaleString()} character limit.`)
    if (new Date(scheduledAt) <= new Date()) return setSubmitError('Choose a time in the future.')
    onCreate({ content: content.trim(), platforms: selected, mediaUrl: mediaUrl || undefined, scheduledAt: toUtc(scheduledAt) })
  }

  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="composer" role="dialog" aria-modal="true" aria-labelledby="composer-title"><div className="composer-head"><div><p className="eyebrow">NEW CONTENT</p><h2 id="composer-title">Compose a post</h2></div><button className="close-button" onClick={onClose} aria-label="Close composer"><X /></button></div><label className="field-label" htmlFor="post-content">Your post <span>Required</span></label><textarea id="post-content" autoFocus value={content} onChange={(event) => setContent(event.target.value)} placeholder="What do you want to share with the world?" rows={6} />{selected.length > 0 && <div className="counter-grid">{selected.map((platform) => <div className={`counter ${content.length > PLATFORM_META[platform].limit ? 'over' : ''}`} key={platform}><PlatformBadge platform={platform} /><span>{content.length.toLocaleString()} / {PLATFORM_META[platform].limit.toLocaleString()}</span></div>)}</div>}<label className="field-label">Publish to</label><div className="platform-picker">{COMPOSER_PLATFORMS.map((platform) => <button type="button" className={selected.includes(platform) ? 'selected' : ''} key={platform} onClick={() => togglePlatform(platform)}><PlatformBadge platform={platform} />{PLATFORM_META[platform].label}{selected.includes(platform) && <Check size={15} />}</button>)}</div><label className="field-label" htmlFor="media-url">Image URL <span>Optional</span></label><div className="input-with-icon"><ImagePlus size={16} /><input id="media-url" className="text-input" value={mediaUrl} onChange={(event) => setMediaUrl(event.target.value)} placeholder="https://..." /></div><label className="field-label" htmlFor="scheduled-at">Schedule for <span>Shown in your local time</span></label><div className="date-input"><CalendarDays size={17} /><input id="scheduled-at" type="datetime-local" value={scheduledAt} onChange={(event) => setScheduledAt(event.target.value)} /></div>{submitError && <div className="form-error"><CircleAlert size={15} /> {submitError}</div>}<div className="composer-foot"><span className="utc-note">Stored as UTC · local time preview</span><button className="primary-button" onClick={submit}><Send size={16} /> Schedule post</button></div></div></div>
}
