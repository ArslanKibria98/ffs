import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function Rating({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  return (
    <div>
      <DialogTitle>Add Rating</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}