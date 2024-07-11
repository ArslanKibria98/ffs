import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function EmailAddress({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  return (
    <div>
      <DialogTitle>Add Email Address</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}