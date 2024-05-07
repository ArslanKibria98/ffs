"use client"
import React, { useState } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox } from 'antd';

const AddFileUpload = ({ data, update, tags }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [fileTypesValue, setFileTypesValue] = useState([]);
    const [fileCountValue, setFileCountValue] = useState(1);
    const [fileMinSizeValue, setFileMinSizeValue] = useState();
    const [fileMaxSizeValue, setFileMaxSizeValue] = useState();
    const [fileNameValue, setFileNameValue] = useState('');
    const [fileLabelValue, setFileLabelValue] = useState('');
    const [filePreviewValue, setFilePreviewValue] = useState(false);
    const [fileRequireValue, setFileRequireValue] = useState(false);
    const [stepValue, setStep] = useState(data?.steps[0]?.step_name);
    const [selectedTag, setSelectedTag] = useState('');


    const handleAddStep = () => {
        if (fileNameValue == "" || fileLabelValue == "") {
            alert("Cannot add field without details!")
            return;
        }

        let fieldToAdd = {
            type: "fileUpload",
            name: fileNameValue,
            label: fileLabelValue,
            formats: fileTypesValue,
            count: fileCountValue,
            minSize: fileMinSizeValue,
            maxSize: fileMaxSizeValue,
            preview: filePreviewValue,
            required: fileRequireValue,
            tags: selectedTag,

        };

        let filteredSteps = data?.steps?.map((step) => {
            console.log(step?.step_name);
            return step?.step_name === stepValue ? {
                ...step,
                fields: [...step.fields, fieldToAdd]
            } : step;
        });

        update({
            ...data,
            steps: filteredSteps,
        });

        setShowPopup(false);
        setFileNameValue('');
        setFileLabelValue('');
        setFileTypesValue([]);
        setFileCountValue(1);
        setFileMinSizeValue(null);
        setFileMaxSizeValue(null);
        setFilePreviewValue(false);
        setFileRequireValue(false);
        setSelectedTag('');

    };

    const onStepChange = (value) => {
        setStep(value);
    };
    const handleDelete = (indexToDelete) => {
        setFileTypesValue(prevOptions => (
            prevOptions.filter((_, index) => index !== indexToDelete)
        ));
    };
    

    return (
        <div>
            <button className='border rounded border-red-200 bg-red-100 min-w-[150px] w-full flex justify-between px-4 p-1' onClick={() => setShowPopup(true)}>
                Add File Upload
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-up"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></svg>
            </button>

            {/* Insert Modal here and relevent functions/fields inside the modal */}
            <Modal
                title="Add File Upload"
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

                    File Upload Details:
                    <Input
                        placeholder="Enter File Upload Name"
                        value={fileNameValue}
                        onChange={(e) => setFileNameValue(e.target.value)}
                        required={true}
                    />

                    <Input
                        placeholder="Enter File Upload Label"
                        value={fileLabelValue}
                        onChange={(e) => setFileLabelValue(e.target.value)}
                        required={true}
                    />

                    Add File Formats
                    <Input
                        placeholder="Enter File Upload Formats"
                        onPressEnter={(e) => {setFileTypesValue([ ...fileTypesValue, e.target.value ]); e.target = ""}}
                        required={true}
                    />
                    <div className='flex flex-col gap-2'>
                        {fileTypesValue.map((option, index) => (
                            <div key={index} className='w-full flex gap-2'>
                                <div className='flex justify-between bg-slate-100 p-1 px-4 w-full border rounded-lg'>
                                    {option}
                                </div>
                                <button className='border rounded-lg bg-slate-200 w-[60px]' onClick={() => handleDelete(index)}>❌</button>
                            </div>
                        ))}
                    </div>
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
                    Files Count:
                    <InputNumber 
                        className='w-full'
                        placeholder="Enter Files Count"
                        min={1} max={15}
                        onChange={(value)=>{setFileCountValue(value)}}
                        required={true}
                    />

                    File Size (MB):
                    <div className='flex gap-2'>
                        <InputNumber 
                            className='w-1/2'
                            placeholder="Enter File Min Size"
                            min={0} max={50}
                            value={fileMinSizeValue}
                            onChange={(value)=>{setFileMinSizeValue(value)}}
                            required={true}
                        />
                        <InputNumber 
                            className='w-1/2'
                            placeholder="Enter File Max Size"
                            min={1} max={50}
                            value={fileMaxSizeValue}
                            onChange={(value)=>{setFileMaxSizeValue(value)}}
                            required={true}
                        />
                    </div>

                    <Checkbox value={filePreviewValue} onChange={(e) => { setFilePreviewValue(e.target.checked) }}>Show File Preview</Checkbox>

                    <Checkbox value={fileRequireValue} onChange={(e) => { setFilePreviewValue(e.target.checked) }}>Required?</Checkbox>
                </div>
            </Modal>
        </div>
    )
}

export default AddFileUpload