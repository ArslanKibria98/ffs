'use client'
import React, { useState } from 'react'
import { Modal, Input, Select, Checkbox } from 'antd'

const AddCheckbox = ({ data, update, tags }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [checkboxLabelValue, setCheckboxLabelValue] = useState('')
  const [checkboxNameValue, setCheckboxNameValue] = useState('')
  const [checkboxValue, setCheckboxValue] = useState('')
  const [checkboxRequireValue, setCheckboxRequireValue] = useState(false)
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name)
  const [selectedTag, setSelectedTag] = useState(tags[0])

  const handleAddStep = () => {
    if (checkboxLabelValue == '' || checkboxNameValue == '') {
      alert('Cannot add field without details!')
      return
    }

    let fieldToAdd = {
      type: 'checkbox',
      name: checkboxNameValue,
      label: checkboxLabelValue,
      value: checkboxValue,
      required: checkboxRequireValue,
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
    setCheckboxLabelValue('')
    setCheckboxNameValue('')
    setCheckboxValue('')
    setCheckboxRequireValue(false)
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
        Add Checkbox
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
          className="lucide lucide-check-square-2"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Checkbox"
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
          Checkboxs Details:
          <Input
            placeholder="Enter Checkbox Label"
            value={checkboxLabelValue}
            onChange={(e) => setCheckboxLabelValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter Checkbox Name"
            value={checkboxNameValue}
            onChange={(e) => setCheckboxNameValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter Checkbox Value"
            value={checkboxValue}
            onChange={(e) => setCheckboxValue(e.target.value)}
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
          <Checkbox
            onChange={(e) => {
              setCheckboxRequireValue(e.target.checked)
            }}
          >
            Required?
          </Checkbox>
        </div>
      </Modal>
    </div>
  )
}

export default AddCheckbox
