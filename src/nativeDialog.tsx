import { IDialogProps, DialogTypes } from './types'
import React, { useEffect } from 'react'

interface INativeDialogProps extends IDialogProps {
  message: string
}

export const NativeDialog: React.ElementType<INativeDialogProps> = (props) => {
  const { message, type, defaultText, onSubmit, onCancel, open } = props

  useEffect(() => {
    if (!message || !open) return
    switch (type) {
      case DialogTypes.Alert: {
        window.alert(message)
        if (typeof onSubmit === 'function') {
          onSubmit(true)
        }
        break
      }
      case DialogTypes.Confirm: {
        const result = window.confirm(message)
        if (typeof onSubmit === 'function' && result) {
          onSubmit(result)
        }
        if (typeof onCancel === 'function' && !result) onCancel()
        break
      }
      case DialogTypes.Prompt: {
        const result = window.prompt(message, defaultText)
        if (typeof onSubmit === 'function' && result) {
          onSubmit(result)
        }
        if (typeof onCancel === 'function' && !result) onCancel()
        break
      }
      default:
    }
    // setOpen(false)
  }, [message, type, defaultText, onSubmit, onCancel])

  return null
}
