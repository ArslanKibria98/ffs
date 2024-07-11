import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function Signature({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  return (
    <div>
      <DialogTitle>Add Signature</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}