'use client'
import React, { useState } from 'react'
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd'

const AddRadios = ({ data, update, tags }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [radioLabelValue, setRadioLabelValue] = useState('')
  const [radioNameValue, setRadioNameValue] = useState('')
  const [radioRequireValue, setRadioRequireValue] = useState(false)
  const [radioOptionsValue, setRadioOptionsValue] = useState([])
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name)
  const [selectedTag, setSelectedTag] = useState(tags[0])

  let radioOptionsTest

  const handleAddStep = () => {
    if (radioLabelValue == '' || radioNameValue == '') {
      alert('Cannot add field without details!')
      return
    }

    let fieldToAdd = {
      type: 'radio',
      name: radioNameValue,
      label: radioLabelValue,
      options: radioOptionsValue,
      required: radioRequireValue,
      tag: selectedTag
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
    setRadioLabelValue('')
    setRadioNameValue('')
    setRadioOptionsValue([])
    setRadioRequireValue(false)
    setSelectedTag('')
  }
  const handleTagChange = (value) => {
    setSelectedTag(value)
  }
  const onStepChange = (value) => {
    setStep(value)
  }
  const handleDelete = (indexToDelete) => {
    setRadioOptionsValue((prevOptions) =>
      prevOptions.filter((_, index) => index !== indexToDelete)
    )
  }

  return (
    <div>
      <button
        className="border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1"
        onClick={() => setShowPopup(true)}
      >
        Add Radios
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
          className="lucide lucide-circle-dot"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Radios"
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
          Radios Details:
          <Input
            placeholder="Enter Field Label"
            value={radioLabelValue}
            onChange={(e) => setRadioLabelValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter Field Name"
            value={radioNameValue}
            onChange={(e) => setRadioNameValue(e.target.value)}
            required={true}
          />
          Tag:
          <Select
            className="w-full"
            value={selectedTag}
            onChange={handleTagChange}
            options={tags.map((tag) => ({
              label: tag,
              value: tag
            }))}
            required={true}
          />
          Add Radio Options
          <Input
            placeholder="Enter Field Name"
            // value={radioOptionsTest}
            // onChange={(e) => {radioOptionsTest = e.target.value}}
            onPressEnter={(e) => {
              setRadioOptionsValue([
                ...radioOptionsValue,
                { label: e.target.value, value: '' }
              ])
              e.target = ''
            }}
            required={true}
          />
          <div className="flex flex-row gap-2">
            {/* {radioOptionsValue.map((option, index) => (
                            <div key={index} className='flex bg-slate-100 p-1 w-min border rounded-lg'>
                                {option} 
                                &nbsp;&nbsp; 
                                <button onClick={() => handleDelete(index)}>❌</button>
                            </div>
                        ))} */}
            {radioOptionsValue.map((option, index) => (
              <div key={index} className="flex w-full gap-2">
                <div className="flex justify-between bg-slate-100 p-1 px-4 w-full border rounded-lg">
                  {option.label}
                </div>
                <Input
                  placeholder="Value"
                  value={option.value}
                  onChange={(e) => {
                    const updatedOptions = [...radioOptionsValue]
                    updatedOptions[index] = { ...option, value: e.target.value }
                    setRadioOptionsValue(updatedOptions)
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
          <Checkbox
            onChange={(e) => {
              setRadioRequireValue(e.target.checked)
            }}
          >
            Required?
          </Checkbox>
        </div>
      </Modal>
    </div>
  )
}

export default AddRadios
