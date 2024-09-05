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
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../../redux/store/loading";
import axios from "@/lib/axios";

export default function Rating({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id);
  const token = useSelector((state) => state?.authStore?.token);

  const [question, setQuestion] = useState(!isUpdate ? "" : updateFieldData.question);
  const [isRequired, setIsRequired] = useState(!isUpdate ? false : updateFieldData.isRequired);
  const [minValue, setMinValue] = useState(!isUpdate ? "" : updateFieldData.ratingValue);
  const [maxValue, setMaxValue] = useState(!isUpdate ? "" : updateFieldData.max_Value);
  const [id, setId] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // return () => {
      const dynamicRegionId = uuidv4();
      console.log(dynamicRegionId, "==--==");
    // };
  }, []);

  const validateForm = () => {
    const formErrors = {};
    if (!question.trim()) formErrors.question = "Caption is required.";
    if (!minValue.trim() || isNaN(minValue)) formErrors.minValue = "Valid rating value is required.";
    // Add additional validation rules as needed
    return formErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    dispatch(setIsLoading(true));

    const payload = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      controlType: 0,
      question: question,
      isRequired: isRequired,
      ratingValue: parseInt(minValue),
      ratingComment: "test",
    };

    try {
      const response = await axios.post(
        "/Controls/CreateRating",JSON.stringify(payload),
      );

      if (response) {
        const responseData =  response.data;
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
      dispatch(setIsLoading(false));
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
      ratingValue: parseInt(minValue),
      ratingComment: "test",
    };

    try {
      const response = await axios.post("/api/Controls/UpdateRating", JSON.stringify(formUpdateData));

      if (response?.data?.success) {
        const responseData = response.data;
        if (!responseData.success) {
          toast.error(responseData?.notificationMessage);
          return;
        }
        toast.success(responseData?.notificationMessage);
        resetForm();
        document.getElementById("RatingDialogClose").click();
      } else {
        console.error("Failed to edit Slider field!");
        toast.error("Unable to edit!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <DialogTitle>{!isUpdate ? "Add" : "Edit"} Rating</DialogTitle>
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
          <label htmlFor="question" className="text-xs font-semibold">
            Caption
          </label>
          <Input
            name="question"
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
          {errors.minValue && <p className="text-red-500 text-xs">{errors.minValue}</p>}
        </div>
        {/* Uncomment and apply validation if needed
        <div>
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
        </div> */}
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={!isUpdate ? handleSave : handleUpdate}
          disabled={loading}
        >
          {!isUpdate ? "Save" : "Update"}
        </Button>

        <DialogClose id="RatingDialogClose" className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
