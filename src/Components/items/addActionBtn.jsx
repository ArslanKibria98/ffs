"use client"
import React, { useState } from 'react';
import { Modal, Select, Input } from 'antd';

const AddActionBtn = ({ data, update ,tags}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [actionTypeValue, setActionTypeValue] = useState('');
  const [actionLabelValue, setActionLabelValue] = useState('');
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name);
  const [selectedTag, setSelectedTag] = useState('');

  const handleAddStep = () => {
    if (actionTypeValue == "" || actionLabelValue == "") {
      alert("Cannot add field without details!")
      return;
    }

    let fieldToAdd = {
      type: "actionBtn",
      size: actionTypeValue,
      label: actionLabelValue,
      tags: selectedTag

    };

    let filteredSteps = data?.steps?.map((step) => {
      console.log(step?.step_name);
      return step?.step_name === stepValue
        ? {
          ...step,
          fields: [...step.fields, fieldToAdd]
        }
        : step;
    });

    update({
      ...data,
      steps: filteredSteps,
    });

    setShowPopup(false);
    setActionTypeValue('')
    setActionLabelValue('');
    setSelectedTag('')
  };

  const onStepChange = (value) => {
    setStep(value);
  };

  return (
    <div>
      <button className='border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
        Add Action Button
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-octagon-alert"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Action Button"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
      >
        <div className='flex flex-col gap-2'>
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

          Action Type:
          <Select
            className='w-full'
            value={actionTypeValue}
            onChange={setActionTypeValue}
            options={[
              {label: "Select Action type", value: ""}, 
              {label: "API Call", value: "api"}, 
              {label: "Redirect", value: "redirect"}
            ]}
            required={true}
          />

          Action Button Label:
          <Input
            placeholder="Enter Action Button Label"
            value={actionLabelValue}
            onChange={(e) => setActionLabelValue(e.target.value)}
            required={true}
          />
            Tags:
          <Select
            className='w-full'
            value={selectedTag}
            onChange={(e) => setSelectedTag(e)}
            options={tags.map((tag) => ({
              label: tag,
              value: tag,
            }))}
            required={true}
          />
        </div>
      </Modal>
    </div>
  )
}

export default AddActionBtn