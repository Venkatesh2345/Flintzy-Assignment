import type { ReactNode } from 'react'
import { Clock3 } from 'lucide-react'

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="app-shell"><header className="topbar"><div className="brand"><div className="brand-mark">✦</div><span>pulse<span className="brand-accent">queue</span></span></div><div className="top-actions"><span className="timezone"><Clock3 size={14} /> {Intl.DateTimeFormat().resolvedOptions().timeZone}</span><button className="avatar" aria-label="Account menu">AR</button></div></header>{children}</div>
}
