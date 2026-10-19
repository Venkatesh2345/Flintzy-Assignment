export function formatTime(utc: string) {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(utc))
}

export function getDayLabel(utc: string) {
  const date = new Date(utc)
  const today = new Date()
  const diff = Math.round((new Date(date.toDateString()).getTime() - new Date(today.toDateString()).getTime()) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'short', day: 'numeric' }).format(date)
}

export function getLocalInputValue(utc?: string) {
  const date = utc ? new Date(utc) : new Date(Date.now() + 3600000)
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16)
}

export function toUtc(localDateTime: string) {
  return new Date(localDateTime).toISOString()
}
