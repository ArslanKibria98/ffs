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
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function Captcha({ getter, setter, formDataApi, resetForm, isUpdate = false,
  updateFieldData = null }) {
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id);
  const [question, setQuestion] = useState(
    !isUpdate ? "" : updateFieldData.question
  );
  const [isRequired, setIsRequired] = useState(
    !isUpdate ? false : updateFieldData.isRequired
  );
  console.log(updateFieldData,"isUpdate")
  const [id, setId] = useState("");
  const [selectedFormat, setSelectedFormat] = useState(
    !isUpdate ? 0 : updateFieldData.alignment
  );
  const [errors, setErrors] = useState({});

  const availableFormat = [
    { label: "Left", value: 0 },
    { label: "Right", value: 2 },
    { label: "Middle", value: 1 },
  ];

  const validateForm = () => {
    const formErrors = {};
    if (!question.trim()) formErrors.question = "Caption is required.";
    if (selectedFormat.length === 0) formErrors.selectedFormat = "At least one file format must be selected.";
    return formErrors;
  };

  const handleSubmit = async () => {
    console.log("hello1")
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log("hello2")
    const postData = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      question: question,
      isRequired: isRequired,
      alignment: selectedFormat, // or any other logic for file_Format
    };
    const updateData = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      question: question,
      controlId:updateFieldData?.controlId,
      isRequired: isRequired,
      alignment: selectedFormat, // or any other logic for file_Format
    };
    try {
      const response = await axios.post(`/Controls/${isUpdate?"Update":"Create"}Capcha`, JSON.stringify(isUpdate?updateData:postData));
      if (response?.data?.success) {
        {!isUpdate &&setter(!getter); }
          
        toast.success(response.data.notificationMessage)
        {isUpdate &&
          document.getElementById("CaptchaDialogClose").click();
        }
       
        resetForm();
      } else {
        console.error("Failed ");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormatChange = (value) => {
    setSelectedFormat(value);
  };
  return (
    <div>
      <DialogTitle>{isUpdate?"Edit":"Add"} Captcha</DialogTitle>
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

        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
          Alignment
          </label>
        </div>
        <div className="col-span-2 grid grid-cols-6 gap-4">
          {availableFormat.map((format, index) => (
            <div key={index} className="col-span-1 flex items-center space-x-2">
              <Checkbox2
               checked={selectedFormat === format.value}
               onCheckedChange={() => handleFormatChange(format.value)}
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {format.label}
              </label>
            </div>
          ))}
        </div>
        {errors.selectedFormat && <p className="text-red-500 text-xs col-span-2">{errors.selectedFormat}</p>}
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSubmit}
          disabled={loading}
        >
         {isUpdate?"Update":"Save"}
        </Button>
        <DialogClose id="CaptchaDialogClose" className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
