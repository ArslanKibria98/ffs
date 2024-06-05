'use client'
import React, { useState } from 'react'
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd'

const AddPictureUpload = ({ data, update, tags }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [pictureTypesValue, setPictureTypesValue] = useState([])
  const [pictureCountValue, setPictureCountValue] = useState(1)
  const [pictureMinSizeValue, setPictureMinSizeValue] = useState()
  const [pictureMaxSizeValue, setPictureMaxSizeValue] = useState()
  const [pictureMinHWValue, setPictureMinHWValue] = useState()
  const [pictureMaxHWValue, setPictureMaxHWValue] = useState()
  const [pictureNameValue, setPictureNameValue] = useState('')
  const [pictureLabelValue, setPictureLabelValue] = useState('')
  const [picturePreviewValue, setPicturePreviewValue] = useState(false)
  const [pictureRequireValue, setPictureRequireValue] = useState(false)
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name)
  const [selectedTag, setSelectedTag] = useState('')

  const handleAddStep = () => {
    if (pictureNameValue == '' || pictureLabelValue == '') {
      alert('Cannot add field without details!')
      return
    }

    let fieldToAdd = {
      type: 'pictureUpload',
      name: pictureNameValue,
      label: pictureLabelValue,
      formats: pictureTypesValue,
      count: pictureCountValue,
      minSize: pictureMinSizeValue,
      maxSize: pictureMaxSizeValue,
      minHW: pictureMinHWValue,
      maxHW: pictureMaxHWValue,
      preview: picturePreviewValue,
      required: pictureRequireValue,
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
    setPictureNameValue('')
    setPictureLabelValue('')
    setPictureTypesValue([])
    setPictureCountValue(1)
    setPictureMinSizeValue(null)
    setPictureMaxSizeValue(null)
    setPictureMinHWValue(null)
    setPictureMaxHWValue(null)
    setPicturePreviewValue(false)
    setPictureRequireValue(false)
    setSelectedTag('')
  }

  const onStepChange = (value) => {
    setStep(value)
  }
  const handleDelete = (indexToDelete) => {
    setPictureTypesValue((prevOptions) =>
      prevOptions.filter((_, index) => index !== indexToDelete)
    )
  }

  return (
    <div>
      <button
        className="border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1"
        onClick={() => setShowPopup(true)}
      >
        Add Picture Upload
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
          className="lucide lucide-file-image"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <circle cx="10" cy="13" r="2" />
          <path d="m20 17-1.1-1.1a2 2 0 0 0-2.81.01L10 22" />
        </svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Picture Upload"
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
          Picture Upload Details:
          <Input
            placeholder="Enter Picture Upload Name"
            value={pictureNameValue}
            onChange={(e) => setPictureNameValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter Picture Upload Label"
            value={pictureLabelValue}
            onChange={(e) => setPictureLabelValue(e.target.value)}
            required={true}
          />
          Add Picture Formats
          <Input
            placeholder="Enter Picture Upload Formats"
            onPressEnter={(e) => {
              setPictureTypesValue([...pictureTypesValue, e.target.value])
              e.target = ''
            }}
            required={true}
          />
          <div className="flex flex-col gap-2">
            {pictureTypesValue.map((option, index) => (
              <div key={index} className="w-full flex gap-2">
                <div className="flex justify-between bg-slate-100 p-1 px-4 w-full border rounded-lg">
                  {option}
                </div>
                <button
                  className="border rounded-lg bg-slate-200 w-[60px]"
                  onClick={() => handleDelete(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          Tags:
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
          Pictures Count:
          <InputNumber
            className="w-full"
            placeholder="Enter Pictures Count"
            min={1}
            max={15}
            onChange={(value) => {
              setPictureCountValue(value)
            }}
            required={true}
          />
          Picture Size (MB):
          <div className="flex gap-2">
            <InputNumber
              className="w-1/2"
              placeholder="Enter Picture Min Size"
              min={0}
              max={50}
              value={pictureMinSizeValue}
              onChange={(value) => {
                setPictureMinSizeValue(value)
              }}
              required={true}
            />
            <InputNumber
              className="w-1/2"
              placeholder="Enter Picture Max Size"
              min={1}
              max={50}
              value={pictureMaxSizeValue}
              onChange={(value) => {
                setPictureMaxSizeValue(value)
              }}
              required={true}
            />
          </div>
          Picture Dimensions (PX):
          <div className="flex gap-2">
            <InputNumber
              className="w-1/2"
              placeholder="Enter Min Height/Width"
              min={0}
              max={3000}
              value={pictureMinHWValue}
              onChange={(value) => {
                setPictureMinHWValue(value)
              }}
              required={true}
            />
            <InputNumber
              className="w-1/2"
              placeholder="Enter Max Height/Width"
              min={1}
              max={3000}
              value={pictureMaxHWValue}
              onChange={(value) => {
                setPictureMaxHWValue(value)
              }}
              required={true}
            />
          </div>
          <Checkbox
            value={picturePreviewValue}
            onChange={(e) => {
              setPicturePreviewValue(e.target.checked)
            }}
          >
            Show Picture Preview
          </Checkbox>
          <Checkbox
            value={pictureRequireValue}
            onChange={(e) => {
              setPicturePreviewValue(e.target.checked)
            }}
          >
            Required?
          </Checkbox>
        </div>
      </Modal>
    </div>
  )
}

export default AddPictureUpload
