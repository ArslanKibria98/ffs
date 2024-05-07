"use client"
import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const AddStep = ({ data, update }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [onComplete, setOnComplete] = useState('');
  const [stepCompleteBtn, setStepCompleteBtn] = useState('');

  const handleAddStep = () => {
    const isStepNameExists = data?.steps?.some(step => step.step_name === inputValue);
    if (isStepNameExists) {
      alert("Error! Step with the same name already exists!");
      return;
    }

    let multiStep = data?.steps?.length > 0 ? true : false;

    update({
      ...data,
      multi_step: multiStep,
      steps: [
        ...data?.steps,
        {
          "step_name": inputValue,
          "onStepComplete": onComplete,
          "stepCompleteBtn": stepCompleteBtn,
          "fields": []
        }
      ]
    })

    setShowPopup(false);
    setInputValue('');
    setOnComplete('');
    setStepCompleteBtn('');
  };

  return (
    <div>
      <button className='border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
        Add Step
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-to-line"><path d="M17 12H3" /><path d="m11 18 6-6-6-6" /><path d="M21 5v14" /></svg>
      </button>

      <Modal
        title="Add Step"
        open={showPopup}
        onOk={handleAddStep}
        onCancel={() => setShowPopup(false)}
        okText={'Add'}
        okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
      >
        Step Name:
        <Input
          placeholder="Enter step name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <br />
        <br />

        On Complete (Optional):
        <Input
          placeholder="Enter API to run on completing step."
          value={onComplete}
          onChange={(e) => setOnComplete(e.target.value)}
        />
        <br />
        <br />

        Step Complete Button Text (Optional):
        <Input
          placeholder="Enter text to show on step complete button."
          value={onComplete}
          onChange={(e) => setOnComplete(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AddStep;
