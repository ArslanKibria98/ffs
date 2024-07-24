import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Checkbox2 } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function DropDown({
  getter,
  setter,
  formDataApi,
  resetForm,
  isUpdate = false,
  updateFieldData = null,
}) {
  const [radiosType, setRadiosType] = useState("manual");
  const [endpoint, setEndpoint] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);

  async function inflateOptions() {
    try {
      const response = await axios.get(endpoint);
  
      if (response.ok) {
        const responseOptions = await response.json();
        setDropdownOptions(responseOptions?.data)
      }
    } catch (e) {
      toast.error(e?.message);
      console.log(e)
    }
  }

  function removedArray(array, index) {
    let editableArray = array;
    editableArray.splice(index, 1);
    return editableArray;
  }

  return (
    <div>
      <DialogTitle>Add Dropdown</DialogTitle>
      <br />
      <RadioGroup
        className="flex gap-4"
        onValueChange={setRadiosType}
        defaultValue={radiosType}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem
            value="manual"
            id="manual"
            className="border-red-500"
          />
          <Label htmlFor="manual">Manual Input</Label>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="api" id="api" className="border-red-500" />
          <Label htmlFor="api">Fetch List using API</Label>
        </div>
      </RadioGroup>
      <br />
      {radiosType == "manual" ? (
        <>
          <div className="grid grid-cols-2 gap-8 gap-y-3">
            <div className="col-span-2">
              <label htmlFor="tabName" className="text-[16px] font-semibold">
                Question
              </label>
              <Input
                name="tabName"
                placeholder="Type Here"
                className="p-4 h-[48px]"
              />
            </div>
            <div className="my-4 col-span-2 flex items-center space-x-2">
              <Checkbox2 />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required?
              </label>
            </div>

            <label className="text-[16px] font-semibold col-span-2">
              Choices
            </label>
            <div>
              <label htmlFor="minLen" className="text-xs font-semibold">
                Label
              </label>
              <Input name="minLen" placeholder="Enter Label" className="p-4 h-[48px]" />
            </div>
            <div>
              <label htmlFor="maxLen" className="text-xs font-semibold">
                Value
              </label>
              <Input name="maxLen" placeholder="Enter Value" className="p-4 h-[48px]" />
            </div>
          </div>
          <div className="flex flex-row-reverse gap-4 py-1 my-4">
            <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]">
              + Add
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-8 gap-y-3">
            <div className="col-span-2">
              <label htmlFor="tabName" className="text-[16px] font-semibold">
                Question
              </label>
              <Input
                name="tabName"
                placeholder="Type Here"
                className="p-4 h-[48px]"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="tabName" className="text-[16px] font-semibold">
                API Endpoint
              </label>
              <Input
                name="tabName"
                placeholder="Paste API endpoint URL"
                className="p-4 h-[48px]"
                value={endpoint}
                onValueChange={(e)=>setEndpoint(e?.target?.value)}
              />
            </div>
            <div className="my-4 col-span-2 flex items-center space-x-2">
              <Checkbox2 />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required?
              </label>
            </div>

            <label className="text-[16px] font-semibold col-span-2">
              Choices
            </label>

            {dropdownOptions.length > 0 && dropdownOptions.map((option, index) => (
              <div key={index} className="col-span-2 grid grid-cols-7 gap-8 gap-y-3">
                <div className="col-span-3">
                  <label htmlFor="minLen" className="text-xs font-semibold">
                    Label
                  </label>
                  <Input name="minLen" value={option?.label} className="p-4 h-[48px]" readonly/>
                </div>
                <div className="col-span-3">
                  <label htmlFor="maxLen" className="text-xs font-semibold">
                    Value
                  </label>
                  <Input name="maxLen" value={option?.value} className="p-4 h-[48px]" readonly/>
                </div>
                <Button variant="destructive" onClick={()=>{setDropdownOptions(removedArray(dropdownOptions, index))}} className="">❌</Button>
              </div>
            ))}
          </div>
          {dropdownOptions.length < 1 && (
            <div className="flex flex-row-reverse gap-4 py-1 my-4 pb-28">
              <Button onClick={()=>inflateOptions()} className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]">
                Get List
              </Button>
            </div>
          )}
        </>
      )}

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]">
          Save
        </Button>

        <DialogClose className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          {/* <Button
            className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
          > */}
          Cancel
          {/* </Button> */}
        </DialogClose>
      </div>
    </div>
  );
}
