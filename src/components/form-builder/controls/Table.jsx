import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function Table({ getter, setter, resetForm }) {
  return (
    <div>
      <DialogTitle>Add Table</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}