'use client'
import React, { useState } from 'react'
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd'

const AddOtp = ({ data, update, tags }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [inputLabelValue, setInputLabelValue] = useState('')
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputLengthValue, setInputLengthValue] = useState(4)
  const [inputRequireValue, setInputRequireValue] = useState(false)
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name)
  const [selectedTag, setSelectedTag] = useState(tags[0])

  const handleAddStep = () => {
    if (inputLabelValue == '' || inputNameValue == '') {
      alert('Cannot add field without details!')
      return
    }

    let fieldToAdd = {
      type: 'otp',
      name: inputLabelValue,
      label: inputNameValue,
      otpLength: inputLengthValue,
      required: inputRequireValue,
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
    setInputLabelValue('')
    setInputNameValue('')
    setInputLengthValue(4)
    setInputRequireValue(false)
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
        Add OTP
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
          className="lucide lucide-message-square-more"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add OTP Field"
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
          OTP Details:
          <Input
            placeholder="Enter OTP Label"
            value={inputLabelValue}
            onChange={(e) => setInputLabelValue(e.target.value)}
            required={true}
          />
          <Input
            placeholder="Enter OTP Name"
            value={inputNameValue}
            onChange={(e) => setInputNameValue(e.target.value)}
            required={true}
          />
          OTP Length:
          <InputNumber
            className="w-full"
            placeholder="Enter Max Length"
            min={4}
            max={8}
            defaultValue={4}
            onChange={(value) => {
              setInputLengthValue(value)
            }}
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
              setInputRequireValue(e.target.checked)
            }}
          >
            Required?
          </Checkbox>
        </div>
      </Modal>
    </div>
  )
}

export default AddOtp
