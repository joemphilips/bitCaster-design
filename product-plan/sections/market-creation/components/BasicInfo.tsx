import { Upload, X, Plus, LinkIcon } from 'lucide-react'
import type { WizardStepBasicInfo } from '../types'

interface BasicInfoProps {
  data: WizardStepBasicInfo
  categoryTags: string[]
  onTitleChange?: (title: string) => void
  onCategoryTagsChange?: (tags: string[]) => void
  onClosingDateChange?: (date: string) => void
  onAnswerUrlsChange?: (urls: string[]) => void
  onThumbnailUpload?: () => void
  onNext?: () => void
}

export function BasicInfo({
  data,
  categoryTags,
  onTitleChange,
  onCategoryTagsChange,
  onClosingDateChange,
  onAnswerUrlsChange,
  onThumbnailUpload,
  onNext,
}: BasicInfoProps) {
  const canProceed = data.title.trim().length > 0 && data.closingDate.length > 0

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Basic Information</h2>
      <p className="text-sm text-slate-400 mb-8">
        Provide the core details for your prediction market.
      </p>

      <div className="space-y-6">
        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Thumbnail</label>
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 rounded-lg border-2 border-dashed border-slate-700 bg-slate-900 flex flex-col items-center justify-center text-slate-500">
              {data.imageFile ? (
                <span className="text-xs text-green-400">Uploaded</span>
              ) : (
                <>
                  <Plus className="w-6 h-6 mb-1" strokeWidth={1.5} />
                  <span className="text-xs">No image</span>
                </>
              )}
            </div>
            <div>
              <button
                onClick={() => onThumbnailUpload?.()}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                <Upload className="w-4 h-4 inline-block mr-1.5" strokeWidth={1.5} />
                Upload image
              </button>
              <p className="text-xs text-slate-500 mt-1.5">JPG/PNG/WEBP, max 5MB</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onTitleChange?.(e.target.value)}
            placeholder="Type title..."
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
          />
          <p className="text-xs text-slate-500 mt-1.5">A clear question that the market resolves</p>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Categories</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {data.categoryTags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/15 text-blue-400 text-xs font-medium"
              >
                {tag}
                <button
                  onClick={() => onCategoryTagsChange?.(data.categoryTags.filter((t) => t !== tag))}
                  className="hover:text-blue-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <select
            onChange={(e) => {
              if (e.target.value && !data.categoryTags.includes(e.target.value)) {
                onCategoryTagsChange?.([...data.categoryTags, e.target.value])
              }
              e.target.value = ''
            }}
            defaultValue=""
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
          >
            <option value="" disabled>Select...</option>
            {categoryTags.filter((t) => !data.categoryTags.includes(t)).map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1.5">Multiple selection. Choose relevant categories.</p>
        </div>

        {/* Closing Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">End Time</label>
          <input
            type="datetime-local"
            value={data.closingDate}
            onChange={(e) => onClosingDateChange?.(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
          />
          <p className="text-xs text-slate-500 mt-1.5">When will this market stop accepting trades?</p>
        </div>

        {/* Answer URLs */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Answer URLs (Sources of Truth)</label>
          {data.answerUrls.map((url, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" strokeWidth={1.5} />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const newUrls = [...data.answerUrls]
                    newUrls[i] = e.target.value
                    onAnswerUrlsChange?.(newUrls)
                  }}
                  placeholder="https://..."
                  className="w-full pl-9 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                onClick={() => onAnswerUrlsChange?.(data.answerUrls.filter((_, idx) => idx !== i))}
                className="p-3 rounded-lg border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => onAnswerUrlsChange?.([...data.answerUrls, ''])}
            className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors mt-1"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add URL
          </button>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={() => onNext?.()}
        disabled={!canProceed}
        className={`w-full py-3 rounded-full font-semibold text-sm transition-colors mt-8 ${
          canProceed
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  )
}
