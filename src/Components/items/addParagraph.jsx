"use client"
import React, { useState } from 'react';
import { Modal, Select, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const AddParagraph = ({ data, update ,tags}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [paragraphValue, setParagraphValue] = useState('');
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name);
  const [selectedTag, setSelectedTag] = useState(tags[0]);


  const handleAddStep = () => {
    if (paragraphValue == "") {
      alert("Cannot add field without details!")
      return;
    }

    let fieldToAdd = {
      type: "paragraph",
      paragraph: paragraphValue,
      tags:selectedTag
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
    setParagraphValue('')
    setSelectedTag('')
  };

  const onStepChange = (value) => {
    setStep(value);
  };

  return (
    <div>
      <button className='border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
        Add Paragraph
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pilcrow"><path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/></svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Paragraph Field"
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

          Paragraph:
          <TextArea
            placeholder="Enter Paragraph"
            value={paragraphValue}
            onChange={(e) => setParagraphValue(e.target.value)}
            required={true}
          />
                       Tag:
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

export default AddParagraph