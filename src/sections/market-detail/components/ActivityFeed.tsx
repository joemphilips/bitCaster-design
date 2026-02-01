import { useState } from 'react'
import { Heart, Send, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { Trade, Comment, ActivityTab } from '@/../product/sections/market-detail/types'

interface ActivityFeedProps {
  trades: Trade[]
  comments: Comment[]
  activeTab: ActivityTab
  onTabChange?: (tab: ActivityTab) => void
  onCommentPost?: (content: string) => void
  onCommentLike?: (commentId: string) => void
  onLoadMoreTrades?: () => void
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

function formatSats(sats: number): string {
  if (sats >= 1000) {
    return `${(sats / 1000).toFixed(1)}K`
  }
  return sats.toString()
}

function TradeRow({ trade }: { trade: Trade }) {
  const isYes = trade.side === 'yes'

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      {/* Side Icon */}
      <div className={`p-1.5 rounded-lg ${isYes ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
        {isYes ? (
          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
      </div>

      {/* Trade Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {trade.userDisplayName}
          </span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            isYes
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-500/10 text-red-600 dark:text-red-400'
          }`}>
            {trade.side.toUpperCase()}
          </span>
          {trade.outcomeId && (
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              ({trade.outcomeId})
            </span>
          )}
          {trade.cellId && (
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              ({trade.cellId.replace('-', '/')})
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {formatSats(trade.amount)} sats @ {trade.price.toFixed(1)}%
        </p>
      </div>

      {/* Timestamp */}
      <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
        {formatTimeAgo(trade.timestamp)}
      </span>
    </div>
  )
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

export function ActivityFeed({
  trades,
  comments,
  activeTab,
  onTabChange,
  onCommentPost,
  onCommentLike,
  onLoadMoreTrades,
  onLoadMoreComments,
}: ActivityFeedProps) {
  const [newComment, setNewComment] = useState('')

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onCommentPost?.(newComment.trim())
      setNewComment('')
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => onTabChange?.('trades')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'trades'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Trades
          <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">
            ({trades.length})
          </span>
          {activeTab === 'trades' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>
        <button
          onClick={() => onTabChange?.('comments')}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'comments'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Comments
          <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">
            ({comments.length})
          </span>
          {activeTab === 'comments' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'trades' ? (
          <>
            {trades.length === 0 ? (
              <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
                No trades yet
              </p>
            ) : (
              <>
                {trades.map((trade) => (
                  <TradeRow key={trade.id} trade={trade} />
                ))}
                {trades.length >= 5 && (
                  <button
                    onClick={onLoadMoreTrades}
                    className="w-full py-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Load more trades
                  </button>
                )}
              </>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
