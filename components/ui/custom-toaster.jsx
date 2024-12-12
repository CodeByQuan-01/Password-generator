"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
// import { useToast } from "@/components/ui/use-toast"
import { X } from 'lucide-react'

export function CustomToaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="w-auto max-w-[300px] bg-white dark:bg-gray-800">
            <div className="grid gap-1">
              <div className="flex items-start justify-between">
                {title && <ToastTitle>{title}</ToastTitle>}
                <ToastClose className="h-4 w-4 opacity-70 transition-opacity hover:opacity-100">
                  <X className="h-4 w-4" />
                </ToastClose>
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-4 right-4 flex flex-col gap-2 w-full max-w-[300px] m-0 list-none z-[100] outline-none" />
    </ToastProvider>
  )
}

