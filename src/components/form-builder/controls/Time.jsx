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
import { useSelector, useDispatch } from "react-redux";
export default function Time({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  const timeFormats = [
    "5/04/2003 (mm/dd/yyyy)",
    "3/04/2003 (mm/dd/yyyy)",
    "1/04/2003 (mm/dd/yyyy)",
    "7/04/2003 (mm/dd/yyyy)",
    "9/04/2003 (mm/dd/yyyy)",
    "10/04/2003 (mm/dd/yyyy)",
  ];
  const version_id = useSelector((state) => state?.formStore.version_id);
  const [question, setQuestion] = useState(!isUpdate ? "" : updateFieldData.question);
  const [isRequired, setIsRequired] = useState(!isUpdate ? false : updateFieldData.is_Required);
  const [timeFormat, setTimeFormat] = useState("Black");
  const handleSave = async () => {
    setLocalLoading(true);
    const payload = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      question: question,
      is_Required: isRequired,
      choices: choices,
    };

    try {
      const response = await axios.post("/Controls/CreateCheckBox", JSON.stringify(payload));

      if (response?.data?.success) {
        // Handle success
        let responseData = response.data;
        setter(!getter);
        toast.success(responseData.notificationMessage);
        resetForm();
        setLocalLoading(false);
      } else {
        // Handle error
        console.log("Failed to save");
        toast.error("Failed to save");
        setLocalLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
      setLocalLoading(false);
    }
  };

  const handleUpdate = async () => {
    const formUpdateData = {
      controlId: updateFieldData.controlId,
      question: question,
      is_Required: isRequired,
      choices: choices,
    };

    try {
      const response = await axios.post("/Controls/UpdateCheckBox", JSON.stringify(formUpdateData));

      if (response.data.success) {
        let responseData =response.data;
        if (!responseData.success) {
          toast.error(responseData?.notificationMessage);
          return;
        }
        toast.success(responseData?.notificationMessage);
        resetForm();
        document.getElementById("CheckDialogClose").click();
      } else {
        console.error("Failed to edit Slider field!");
        toast.error("Unable to edit!");
      }
    } catch (error) {
      console.error("Error:", error);
     
    }
  };
  console.log(timeFormat,"timeFormat")
  return (
    <div>
      <DialogTitle>Add Time</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-3">
      {isUpdate ? "" : (
          <div className="col-span-2">
            <Select
              className="w-full"
              onValueChange={(e) => {
                setId(e);
              }}
              // defaultValue={formDataApi[0]?.containerName}
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
          <label htmlFor="tabName" className="text-[16px] font-semibold">
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
          <Checkbox2 checked={isRequired} onCheckedChange={setIsRequired} />
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
