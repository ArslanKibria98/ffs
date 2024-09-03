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
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function PhoneNumber({
  getter,
  setter,
  formDataApi,
  resetForm,
  isUpdate = false,
  updateFieldData = null
}) {
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id);

  const fontFamilies = ["any", "Normal"];
  const [question, setQuestion] = useState(!isUpdate ? "" : updateFieldData?.question || "");
  const [isRequired, setIsRequired] = useState(!isUpdate ? false : updateFieldData?.isRequired || false);
  const [phoneType, setPhoneType] = useState(!isUpdate ? "Normal" : updateFieldData?.phone_Type || "Normal");
  const [phoneNumber, setPhoneNumber] = useState(!isUpdate ? "" : updateFieldData?.phone_Number || "");
  const [id, setId] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formErrors = {};
    if (!question.trim()) formErrors.question = "Caption is required.";
    if (!phoneNumber.trim()) formErrors.phoneNumber = "Phone number is required.";
    // Additional validation can be added here
    return formErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const requestBody = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      controlType: 0,
      question: question,
      isRequired: isRequired,
      phone_Type: phoneType,
      phone_Number: phoneNumber,
    };

    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Controls/CreatePhoneNumber",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.notificationMessage);
        setter(!getter);
        resetForm();
      } else {
        console.error("Error:", response.statusText);
        toast.error("Unable to Save!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
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
      phone_Type: phoneType,
      phone_Number: phoneNumber,
    };

    try {
      const response = await fetch('http://135.181.57.251:3048/api/Controls/UpdatePhoneNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formUpdateData)
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.notificationMessage);
        resetForm();
        document.getElementById("PHDialogClose").click();
      } else {
        console.error('Failed to edit phone number field!');
        toast.error("Unable to edit!");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <DialogTitle>{!isUpdate ? "Add" : "Edit"} Phone Number</DialogTitle>
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
            {errors.id && <p className="text-red-500 text-xs">{errors.id}</p>}
          </div>
        )}

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

        <label className="text-[16px] font-semibold col-span-2">
          Phone Type
        </label>

        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
            Choose Format
          </label>
          <Select
            className="w-full"
            value={phoneType}
            onValueChange={(e) => setPhoneType(e)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose phone number format." />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="text-xs font-semibold">
            Phone Number
          </label>
          <Input
            name="phoneNumber"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={!isUpdate ? handleSave : handleUpdate}
          disabled={loading}
        >
          {!isUpdate ? "Save" : "Update"}
        </Button>

        <DialogClose id='PHDialogClose' className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
