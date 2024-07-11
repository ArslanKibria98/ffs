import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function LosControl({getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  return (
    <div>
      <DialogTitle>Add LOS Control</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}