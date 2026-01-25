import type { MetaTag, CategoryTag } from '../types'

interface TagBarProps {
  metaTags: MetaTag[]
  categoryTags: CategoryTag[]
  selectedTag: string | null
  onTagSelect?: (tagId: string) => void
}

export function TagBar({
  metaTags,
  categoryTags,
  selectedTag,
  onTagSelect,
}: TagBarProps) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md overflow-x-auto">
      <div className="flex gap-2 min-w-max px-4 sm:px-6 lg:px-8 py-3">
        {/* Meta Tags */}
        {metaTags.map((tag) => {
          const isSelected = selectedTag === tag.id
          return (
            <button
              key={tag.id}
              onClick={() => onTagSelect?.(tag.id)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 whitespace-nowrap ${
                isSelected
                  ? 'bg-amber-500 dark:bg-amber-400 text-white shadow-lg scale-105'
                  : 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40'
              }`}
              title={tag.description}
            >
              {tag.label}
            </button>
          )
        })}

        {/* Divider */}
        <div className="w-px bg-slate-300 dark:bg-slate-700 mx-2" />

        {/* Category Tags */}
        {categoryTags.map((tag) => {
          const isSelected = selectedTag === tag.id
          return (
            <button
              key={tag.id}
              onClick={() => onTagSelect?.(tag.id)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all transform hover:scale-105 whitespace-nowrap ${
                isSelected
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <span>{tag.label}</span>
              <span className="ml-2 text-xs opacity-75 font-mono">{tag.marketCount}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
