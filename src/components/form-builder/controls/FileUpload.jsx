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
import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../../../redux/store/loading";
import axios from "@/lib/axios";
export default function FileUpload({ getter, setter, formDataApi, resetForm, isUpdate = false, updateFieldData = null }) {
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id);
  const [question, setQuestion] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [id, setId] = useState("");
  const [selectedFormat, setSelectedFormat] = useState([]);
  const availableFormat = [
    {
      label: "JPEG",
      value:0
    },
    {
      label: "PNG",
      value:1
    },
    {
      label: "SVG",
      value:2
    },
    {
      label: "GIF",
      value:3
    },
    {
      label: "TIFF",
      value:4
    },
    {
      label: "PDF",
      value:5
    },
    {
      label: "DOC",
      value:6
    },
    {
      label: "XLS",
      value:7
    },
    {
      label: "PPT",
      value:8
    },
    {
      label: "ODP",
      value:9
    },
    {
      label: "TXT",
      value:10
    },
    {
      label: "All Files",
      value:11
    }
  ];
  const handleSubmit = async () => {
    const postData = {
      formVersionId: version_id,
      containerId: id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      controlType: 0,
      question: question,
      isRequired: isRequired,
      file_Format: 0,
    };

    try {
      const response = await axios.post("/Controls/CreateFile", JSON.stringify(postData));
      if (response?.data?.success) {
        let responseData =response.data;
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

  const handleFormatChange = (format) => {
    setSelectedFormat((prevSelectedFormats) =>
      prevSelectedFormats.includes(format.label)
        ? prevSelectedFormats.filter((item) => item !== format.label)
        : [...prevSelectedFormats, format.label]
    );
  };
  console.log(selectedFormat)

  return (
    <div>
      <DialogTitle>Add File</DialogTitle>
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
            Select File Formats
          </label>
        </div>
        <div className="col-span-2 grid grid-cols-4 gap-4">
        {availableFormat.map((format, index) => (
        <div key={index} className="col-span-1 flex items-center space-x-2">
          <Checkbox2
            checked={selectedFormat.includes(format.label)}
            onCheckedChange={() => handleFormatChange(format)}
          />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {format.label}
          </label>
        </div>
      ))}
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 pt-4 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSubmit}
          disabled={loading}
        >
          Save
        </Button>
        <DialogClose id="FileDialogClose" className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
