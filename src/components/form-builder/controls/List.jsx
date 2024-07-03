import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function List({ getter, setter, resetForm }) {
  return (
    <div>
      <DialogTitle>Add List</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}