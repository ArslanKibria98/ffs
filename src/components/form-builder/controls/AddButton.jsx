import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function AddButton({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  return (
    <div className=''>
      <DialogTitle>Add Button</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}