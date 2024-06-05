'use client'
import React, { useState } from 'react'
import { Modal, Select, Input, InputNumber } from 'antd'

const AddPicture = ({ data, update, tags }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [pictureSrcValue, setPictureSrcValue] = useState('')
  const [pictureLabelValue, setPictureLabelValue] = useState('')
  const [pictureAltValue, setPictureAltValue] = useState('')
  const [pictureLoadValue, setPictureLoadValue] = useState('')
  const [pictureWidthValue, setPictureWidthValue] = useState()
  const [pictureHeightValue, setPictureHeightValue] = useState()
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name)
  const [selectedTag, setSelectedTag] = useState(tags[0])

  const handleAddStep = () => {
    if (pictureLabelValue == '' || pictureAltValue == '') {
      alert('Cannot add field without details!')
      return
    }

    let fieldToAdd = {
      type: 'heading',
      src: pictureSrcValue,
      label: pictureLabelValue,
      alt: pictureAltValue,
      loading: pictureLoadValue,
      width: pictureWidthValue,
      height: pictureHeightValue,
      tags: selectedTag
    }

    let filteredSteps = data?.steps?.map((step) => {
      console.log(step?.step_name)
      return step?.step_name === stepValue
        ? {
            ...step,
            fields: [...step.fields, fieldToAdd]
          }
        : step
    })

    update({
      ...data,
      steps: filteredSteps
    })

    setShowPopup(false)
    setPictureSrcValue('')
    setPictureLabelValue('')
    setPictureAltValue('')
    setPictureLoadValue('')
    setPictureWidthValue()
    setPictureHeightValue()
    setSelectedTag('')
  }

  const onStepChange = (value) => {
    setStep(value)
  }

  return (
    <div>
      <button
        className="border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1"
        onClick={() => setShowPopup(true)}
      >
        Add Picture
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-image"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Picture"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
      >
        <div className="flex flex-col gap-2">
          Step:
          <Select
            className="w-full"
            value={stepValue}
            onChange={onStepChange}
            options={data?.steps.map((step) => ({
              label: step?.step_name,
              value: step?.step_name
            }))}
            required={true}
          />
          Picture Details:
          <Input
            placeholder="Enter Picture Src"
            value={pictureSrcValue}
            onChange={(e) => setPictureSrcValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter Picture Label"
            value={pictureLabelValue}
            onChange={(e) => setPictureLabelValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter Picture Alt"
            value={pictureAltValue}
            onChange={(e) => setPictureAltValue(e.target.value)}
            required={true}
          />
          Picture Loading:
          <Select
            className="w-full"
            value={pictureLoadValue}
            onChange={setPictureLoadValue}
            options={[
              { label: 'Lazy', value: 'lazy' },
              { label: 'Priority', value: 'priority' }
            ]}
            required={true}
          />
          Tag:
          <Select
            className="w-full"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e)}
            options={tags.map((tag) => ({
              label: tag,
              value: tag
            }))}
            required={true}
          />
          Picture Size:
          <div className="flex gap-2">
            <InputNumber
              className="w-1/2"
              placeholder="Enter Picture Width"
              defaultValue={pictureWidthValue}
              min={1}
              max={3000}
              onChange={(value) => {
                setPictureWidthValue(value)
              }}
              required={true}
            />

            <InputNumber
              className="w-1/2"
              placeholder="Enter Picture Height"
              defaultValue={pictureHeightValue}
              min={1}
              max={3000}
              onChange={(value) => {
                setPictureHeightValue(value)
              }}
              required={true}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AddPicture
