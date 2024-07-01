"use client"
import React from 'react'

import {
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export default function List({ getter, setter}) {
  return (
    <div>
      <DialogTitle>Add List</DialogTitle>
      <DialogDescription>
        Data
      </DialogDescription>
    </div>
  )
}