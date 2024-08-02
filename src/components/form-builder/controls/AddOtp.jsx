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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox2 } from "@/components/ui/checkbox";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";

import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../../redux/store/loading";

export default function AddOtp({
  getter,
  setter,
  formDataApi,
  resetForm,
  isUpdate = false,
  updateFieldData = null,
}) {
  const fontColours = ["4-digits", "5-digits", "6-digits"];
  const otpFormatMapping = {
    "4-digits": 0,
    "5-digits": 1,
    "6-digits": 2,
  };
  const version_id = useSelector((state) => state?.formStore.version_id);
  const [question, setQuestion] = useState(
    !isUpdate ? "" : updateFieldData?.question
  );
  const [isRequired, setIsRequired] = useState(
    !isUpdate ? false : updateFieldData?.isRequired
  );
  const [otpFormat, setOtpFormat] = useState(
    !isUpdate ? "4-digits" : (updateFieldData?.otp_Format == 0 ? "4-digits" : (
      updateFieldData?.otp_Format == 1 ? "5-digits" : (
        updateFieldData?.otp_Format == 2 ? "6-digits" : (
          "4-digits"
      ))) || updateFieldData?.fileFormat == 0 ? "4-digits" : (
        updateFieldData?.fileFormat == 1 ? "5-digits" : (
          updateFieldData?.fileFormat == 2 ? "6-digits" : (
            "4-digits"
        ))))
  );
  const [id, setId] = useState("");

  const handleSubmit = async () => {
    const postData = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      controlType: 0,

      question: question,
      isRequired: isRequired,
      otp_Format: otpFormatMapping[otpFormat],
    };

    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Controls/CreateOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        let responseData = await response.json();
        setter(!getter);
        toast.success(responseData?.notificationMessage);
        resetForm();
      } else {
        console.error("Failed to add OTP");
        toast.error("Unable to save!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleUpdate = async () => {
    // alert(otpFormatMapping[otpFormat]);
    const formUpdateData = {
      controlId: updateFieldData.controlId,
      question: question,
      isRequired: isRequired,
      otpformat: otpFormatMapping[otpFormat],
    };

    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Controls/UpdateOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        document.getElementById("OTPDialogClose").click();
      } else {
        console.error("Failed to edit OTP field!");
        toast.error("Unable to edit!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <DialogTitle>{!isUpdate ? "Add" : "Edit"} OTP</DialogTitle>
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
          OTP Format
        </label>

        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
            Choose Format
          </label>
          <Select
            className="w-full"
            defaultValue={otpFormat}
            onValueChange={(e) => setOtpFormat(e)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose OTP length" />
            </SelectTrigger>
            <SelectContent>
              {fontColours.map((style, index) => (
                <SelectItem key={index} value={style}>
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
        >
          {!isUpdate ? "Save" : "Update"}
        </Button>
        <DialogClose
          id="OTPDialogClose"
          className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
        >
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
