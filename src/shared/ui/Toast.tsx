import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { removeNotification, type NotificationType } from '@/app/store/notificationSlice'
import type { RootState } from '@/app/store'
import { cn } from '@/core/utils'

const ToastContainer = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state: RootState) => state.notification.notifications)

  const getToastStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-700 text-white'
    }
  }

  const getToastIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => dispatch(removeNotification(notification.id))}
          getStyles={getToastStyles}
          getIcon={getToastIcon}
        />
      ))}
    </div>
  )
}

interface ToastProps {
  type: NotificationType
  message: string
  onClose: () => void
  getStyles: (type: NotificationType) => string
  getIcon: (type: NotificationType) => React.ReactNode
}

const Toast = ({ type, message, onClose, getStyles, getIcon }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-up',
        getStyles(type)
      )}
    >
      {getIcon(type)}
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default ToastContainer
