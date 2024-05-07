"use client"
import React, { useState } from 'react';
import { Modal, Select, Input } from 'antd';

const AddHeading = ({ data, update ,tags}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [headingTypeValue, setHeadingTypeValue] = useState('');
  const [headingLabelValue, setHeadingLabelValue] = useState('');
  const [stepValue, setStep] = useState(data?.steps[0]?.step_name);
  const [selectedTag, setSelectedTag] = useState('');

  const handleAddStep = () => {
    if (headingTypeValue == "" || headingLabelValue == "") {
      alert("Cannot add field without details!")
      return;
    }

    let fieldToAdd = {
      type: "heading",
      size: headingTypeValue,
      label: headingLabelValue,
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
    setHeadingTypeValue('')
    setHeadingLabelValue('');
    setSelectedTag('')
  };

  const onStepChange = (value) => {
    setStep(value);
  };

  return (
    <div>
      <button className='border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
        Add Heading
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heading"><path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/></svg>
      </button>

      {/* Insert Modal here and relevent functions/fields inside the modal */}
      <Modal
        title="Add Heading"
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

          Heading Type:
          <Select
            className='w-full'
            value={headingTypeValue}
            onChange={setHeadingTypeValue}
            options={[
              {label: "H1", value: "h1"}, 
              {label: "H2", value: "h2"}, 
              {label: "H3", value: "h3"}, 
              {label: "H4", value: "h4"}, 
              {label: "H5", value: "h5"}, 
              {label: "H6", value: "h6"}
            ]}
            required={true}
          />

          Heading Label:
          <Input
            placeholder="Enter Heading Label"
            value={headingLabelValue}
            onChange={(e) => setHeadingLabelValue(e.target.value)}
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

export default AddHeading