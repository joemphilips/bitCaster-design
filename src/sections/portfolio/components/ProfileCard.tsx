import type { UserProfile } from '@/../product/sections/portfolio/types'
import { Camera, Eye } from 'lucide-react'
import { formatBtc } from '@/lib/format'

interface ProfileCardProps {
  profile: UserProfile
  totalBalanceSats: number
  onAvatarUpload?: (file: File) => void
}

export function ProfileCard({ profile, totalBalanceSats, onAvatarUpload }: ProfileCardProps) {
  const joinedDate = new Date(profile.registeredDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  function handleAvatarClick() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) onAvatarUpload?.(file)
    }
    input.click()
  }

  return (
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <button
        onClick={handleAvatarClick}
        className="relative group shrink-0"
      >
        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-2 ring-slate-200 dark:ring-slate-600">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-400 dark:text-slate-500">
              {profile.displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-5 h-5 text-white" />
        </div>
      </button>

      {/* Info */}
      <div className="min-w-0">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
          {profile.displayName}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Joined {joinedDate}
        </p>
        <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          <Eye className="w-3 h-3" />
          <span>{profile.viewCount.toLocaleString()} views</span>
        </div>

        {/* Total Balance */}
        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400">Total Balance</div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
            {formatBtc(totalBalanceSats)}
          </div>
        </div>
      </div>
    </div>
  )
}
