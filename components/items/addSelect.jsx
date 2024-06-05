'use client'
// Import necessary modules from 'antd'
import React, { useState } from 'react'
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd'

// Define the AddSelect component
const AddSelect = ({ data, update, tags }) => {
  // State variables
  const [showPopup, setShowPopup] = useState(false)
  const [selectTypeValue, setSelectTypeValue] = useState('')
  const [selectLabelValue, setSelectLabelValue] = useState('')
  const [selectNameValue, setSelectNameValue] = useState('')
  const [selectDefaultValue, setSelectDefaultValue] = useState('')
  const [selectRequireValue, setSelectRequireValue] = useState(false)
  const [selectOptionsValue, setSelectOptionsValue] = useState([])
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name)
  const [selectedTag, setSelectedTag] = useState('')

  // Function to handle adding a step
  const handleAddStep = () => {
    // Validate input values
    if (selectLabelValue === '' || selectNameValue === '') {
      alert('Cannot add field without details!')
      return
    }

    // Create field object
    let fieldToAdd = {
      type: 'select',
      selectType: selectTypeValue,
      name: selectNameValue,
      label: selectLabelValue,
      default: selectDefaultValue,
      options: selectOptionsValue,
      required: selectRequireValue,
      tags: [selectedTag]
    }

    // Update data with the new field
    let filteredSteps = data?.steps?.map((step) =>
      step?.step_name === stepValue
        ? {
            ...step,
            fields: [...step.fields, fieldToAdd]
          }
        : step
    )

    update({
      ...data,
      steps: filteredSteps
    })

    // Reset state values
    setShowPopup(false)
    setSelectTypeValue('')
    setSelectLabelValue('')
    setSelectNameValue('')
    setSelectDefaultValue('')
    setSelectOptionsValue([])
    setSelectRequireValue(false)
    setSelectedTag('')
  }

  // Function to handle step change
  const onStepChange = (value) => {
    setStep(value)
  }

  // Function to handle option deletion
  const handleDelete = (indexToDelete) => {
    setSelectOptionsValue((prevOptions) =>
      prevOptions.filter((_, index) => index !== indexToDelete)
    )
  }

  // Function to handle tag selection
  const onTagSelect = (value) => {
    setSelectedTag(value)
  }

  // Return JSX
  return (
    <div>
      {/* Button to trigger the modal */}
      <button
        className="border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1"
        onClick={() => setShowPopup(true)}
      >
        Add Select
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
          className="lucide lucide-chevron-down-square"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m16 10-4 4-4-4" />
        </svg>
      </button>

      {/* Modal for adding select field */}
      <Modal
        title="Add Select"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
      >
        <div className="flex flex-col gap-2">
          {/* Step dropdown */}
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
          {/* Select Type dropdown */}
          Select Type:
          <Select
            className="w-full"
            value={selectTypeValue}
            onChange={setSelectTypeValue}
            options={[
              { label: 'Single Select', value: 'single' },
              { label: 'Multi Select', value: 'multiple' }
            ]}
            required={true}
          />
          Selects Details:
          <Input
            placeholder="Enter Field Label"
            value={selectLabelValue}
            onChange={(e) => setSelectLabelValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter Field Name"
            value={selectNameValue}
            onChange={(e) => setSelectNameValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter Default Value"
            value={selectDefaultValue}
            onChange={(e) => setSelectDefaultValue(e.target.value)}
            required={true}
          />
          Tags:
          <Select
            className="w-full"
            value={selectedTag}
            onChange={onTagSelect}
            options={tags.map((tag) => ({
              label: tag,
              value: tag
            }))}
            required={true}
          />
          Add Select Options
          <Input
            placeholder="Enter Field Name"
            onPressEnter={(e) => {
              setSelectOptionsValue([
                ...selectOptionsValue,
                { label: e.target.value, value: '' }
              ])
              e.target = ''
            }}
            required={true}
          />
          {/* Display added options */}
          <div className="flex flex-col gap-2">
            {selectOptionsValue.map((option, index) => (
              <div key={index} className="flex w-full gap-2">
                <div className="flex justify-between bg-slate-100 p-1 px-4 w-full border rounded-lg">
                  {option.label}
                </div>
                <Input
                  placeholder="Value"
                  value={option.value}
                  onChange={(e) => {
                    const updatedOptions = [...selectOptionsValue]
                    updatedOptions[index] = {
                      ...option,
                      value: e.target.value
                    }
                    setSelectOptionsValue(updatedOptions)
                  }}
                  required={true}
                />
                <button
                  className="border rounded-lg bg-slate-200 w-[100px]"
                  onClick={() => handleDelete(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          {/* Checkbox for Required */}
          <Checkbox
            onChange={(e) => {
              setSelectRequireValue(e.target.checked)
            }}
          >
            Required?
          </Checkbox>
        </div>
      </Modal>
    </div>
  )
}

// Export the component
export default AddSelect
