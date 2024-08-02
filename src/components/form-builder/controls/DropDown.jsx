import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Checkbox2 } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

export default function DropDown({
  getter,
  setter,
  formDataApi,
  resetForm,
  isUpdate = false,
  updateFieldData = null,
}) {
  const [radiosType, setRadiosType] = useState("manual");
  const [endpoint, setEndpoint] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [radioHeaders, setRadioHeaders] = useState([{ parmKey: "", parmValue: "" }]);
  const [radioBody, setRadioBody] = useState([{ parmKey: "", parmValue: "" }]);
  const [question, setQuestion] = useState(
    !isUpdate ? "" : updateFieldData.question
  );
  const [isRequired, setIsRequired] = useState(
    !isUpdate ? false : updateFieldData.isRequired
  );
  const [choices, setChoices] = useState(
    !isUpdate
      ? ["", ""]
      : updateFieldData.choices.map((choice) => choice.choiceName)
  );
  const [id, setId] = useState("");
  const [showLabel, setShowLabel] = useState("");
  const [showValue, setShowValue] = useState("");
  const version_id = useSelector((state) => state?.formStore.version_id);
  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleRemoveChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = choices.map((choice, i) =>
      i === index ? value : choice
    );
    setChoices(newChoices);
    console.log(newChoices, "1122");
  };

  async function inflateOptions() {
    try {
      const response = await fetch(endpoint);

      if (response.ok) {
        // console.log(await response.json())
        const responseOptions = await response.json();
        const keys = new Set();
        // console.log(responseOptions, "responseOptions");
        responseOptions.data.forEach((item) => {
          Object.keys(item).forEach((key) => {
            keys.add(key);
          });
        });
        // console.log(Array.from(keys), "--==--");
        setDropdownOptions(Array.from(keys));
      }
    } catch (e) {
      toast.error(e?.message);
      console.log(e);
    }
  }

  function removedArray(array, index) {
    const newArray = array.filter((_, i) => i !== index);
    setDropdownOptions(newArray);
  }

  function verifyPayload(payload) {
    if (!payload.formVersionId || payload.formVersionId == "") {
      console.log("formVersionId error")
      return false;
    }
    if (payload.containerId == undefined || payload.containerId == null) {
      console.log("containerId error")
      return false;
    }
    if (!payload.regionId || payload.regionId == "") {
      console.log("regionId error")
      return false;
    }
    if (!payload.question || payload.question == "") {
      console.log("question error")
      return false;
    }
    if (payload.isRequired == null || payload.isRequired === "") {
      console.log("isRequired error")
      return false;
    }
    if (radiosType == "manual" && (!payload.choices || payload.choices == "")) {
      console.log("choices error")
      return false;
    }
    if (radiosType != "manual") {
      if (!payload.url || payload.url == "") {
        console.log("url error")
        return false;
      }
      if (!payload.headerParms || payload.headerParms.length == 0) {
        console.log("headerParms error")
        return false;
      }
      if (!payload.bodyParms || payload.bodyParms.length == 0) {
        console.log("bodyParms error")
        return false;
      }
      if (!payload.displayField || payload.displayField == "") {
        console.log("displayField error")
        return false;
      }
      if (!payload.valueField || payload.valueField == "") {
        console.log("valueField error")
        return false;
      }
    }
    return true
  }
  const handleSave = async () => {
    setLocalLoading(true);
    let payload = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      question: question,
      isRequired: isRequired,
      isThirdParty: radiosType == "manual" ? false : true,
    };
    if (radiosType != "manual") {
      payload.url = endpoint;
      payload.headerParms = radioHeaders;
      payload.bodyParms = radioBody;
      payload.displayField = showLabel;
      payload.valueField = showValue;
    } else {
      payload.choices = choices;
    }
    console.log(payload);
    if (!verifyPayload(payload)) {
      console.log("Verification failed")
      toast.error("Verification failed!")
      setLocalLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "/Controls/CreateDropDown",
        JSON.stringify(payload)
      );

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
      isRequired: isRequired,
      choices: choices,
    };

    try {
      const response = await axios.post(
        "/Controls/UpdateDropDown",
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
        document.getElementById("CheckDialogClose").click();
      } else {
        console.error("Failed to edit Slider field!");
        toast.error("Unable to edit!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function updateBodyIndex(key, newVal, index) {
    console.log(key, newVal, index);
    setRadioBody(
      radioBody.map((item, i) =>
        i === index ? { ...item, [key]: newVal } : item
      )
    );
  }
  function handleDeleteBody(index) {
    if (index < radioBody.length - 1) {
      setRadioBody((prevBody) => [
        ...prevBody.slice(0, index),
        ...prevBody.slice(index + 1),
      ]);
    } else {
      toast.error("Cannot delete default empty body");
      return;
    }
  }
  function updateHeadersIndex(key, newVal, index) {
    setRadioHeaders(
      radioHeaders.map((item, i) =>
        i === index ? { ...item, [key]: newVal } : item
      )
    );
  }
  function handleDeleteHeader(index) {
    if (index < radioHeaders.length - 1) {
      setRadioHeaders((prevHeaders) => [
        ...prevHeaders.slice(0, index),
        ...prevHeaders.slice(index + 1),
      ]);
    } else {
      toast.error("Cannot delete default empty param");
      return;
    }
  }
  return (
    <div>
      <DialogTitle>Add Dropdown</DialogTitle>
      <br />
      <RadioGroup
        className="flex gap-4"
        onValueChange={setRadiosType}
        defaultValue={radiosType}
      >
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem
            value="manual"
            id="manual"
            className="border-red-500"
          />
          <Label htmlFor="manual" className="cursor-pointer">
            Manual Input
          </Label>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value="api" id="api" className="border-red-500" />
          <Label htmlFor="api" className="cursor-pointer">
            Fetch List using API
          </Label>
        </div>
      </RadioGroup>
      <br />
      {radiosType == "manual" ? (
        <>
          <div className="grid grid-cols-2 gap-8 gap-y-3">
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

            <label className="text-[16px] font-semibold col-span-2">
              Choices
            </label>
            {choices.map((choice, index) => (
              <div
                key={index}
                className="col-span-1 flex items-center space-x-2"
              >
                <Input
                  name={`choice${index}`}
                  placeholder={`Choice ${String.fromCharCode(65 + index)}`}
                  className="p-4 h-[48px] flex-1"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  onClick={() => handleRemoveChoice(index)}
                >
                  {"-"}
                </Button>
              </div>
            ))}
          </div>
          <div className="flex flex-row-reverse gap-4 py-1 my-4">
            <Button
              className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
              onClick={handleAddChoice}
            >
              + Add
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-8 gap-y-3">
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
            <div className="col-span-2">
              <label htmlFor="tabName" className="text-[16px] font-semibold">
                Caption
              </label>
              <Input
                name="tabName"
                placeholder="Type Here"
                className="p-4 h-[48px]"
                value={question}
                onChange={(e)=>{setQuestion(e.target.value)}}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="tabName" className="text-[16px] font-semibold">
                API Endpoint
              </label>
              <Input
                name="tabName"
                placeholder="Paste API endpoint URL"
                className="p-4 h-[48px]"
                value={endpoint}
                onChange={(e) => setEndpoint(e?.target?.value)}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="radioHeaders" className="text-xs font-semibold">
                Headers
              </label>
              <div className="flex flex-col gap-2">
                {radioHeaders?.map((param, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <Input
                        name="radioHeaders"
                        placeholder="Header Key"
                        className="p-4 h-[48px]"
                        value={param.parmKey}
                        onChange={(e) =>
                          updateHeadersIndex("parmKey", e?.target?.value, index)
                        }
                      />
                      <Input
                        name="radioHeaders"
                        placeholder="Header Value"
                        className="p-4 h-[48px]"
                        value={param.parmValue}
                        onChange={(e) =>
                          updateHeadersIndex("parmValue", e?.target?.value, index)
                        }
                      />
                    </div>
                    <Button
                      variant="destructive"
                      className="h-[48px]"
                      onClick={() => {
                        if (index < radioHeaders.length - 1)
                          handleDeleteHeader(index);
                        else
                          setRadioHeaders([
                            { parmKey: "", parmValue: "" },
                            ...radioHeaders,
                          ]);
                      }}
                    >
                      {index < radioHeaders.length - 1 ? "−" : "+"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <label htmlFor="radioBody" className="text-xs font-semibold">
                Body
              </label>
              <div className="flex flex-col gap-2">
                {radioBody?.map((param, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <Input
                        name="radioBody"
                        placeholder="Body Key"
                        className="p-4 h-[48px]"
                        value={param.parmKey}
                        onChange={(e) =>
                          updateBodyIndex("parmKey", e?.target?.value, index)
                        }
                      />
                      <Input
                        name="radioBody"
                        placeholder="Body Value"
                        className="p-4 h-[48px]"
                        value={param.parmValue}
                        onChange={(e) =>
                          updateBodyIndex("parmValue", e?.target?.value, index)
                        }
                      />
                    </div>
                    <Button
                      variant="destructive"
                      className="h-[48px]"
                      onClick={() => {
                        if (index < radioBody.length - 1)
                          handleDeleteBody(index);
                        else
                          setRadioBody([{ parmKey: "", parmValue: "" }, ...radioBody]);
                      }}
                    >
                      {index < radioBody.length - 1 ? "−" : "+"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-4 col-span-2 flex items-center space-x-2">
              <Checkbox2 />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required?
              </label>
            </div>

            <label className="text-[16px] font-semibold col-span-2">
              Choices
            </label>

            {dropdownOptions && dropdownOptions?.length > 0 && (
              <div className="col-span-1">
                <Select
                  className="w-full"
                  onValueChange={(e) => {
                    setShowLabel(e);
                  }}
                  // defaultValue={formDataApi[0]?.containerName}
                >
                  <label htmlFor="minLen" className="text-xs font-semibold">
                    Label
                  </label>
                  <SelectTrigger className="w-full h-[48px]">
                    <SelectValue placeholder="Select Tab" />
                  </SelectTrigger>
                  <SelectContent>
                    {dropdownOptions &&
                      dropdownOptions?.map((style, index) => (
                        <SelectItem key={index} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {dropdownOptions && dropdownOptions?.length > 0 && (
              <div className="col-span-1">
                <Select
                  className="w-full"
                  onValueChange={(e) => {
                    setShowValue(e);
                  }}
                  // defaultValue={formDataApi[0]?.containerName}
                >
                  <label htmlFor="minLen" className="text-xs font-semibold">
                    Value
                  </label>
                  <SelectTrigger className="w-full h-[48px]">
                    <SelectValue placeholder="Select Tab" />
                  </SelectTrigger>
                  <SelectContent>
                    {dropdownOptions &&
                      dropdownOptions?.map((style, index) => (
                        <SelectItem key={index} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {dropdownOptions && (
            <div>
              {dropdownOptions?.length < 1 && (
                <p className="text-center text-xs text-neutral-600">
                  No options added!
                </p>
              )}
              <div className="flex flex-row-reverse gap-4 py-1 my-4">
                <Button
                  onClick={() =>
                    toast.promise(inflateOptions(), {
                      loading: "Getting...",
                      success: <span>Got Data!</span>,
                      error: <span>Could not get Data.</span>,
                    })
                  }
                  className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
                >
                  Get List
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={!isUpdate ? handleSave : handleUpdate}
          disabled={localLoading}
        >
          {!isUpdate ? "Save" : "Update"}
        </Button>

        <DialogClose
          disabled={localLoading}
          className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
        >
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
