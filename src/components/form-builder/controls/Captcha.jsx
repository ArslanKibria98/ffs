import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function Captcha({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  return (
    <div>
      <DialogTitle>Add Captcha</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}