"use client"
// Import necessary modules from 'antd'
import React, { useState,useEffect } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd';

// Define the AddTextArea component
const AddTextArea = ({ data, update, tags }) => {
  // State variables
  const [showPopup, setShowPopup] = useState(false);
  const [inputLabelValue, setInputLabelValue] = useState('');
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputPlaceValue, setInputPlaceValue] = useState('');
  const [inputRequireValue, setInputRequireValue] = useState(false);
  const [inputRowsValue, setInputRowsValue] = useState(1);
  const [inputColsValue, setInputColsValue] = useState(1);
  const [inputMinValue, setInputMinValue] = useState(0);
  const [inputMaxValue, setInputMaxValue] = useState(1);
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name);
  const [selectedTag, setSelectedTag] = useState('');

  // Function to handle adding a step
  const handleAddStep = () => {
    // Validate input values
    if (inputLabelValue === "" || inputNameValue === "" || inputPlaceValue === "") {
      alert("Cannot add field without details!");
      return;
    }

    // Create field object
    let fieldToAdd = {
      type: "textarea",
      name: inputLabelValue,
      label: inputNameValue,
      placeholder: inputPlaceValue,
      rows: inputRowsValue,
      cols: inputColsValue,
      minLength: inputMinValue,
      maxLength: inputMaxValue,
      required: inputRequireValue,
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
    setInputLabelValue('');
    setInputNameValue('');
    setInputPlaceValue('');
    setInputRequireValue(false);
    setInputRowsValue(1);
    setInputColsValue(1);
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
        Add Text Area
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
      </button>

      {/* Modal for adding input field */}
      <Modal
        title="Add Text Area"
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
          {/* Textarea Rows Input */}
          Textarea Rows:
          <InputNumber 
            className='w-full'
            placeholder="Enter Text Area Rows"
            defaultValue={inputRowsValue} 
            min={1} max={20}
            onChange={(value)=>{setInputRowsValue(value);}}
            required={true}
          />

          {/* Textarea Cols Input */}
          Textarea Cols:
          <InputNumber 
            className='w-full'
            placeholder="Enter Text Area Cols"
            defaultValue={inputColsValue} 
            min={1} max={20}
            onChange={(value)=>{setInputColsValue(value);}}
            required={true}
          />

          {/* Min and Max Length Inputs */}
          Min length:
          <InputNumber 
            className='w-full'
            placeholder="Enter Min Length" 
            min={inputMinValue} max={1000}
            defaultValue={inputMinValue} 
            onChange={(value)=>{
              setInputMinValue(value); 
              inputMaxValue < inputMinValue ?? setInputMaxValue(inputMinValue+1)
            }}
            required={true}
          />

          Max Length:
          <InputNumber 
            className='w-full'
            placeholder="Enter Max Length" 
            min={inputMinValue + 1} max={1000}
            defaultValue={inputMinValue + 1}
            onChange={(value)=>{setInputMaxValue(value)}}
            required={true}
          />

          {/* Checkbox for Required */}
          <Checkbox onChange={(e) => { setInputRequireValue(e.target.checked) }}>Required?</Checkbox>          
        </div>
      </Modal>
    </div>
  );
}

export default AddTextArea;
