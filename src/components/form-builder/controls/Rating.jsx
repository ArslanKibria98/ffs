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
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../../redux/store/loading";

export default function Rating({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  const [question, setQuestion] = useState(!isUpdate ? "" : updateFieldData.question);
  const [isRequired, setIsRequired] = useState(!isUpdate ? false : updateFieldData.isRequired);
  const [minValue, setMinValue] = useState(!isUpdate ? "" : updateFieldData.ratingValue);
  const [maxValue, setMaxValue] = useState(!isUpdate ? "" : updateFieldData.max_Value);
  const [id, setId] = useState("");
  const version_id = useSelector((state) => state?.formStore.version_id);
  const token = useSelector((state) => state?.authStore?.token);
  useEffect(() => {
    return () => {
      const dynamicRegionId = uuidv4();
      console.log(dynamicRegionId,"==--==")
    };
  }, [])
  const handleSave = async () => {
    const payload = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      controlType: 0,
      question: question,
      isRequired: isRequired,
      ratingValue: parseInt(minValue),
      ratingComment:"test"
    };

    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Controls/CreateRating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
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

  const handleUpdate = async () => {
    const formUpdateData = {
      controlId: updateFieldData.controlId,
      question: question,
      isRequired: isRequired,
      ratingValue: parseInt(minValue),
      ratingComment:"test",
    };

    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Controls/UpdateRating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify(formUpdateData),
        }
      );

      if (response.ok) {
        let responseData = await response.json();
        if (!responseData.success) {
          toast.error(responseData?.notificationMessage);
          return;
        }
        toast.success(responseData?.notificationMessage);
        resetForm();
        document.getElementById("SliDialogClose").click();
      } else {
        console.error("Failed to edit Slider field!");
        toast.error("Unable to edit!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div>
      <DialogTitle>{!isUpdate ? "Add" : "Edit"} Rating</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-3">
        {isUpdate ? "" : (
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
                <SelectValue placeholder="Select Tab" />
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
        )}

        <div className="col-span-2">
          <label htmlFor="tabName" className="text-xs font-semibold">
            Caption
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
            onCheckedChange={(e) => setIsRequired(e)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Required?
          </label>
        </div>

        <label className="text-[16px] font-semibold col-span-2">
        Rating Values
        </label>

        <div>
          <label htmlFor="minValue" className="text-xs font-semibold">
          Value
          </label>
          <Input
            name="minValue"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="maxValue" className="text-xs font-semibold">
          Rating 2
          </label>
          <Input
            name="maxValue"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="minValue" className="text-xs font-semibold">
          Rating 3
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
          Rating 4
          </label>
          <Input
            name="maxValue"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="maxValue" className="text-xs font-semibold">
          Rating 5
          </label>
          <Input
            name="maxValue"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div> */}
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={!isUpdate ? handleSave : handleUpdate}
        >
          {!isUpdate ? "Save" : "Update"}
        </Button>

        <DialogClose id="SliDialogClose" className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
