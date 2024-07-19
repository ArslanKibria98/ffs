import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Checkbox2 } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioButton({
  getter,
  setter,
  formDataApi,
  resetForm,
  isUpdate = false,
  updateFieldData = null,
}) {
  const [radiosType, setRadiosType] = useState("manual");

  return (
    <div>
      <DialogTitle>Add Radio Button</DialogTitle>
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
                Caption
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
                Choice A
              </label>
              <Input name="minLen" placeholder="0" className="p-4 h-[48px]" />
            </div>
            <div>
              <label htmlFor="maxLen" className="text-xs font-semibold">
                Choice B
              </label>
              <Input name="maxLen" placeholder="0" className="p-4 h-[48px]" />
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
                Caption
              </label>
              <Input
                name="tabName"
                placeholder="Paste API endpoint URL"
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
          </div>
          <div className="flex flex-row-reverse gap-4 py-1 my-4 pb-28">
            <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]">
              Get List
            </Button>
          </div>
        </>
      )}

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]">
          Save
        </Button>

        <DialogClose className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
