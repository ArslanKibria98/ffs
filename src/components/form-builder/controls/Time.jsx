import React, { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Checkbox2 } from "@/components/ui/checkbox";

export default function Time({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  const timeFormats = [
    "5/04/2003 (mm/dd/yyyy)",
    "3/04/2003 (mm/dd/yyyy)",
    "1/04/2003 (mm/dd/yyyy)",
    "7/04/2003 (mm/dd/yyyy)",
    "9/04/2003 (mm/dd/yyyy)",
    "10/04/2003 (mm/dd/yyyy)",
  ];
  const [timeFormat, setTimeFormat] = useState("Black");

  return (
    <div>
      <DialogTitle>Add Time</DialogTitle>
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
          <label htmlFor="timeFormat" className="text-xs font-semibold">
            Time Format
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setTimeFormat(e)}
            defaultValue={timeFormat}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeFormats.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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
