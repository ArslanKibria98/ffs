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
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "@/redux/store/loading";

export default function AddButton({
  getter,
  setter,
  formDataApi,
  resetForm,
  isUpdate = false,
  updateFieldData = null,
}) {
  const dispatch = useDispatch();
  const version_id = useSelector((state) => state?.formStore.version_id);
  const isLoading = useSelector((state) => state?.loadingStore?.value);

  const fontSizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
  const fontFamilies = ["Normal", "Mono", "Sans", "Ariel", "Times"];
  const fontColours = ["Black", "White", "Red", "Blue", "Yellow", "Green"];
  const backgroundColours = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Yellow",
    "Green",
  ];

  const [btnName, setBtnName] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Normal");
  const [fontColour, setFontColour] = useState("Black");
  const [bgColour, setBgColour] = useState("White");
  const [fontStyle, setFontStyle] = useState("Normal");
  const [id, setId] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formErrors = {};
    if (!btnName.trim()) formErrors.btnName = "Button name is required.";

    // Add additional validation rules as needed
    return formErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    dispatch(setIsLoading(true));

    const data = {
      formVersionId: version_id,
      regionId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      containerId: id,
      fontSize: fontSize.toString(),
      fontFamily: fontFamily,
      fontColor: fontColour,
      backgroundColor: bgColour,
      Name: btnName,
      fontStyle: fontStyle,
    };

    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Controls/CreateButton",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setter(!getter);
        toast.success(responseData.notificationMessage);
        resetForm();
      } else {
        console.error("Failed to create Button");
        toast.error("Failed to create Button!");
      }
    } catch (error) {
      console.error("An error occurred while creating Button:", error);
      toast.error("Something went wrong!");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div>
      <DialogTitle>Add Button</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-4">
        {!isUpdate && (
          <>
            <h5 className="text-xl font-semibold mt-4 col-span-2">Select Tab</h5>

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
          </>
        )}
        <div className="col-span-2">
          <label htmlFor="btnName" className="text-xs font-semibold">
            Button Name
          </label>
          <Input
            name="btnName"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={btnName}
            onChange={(e) => setBtnName(e.target.value)}
          />
          {errors.btnName && <p className="text-red-500 text-xs">{errors.btnName}</p>}
        </div>

        <div>
          <label htmlFor="fontFamily" className="text-xs font-semibold">
            Font Family
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontFamily(e)}
            value={fontFamily}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
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
          <label htmlFor="fontSize" className="text-xs font-semibold">
            Font Size
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontSize(Number(e))}
            value={fontSize}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size, index) => (
                <SelectItem key={index} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
            Font Colour
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontColour(e)}
            value={fontColour}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
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
        <div className="col-span-1">
          <label htmlFor="BgColour" className="text-xs font-semibold">
            Background Colour
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setBgColour(e)}
            value={bgColour}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {backgroundColours.map((style, index) => (
                <SelectItem key={index} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-4 py-1 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Save
        </Button>
        <DialogClose
          id="ButtonDialogClose"
          className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
        >
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
