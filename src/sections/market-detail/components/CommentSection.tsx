import { useState } from 'react'
import { Heart, Send } from 'lucide-react'
import type { Comment } from '@/../product/sections/market-detail/types'

interface CommentSectionProps {
  comments: Comment[]
  onCommentPost?: (content: string) => void
  onCommentLike?: (commentId: string) => void
  onLoadMoreComments?: () => void
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function CommentRow({
  comment,
  onLike,
}: {
  comment: Comment
  onLike?: () => void
}) {
  return (
    <div className="py-4 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        {comment.userAvatarUrl ? (
          <img
            src={comment.userAvatarUrl}
            alt={comment.userDisplayName}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
            {comment.userDisplayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {comment.userDisplayName}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">
            {formatTimeAgo(comment.timestamp)}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2 pl-11">
        {comment.content}
      </p>

      {/* Actions */}
      <div className="pl-11">
        <button
          onClick={onLike}
          className={`inline-flex items-center gap-1.5 text-xs transition-colors ${
            comment.isLiked
              ? 'text-red-500'
              : 'text-slate-400 dark:text-slate-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} />
          {comment.likeCount}
        </button>
      </div>
    </div>
  )
}

export function CommentSection({
  comments,
  onCommentPost,
  onCommentLike,
  onLoadMoreComments,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onCommentPost?.(newComment.trim())
      setNewComment('')
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Comments
          <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500 font-normal">
            ({comments.length})
          </span>
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {/* Comment Input */}
        <div className="flex gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            U
          </div>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
              placeholder="Add a comment..."
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {comments.length === 0 ? (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <>
            {comments.map((comment) => (
              <CommentRow
                key={comment.id}
                comment={comment}
                onLike={() => onCommentLike?.(comment.id)}
              />
            ))}
            {comments.length >= 3 && (
              <button
                onClick={onLoadMoreComments}
                className="w-full py-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Load more comments
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
