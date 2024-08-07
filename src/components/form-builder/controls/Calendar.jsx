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
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

export default function Calendar({
  getter,
  setter,
  formDataApi,
  resetForm,
  isUpdate = false,
  updateFieldData = null,
}) {
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id);

  const dateFormats = [
    "05/23/2024 (mm/dd/yyyy)",
    "23/05/2024 (dd/mm/yyyy)",
    "2024/05/23 (yyyy/mm/dd)",
  ];
  const calanderFormats = ["Gregorian", "Hijri"];
  console.log(updateFieldData)
  const [question, setQuestion] = useState(!isUpdate ? "" : updateFieldData?.question);
  const [dateFormat, setDateFormat] = useState(!isUpdate ? null : updateFieldData?.dateFormat);
  const [calendarFormat, setCalendarFormat] = useState(!isUpdate ? null : updateFieldData?.calendarType);
  const [isRequired, setIsRequired] = useState(!isUpdate ? false : updateFieldData?.isRequired);
  const [id, setId] = useState("");

  const handleSubmit = async () => {
    const postData = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      question: question,
      isRequired: isRequired,
      dateFormat: dateFormat,
      calendarType: calendarFormat
    };

    try {
      const response = await axios.post(
        "http://135.181.57.251:3048/api/Controls/CreateCalendar",
        JSON.stringify(postData)
      );

      if (response?.data?.success) {
        setter(!getter);
        toast.success(response?.data?.notificationMessage);
        resetForm();
      } else {
        console.error("Failed to add Calendar", response);
        toast.error("Unable to save!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleUpdate = async () => {
    const formUpdateData = {
      controlId: updateFieldData.controlId,
      question: question,
      isRequired: isRequired,
      dateFormat: dateFormat,
      calendarType: calendarFormat
    };

    try {
      const response = await axios.post(
        "http://135.181.57.251:3048/api/Controls/UpdateCalendar",
        JSON.stringify(formUpdateData)
      );

      if (response.data.success) {
        let responseData = response.data;
        if (!responseData.success) {
          toast.error(responseData?.notificationMessage);
          return;
        }
        toast.success(responseData?.notificationMessage);
        resetForm();
        document.getElementById("CalendarDialogClose").click();
      } else {
        console.error("Failed to edit Calendar!");
        toast.error("Unable to edit!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <DialogTitle>Add Calendar</DialogTitle>
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
            onChange={(e)=>setQuestion(e.target.value)}
          />
        </div>
        <div className="my-4 col-span-2 flex items-center space-x-2">
          <Checkbox2 id="terms" value={isRequired} onCheckedChange={(e)=>setIsRequired(e)} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Required?
          </label>
        </div>

        <label className="text-[16px] font-semibold col-span-1">
          Date Format
        </label>
        <label className="text-[16px] font-semibold col-span-1">
          Calendar Type
        </label>

        <div>
          <label htmlFor="dateFormat" className="text-xs font-semibold">
            Choose Format
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setDateFormat(e)}
            defaultValue={dateFormat}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Format" />
            </SelectTrigger>
            <SelectContent>
              {dateFormats.map((style, index) => (
                <SelectItem key={index} value={index} className="font-normal">
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="dateFormat" className="text-xs font-semibold">
            Choose Type
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setCalendarFormat(e)}
            defaultValue={calendarFormat}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              {calanderFormats.map((style, index) => (
                <SelectItem key={index} value={index} className="font-normal">
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={!isUpdate ? handleSubmit : handleUpdate}
          disabled={loading}
        >
          {!isUpdate ? "Save" : "Update"}
        </Button>
        <DialogClose
          id="CalendarDialogClose"
          className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
        >
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}