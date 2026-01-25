import type { UserProfile, PLSummary } from '../types'
import { PLCard } from './PLCard'

interface ProfileHeaderProps {
  profile: UserProfile
  plSummary: PLSummary
  onAvatarUpload?: (file: File) => void
}

export function ProfileHeader({ profile, plSummary, onAvatarUpload }: ProfileHeaderProps) {
  const handleAvatarClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png,image/jpeg,image/webp'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        onAvatarUpload?.(file)
      }
    }
    input.click()
  }

  const memberSince = new Date(profile.registeredDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="mb-8">
      {/* Profile info row */}
      <div className="mb-6 flex items-center gap-5">
        {/* Avatar with upload overlay */}
        <button
          onClick={handleAvatarClick}
          className="group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-lg ring-2 ring-white/80 transition-transform hover:scale-105 dark:from-slate-700 dark:to-slate-800 dark:ring-slate-700/80"
          aria-label="Upload avatar"
        >
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-400 dark:text-slate-500">
              {profile.displayName.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {profile.displayName}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Member since {memberSince}
          </p>
        </div>
      </div>

      {/* P/L Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <PLCard label="24h" metric={plSummary.last24h} />
        <PLCard label="7 days" metric={plSummary.last7d} />
        <PLCard label="30 days" metric={plSummary.last30d} />
        <PLCard label="All Time" metric={plSummary.allTime} isHighlighted />
      </div>
    </div>
  )
}
