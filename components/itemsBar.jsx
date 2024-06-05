'use client'
import React from 'react'
import AddStep from './items/addStep'
import AddInput from './items/addInput'
import AddTextArea from './items/addTextArea'
import AddSelect from './items/addSelect'
import AddDatePicker from './items/addDatePicker'
import AddRadios from './items/addRadios'
import AddCheckbox from './items/addCheckbox'
import AddOtp from './items/addOtp'
import AddPictureUpload from './items/addPictureUpload'
import AddFileUpload from './items/addFileUpload'

import AddHeading from './items/addHeading'
import AddParagraph from './items/addParagraph'
import AddPicture from './items/addPicture'
import AddActionBtn from './items/addActionBtn'

const ItemsBar = ({ data, update, tags }) => {
  return (
    <div className="flex flex-col gap-2 p-3 overflow-y-auto">
      <p className="text-left font-semibold">Steps</p>
      <AddStep data={data} update={update} />
      <hr />

      <p className="text-left font-semibold">Fields</p>
      <AddInput data={data} update={update} tags={tags} />
      <AddTextArea data={data} update={update} tags={tags} />
      <AddSelect data={data} update={update} tags={tags} />
      <AddDatePicker data={data} update={update} tags={tags} />
      <AddRadios data={data} update={update} tags={tags} />
      <AddCheckbox data={data} update={update} tags={tags} />
      <AddPictureUpload data={data} update={update} tags={tags} />
      <AddFileUpload data={data} update={update} tags={tags} />
      <AddOtp data={data} update={update} tags={tags} />
      <hr />

      <p className="text-left font-semibold">Content</p>
      <AddHeading data={data} update={update} tags={tags} />
      <AddParagraph data={data} update={update} tags={tags} />
      <AddPicture data={data} update={update} tags={tags} />
      <AddActionBtn data={data} update={update} tags={tags} />
    </div>
  )
}

export default ItemsBar
