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
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

export default function Time({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  const timeFormats = [
    { label: "12", value: 0 },
    { label: "24", value: 1 }
  ];
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id);
  const [question, setQuestion] = useState(!isUpdate ? "" : updateFieldData.question || "");
  const [isRequired, setIsRequired] = useState(!isUpdate ? false : updateFieldData.isRequired || false);
  const [timeFormat, setTimeFormat] = useState(!isUpdate ? 0 : updateFieldData.timeFormat || 0);
  const [id, setId] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formErrors = {};
    if (!question.trim()) formErrors.question = "Caption is required.";
    return formErrors;
  };

  const handleSave = async () => {
    setLocalLoading(true);
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLocalLoading(false);
      return;
    }

    const payload = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      question: question,
      isRequired: isRequired,
      timeFormat: timeFormat,
    };

    try {
      const response = await axios.post("/Controls/CreateTime", JSON.stringify(payload));

      if (response?.data?.success) {
        let responseData = response.data;
        setter(!getter);
        toast.success(responseData.notificationMessage);
        resetForm();
      } else {
        console.log("Failed to save");
        toast.error("Failed to save");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleUpdate = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formUpdateData = {
      controlId: updateFieldData.controlId,
      question: question,
      isRequired: isRequired,
      timeFormat: timeFormat,
    };

    try {
      const response = await axios.post("/Controls/UpdateTime", JSON.stringify(formUpdateData));

      if (response.data.success) {
        let responseData = response.data;
        toast.success(responseData.notificationMessage);
        resetForm();
        document.getElementById("TimeDialogClose").click();
      } else {
        console.error("Failed to edit Time field!");
        toast.error("Unable to edit!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <DialogTitle>{!isUpdate ? "Add Time" : "Edit Time"}</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-3">
        {!isUpdate && (
          <div className="col-span-2">
            <Select
              className="w-full"
              onValueChange={(e) => setId(e)}
              value={id}
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
          {errors.question && <p className="text-red-500 text-xs">{errors.question}</p>}
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

        <div className="col-span-2">
          <label htmlFor="timeFormat" className="text-xs font-semibold">
            Time Format
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setTimeFormat(Number(e))}
            value={timeFormat}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Time Format" />
            </SelectTrigger>
            <SelectContent>
              {timeFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timeFormat && <p className="text-red-500 text-xs">{errors.timeFormat}</p>}
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={!isUpdate ? handleSave : handleUpdate}
          disabled={localLoading}
        >
          {!isUpdate ? "Save" : "Update"}
        </Button>

        <DialogClose
          id="TimeDialogClose"
          className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
        >
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
