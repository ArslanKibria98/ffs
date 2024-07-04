import React, { useState, useEffect } from "react";

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
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../../redux/store/loading";

export default function Slider({ getter, setter, formDataApi, resetForm }) {
  const [question, setQuestion] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const formId = useSelector((state) => state?.formStore.form_id);
  const handleSave = async () => {
    const payload = {
      formVersionId: formId,
      containerId: id,
      regionId: "9712CB25-9053-4BF4-936C-7C279CE5DA69",
      controlType: 0,
      question: question,
      is_Required: isRequired,
      min_Value: parseInt(minValue),
      max_Value: parseInt(maxValue),
    };

    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Controls/CreateSlider",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Request-Id": "6cc5ae1e-1490-4d26-b347-d1f76e87665d",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // Handle success
        let responseData = await response.json();
        setter(!getter);
        toast.success(responseData.notificationMessage);
        resetForm();
      } else {
        // Handle error
        // setter(!getter);
        console.log("Failed to save");
        toast.error("Failed to save");
      }
    } catch (error) {
      // setter(!getter);
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <DialogTitle>Add Slider</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-3">
        <div className="col-span-2">
          <Select
            className="w-full"
            onValueChange={(e) => {
              setId(e);
            }}
          >
            <label htmlFor="minLen" className="text-xs font-semibold">
              Tab Name
            </label>
            <SelectTrigger className="w-full h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formDataApi?.map((style, index) => (
                <SelectItem key={index} value={style?.id}>
                  {style?.containerName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <label htmlFor="tabName" className="text-[16px] font-semibold">
            Question
          </label>
          <Input
            name="tabName"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="my-4 col-span-2 flex items-center space-x-2">
          <Checkbox2
            checked={isRequired}
            onChange={() => setIsRequired(!isRequired)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Required?
          </label>
        </div>

        <label className="text-[16px] font-semibold col-span-2">
          Slider Values
        </label>

        <div>
          <label htmlFor="minValue" className="text-xs font-semibold">
            Minimum Value
          </label>
          <Input
            name="minValue"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="maxValue" className="text-xs font-semibold">
            Maximum Value
          </label>
          <Input
            name="maxValue"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSave}
        >
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
