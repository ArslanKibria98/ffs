import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Checkbox2 } from "@/components/ui/checkbox";

export default function RadioButton({
  getter,
  setter,
  formDataApi,
  resetForm,
  isUpdate = false, updateFieldData = null
}) {
  return (
    <div>
      <DialogTitle>Add Radio Button</DialogTitle>
      <br />
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

        <label className="text-[16px] font-semibold col-span-2">Choices</label>

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
