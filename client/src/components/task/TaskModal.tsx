import { X } from 'lucide-react'
import { TaskModalProps } from '@/types/task.types'
import {
  MODAL_ANIMATION_CLASSES,
  MODAL_CONTENT_ANIMATION_CLASSES,
  BUTTON_HOVER_CLASSES,
} from '@/constants/task.constants'

export const TaskModal = ({
  isOpen,
  title,
  formState,
  onSubmit,
  onClose,
  submitLabel,
  submitIcon: SubmitIcon,
}: TaskModalProps) => {
  if (!isOpen) return null

  const { formData, updateField, isValid } = formState

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 ${MODAL_ANIMATION_CLASSES}`}
    >
      <div
        className={`bg-slate-800 border border-slate-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl ${MODAL_CONTENT_ANIMATION_CLASSES}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-all duration-300 hover:rotate-90 hover:scale-110 p-1 rounded-full hover:bg-slate-700/50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Task Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-400 hover:bg-slate-600/80 focus:scale-105"
              placeholder="Enter task name"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 placeholder-slate-400 hover:bg-slate-600/80 focus:scale-105 resize-none"
              placeholder="Enter task description (optional)"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onSubmit}
              disabled={!isValid}
              className={`flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold ${BUTTON_HOVER_CLASSES} disabled:hover:scale-100 flex items-center justify-center gap-2`}
            >
              {SubmitIcon && <SubmitIcon className="w-4 h-4" />}
              {submitLabel}
            </button>
            <button
              onClick={onClose}
              className={`px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg font-semibold ${BUTTON_HOVER_CLASSES}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
