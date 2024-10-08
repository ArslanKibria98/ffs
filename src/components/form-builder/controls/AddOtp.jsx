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
import { Checkbox2 } from "@/components/ui/checkbox";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

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
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id);
  const token = useSelector((state) => state?.authStore?.token);

  const [question, setQuestion] = useState(
    !isUpdate ? "" : updateFieldData?.question || ""
  );
  const [isRequired, setIsRequired] = useState(
    !isUpdate ? false : updateFieldData?.isRequired || false
  );
  const [otpFormat, setOtpFormat] = useState(
    !isUpdate
      ? "4-digits"
      : Object.keys(otpFormatMapping).find(
          (key) => otpFormatMapping[key] === updateFieldData?.otp_Format
        ) || "4-digits"
  );
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formErrors = {};

    if (!question.trim()) formErrors.question = "Caption is required.";
    if (!otpFormat) formErrors.otpFormat = "OTP Format is required.";
    return formErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

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
      const response = await axios.post(
        "/Controls/CreateOtp",JSON.stringify(postData));

      if (response) {
        const responseData =response.data;
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
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formUpdateData = {
      controlId: updateFieldData.controlId,
      question: question,
      isRequired: isRequired,
      otpformat: otpFormatMapping[otpFormat],
    };

    try {
      const response = await axios.post(
        "/Controls/UpdateOtp",JSON.stringify(formUpdateData) );

      if (response) {
        const responseData =response.data;
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
        {!isUpdate && (
          <div className="col-span-2">
            <Select
              className="w-full"
              onValueChange={(e) => {
                setId(e);
              }}
              defaultValue={id}
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

        <div className="col-span-2">
          <label htmlFor="fontColour" className="text-xs font-semibold">
            Choose Format
          </label>
          <Select
            className="w-full"
            value={otpFormat}
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
          {errors.otpFormat && <p className="text-red-500 text-xs">{errors.otpFormat}</p>}
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
          id="OTPDialogClose"
          className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
        >
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
