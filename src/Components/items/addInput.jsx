"use client"
// Import necessary modules from 'antd'
import React, { useState } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd';

// Define the AddInput component
const AddInput = ({ data, update, tags }) => {
  // State variables
  const [showPopup, setShowPopup] = useState(false);
  const [inputTypeValue, setInputTypeValue] = useState('');
  const [inputLabelValue, setInputLabelValue] = useState('');
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputPlaceValue, setInputPlaceValue] = useState('');
  const [inputRequireValue, setInputRequireValue] = useState(false);
  const [inputMinValue, setInputMinValue] = useState(0);
  const [inputMaxValue, setInputMaxValue] = useState(1);
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name);
  const [selectedTag, setSelectedTag] = useState(tags[0]);

  // Function to handle adding a step
  const handleAddStep = () => {
    // Validate input values
    if (inputTypeValue === "" || inputLabelValue === "" || inputNameValue === "" || inputPlaceValue === "") {
      alert("Cannot add field without details!");
      return;
    }

    // Create field object
    let fieldToAdd = {
      type: inputTypeValue,
      name: inputLabelValue,
      label: inputNameValue,
      placeholder: inputPlaceValue,
      required: inputRequireValue,
      minLength: inputMinValue,
      maxLength: inputMaxValue,
      tag: selectedTag,
    };

    // Update data with the new field
    let filteredSteps = data?.steps?.map((step) =>
      step?.step_name === stepValue
        ? {
            ...step,
            fields: [...step.fields, fieldToAdd],
          }
        : step
    );

    update({
      ...data,
      steps: filteredSteps,
    });

    // Reset state values
    setShowPopup(false);
    setInputTypeValue('');
    setInputLabelValue('');
    setInputNameValue('');
    setInputPlaceValue('');
    setInputRequireValue(false);
    setInputMinValue(0);
    setInputMaxValue(1);
    setSelectedTag('');
  };

  // Function to handle step change
  const onStepChange = (value) => {
    setStep(value);
  };

  // Function to handle tag selection
  const handleTagChange = (value) => {
    setSelectedTag(value);
  };

  // Return JSX
  return (
    <div>
      {/* Button to trigger the modal */}
      <button className='border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
        Add Input
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-text-cursor-input"><path d="M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1"/><path d="M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5"/><path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"/><path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"/><path d="M9 7v10"/></svg>
      </button>

      {/* Modal for adding input field */}
      <Modal
        title="Add Input Field"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
      >
        <div className='flex flex-col gap-2'>
          {/* Step dropdown */}
          Step:
          <Select
            className='w-full'
            value={stepValue}
            onChange={onStepChange}
            options={data?.steps.map((step) => ({
              label: step?.step_name,
              value: step?.step_name,
            }))}
            required={true}
          />

          {/* Field Type dropdown */}
          Field Type:
          <Select
            className='w-full'
            value={inputTypeValue}
            onChange={setInputTypeValue}
            options={[
              { label: "Text", value: "text" },
              { label: "Number", value: "number" },
              { label: "Email", value: "email" },
              { label: "Password", value: "password" },
            ]}
            required={true}
          />

          {/* Field Details Input */}
          Field Details:
          <Input
            placeholder="Enter Field Label"
            value={inputLabelValue}
            onChange={(e) => setInputLabelValue(e.target.value)}
            required={true}
          />

          <Input
            placeholder="Enter Field Name"
            value={inputNameValue}
            onChange={(e) => setInputNameValue(e.target.value)}
            required={true}
          />

          <Input
            placeholder="Enter Field Placeholder"
            value={inputPlaceValue}
            onChange={(e) => setInputPlaceValue(e.target.value)}
            required={true}
          />

          {/* Tags dropdown */}
          Tag:
          <Select
            className='w-full'
            value={selectedTag}
            onChange={handleTagChange}
            options={tags.map((tag) => ({
              label: tag,
              value: tag,
            }))}
            required={true}
          />

          {/* Min and Max Length Inputs */}
          Min length:
          <InputNumber
            className='w-full'
            placeholder="Enter Min Length"
            min={inputMinValue}
            max={100}
            defaultValue={inputMinValue}
            onChange={(value) => {
              setInputMinValue(value);
              inputMaxValue < inputMinValue ?? setInputMaxValue(inputMinValue + 1);
            }}
            required={true}
          />

          Max Length:
          <InputNumber
            className='w-full'
            placeholder="Enter Max Length"
            min={inputMinValue + 1}
            max={100}
            defaultValue={inputMinValue + 1}
            onChange={(value) => setInputMaxValue(value)}
            required={true}
          />

          {/* Checkbox for Required */}
          <Checkbox onChange={(e) => { setInputRequireValue(e.target.checked) }}>Required?</Checkbox>
        </div>
      </Modal>
    </div>
  );
}

export default AddInput;
