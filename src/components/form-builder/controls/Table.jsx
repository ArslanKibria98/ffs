import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function Table({ getter, setter, formDataApi, resetForm }) {
  return (
    <div>
      <DialogTitle>Add Table</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}