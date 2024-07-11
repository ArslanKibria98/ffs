import React, { useEffect, useState } from 'react'
import { Modal, Input, Button } from 'antd'
import { Skeleton } from '@/components/ui/skeleton'

import TagsManager from './tagsManager'

const FormSettings = ({ data, update, tags, tagUpdate, dataStatus }) => {
  const [fName, setFName] = useState(data?.formName)
  const [fSubmit, setFSubmit] = useState(data?.onSubmit)
  const [fSuccess, setFSuccess] = useState(data?.successMsg)
  const [fError, setFError] = useState(data?.errorMsg)

  // console.log(data, fName);
  // useEffect(()=>{
  //     setFName(data?.formName);
  //     setFSubmit(data?.onSubmit);
  //     setFSuccess(data?.successMsg);
  //     setFError(data?.errorMsg);
  // }, [data])

  return (
    <div className="px-4 py-2">
      <p className="text-lg font-semibold underline">Form Settings</p>
      {/* {dataStatus ? ( */}
      <div className="grid grid-cols-5 gap-4">
        <div className="flex flex-col col-span-2">
          <label htmlFor="">Form Name:</label>
          <Input
            className="border rounded shadow p-2"
            type="text"
            placeholder="Form Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            onBlur={() => {
              update({ ...data, formName: fName })
            }}
          />

          <label htmlFor="">On Submit:</label>
          <Input
            className="border rounded shadow p-2"
            type="text"
            placeholder="On Submit"
            value={fSubmit}
            onChange={(e) => setFSubmit(e.target.value)}
            onBlur={() => {
              update({ ...data, onSubmit: fSubmit })
            }}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="">Success Msg:</label>
          <Input
            className="border rounded shadow p-2"
            type="text"
            placeholder="Success Msg"
            value={fSuccess}
            onChange={(e) => setFSuccess(e.target.value)}
            onBlur={() => {
              update({ ...data, successMsg: fSuccess })
            }}
          />

          <label htmlFor="">Fail Msg:</label>
          <Input
            className="border rounded shadow p-2"
            type="text"
            placeholder="Fail Msg"
            value={fError}
            onChange={(e) => setFError(e.target.value)}
            onBlur={() => {
              update({ ...data, errorMsg: fError })
            }}
          />
        </div>

        <div className="flex flex-col col-span-1">
          <p>My Tags:</p>
          <TagsManager tags={tags} tagUpdate={tagUpdate} />

          <p>Tags Available:</p>
          <div className="flex flex-row flex-nowrap p-1 gap-1 overflow-x-auto overflow-y-hidden">
            {tags?.map((tag, index) => {
              return (
                <div
                  key={index}
                  className="border bg-slate-100 rounded-full p-1 px-3 whitespace-pre"
                >
                  #{tag}
                </div>
              )
            })}
            {tags?.length < 1 ? 'No tags found!' : ''}
          </div>
        </div>
      </div>
      {/* ) : (<div className='pt-1'>
                <Skeleton className="h-[125px] w-full rounded-xl  bg-gray-200" />
            </div>)} */}
    </div>
  )
}

export default FormSettings
