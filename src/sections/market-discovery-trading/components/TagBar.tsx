import React from 'react'
import type { MetaTag, CategoryTag } from '@/../product/sections/market-discovery-trading/types'

interface TagBarProps {
  metaTags: MetaTag[]
  categoryTags: CategoryTag[]
  selectedMetaTags: string[]
  selectedCategoryTags: string[]
  onMetaTagToggle?: (tagId: string) => void
  onCategoryTagToggle?: (tagId: string) => void
}

export function TagBar({
  metaTags,
  categoryTags,
  selectedMetaTags,
  selectedCategoryTags,
  onMetaTagToggle,
  onCategoryTagToggle,
}: TagBarProps) {
  return (
    <div className="sticky top-16 md:top-16 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-4 overflow-x-auto">
      <div className="flex gap-6 min-w-max">
        {/* Meta Tags Section */}
        <div className="flex items-center gap-2">
          {metaTags.map((tag) => {
            const isSelected = selectedMetaTags.includes(tag.id)
            return (
              <button
                key={tag.id}
                onClick={() => onMetaTagToggle?.(tag.id)}
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
        </div>

        {/* Divider */}
        <div className="w-px bg-slate-300 dark:bg-slate-700" />

        {/* Category Tags Section */}
        <div className="flex items-center gap-2">
          {categoryTags.map((tag) => {
            const isSelected = selectedCategoryTags.includes(tag.id)
            return (
              <button
                key={tag.id}
                onClick={() => onCategoryTagToggle?.(tag.id)}
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
    </div>
  )
}
