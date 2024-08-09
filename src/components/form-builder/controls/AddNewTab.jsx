import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogTitle, DialogClose } from '@/components/ui/dialog';

import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '@/redux/store/loading';
import axios from '@/lib/axios';

export default function AddNewTab({ getter, setter, resetForm, isUpdate = false, updateFieldData = null }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.loadingStore?.value);
  const version_id = useSelector((state) => state?.formStore.version_id);

  const fontSizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
  const fontFamilies = ['Normal', 'Mono', 'Sans', 'Ariel', 'Times'];
  const fontColours = ['Black', 'White', 'Red', 'Blue', 'Yellow', 'Green'];

  const [tabName, setTabName] = useState(!isUpdate ? "" : updateFieldData.containerName);
  const [fontSize, setFontSize] = useState(!isUpdate ? 16 : Number(updateFieldData.fontSize));
  const [fontFamily, setFontFamily] = useState(!isUpdate ? "Normal" : updateFieldData.fontFamily);
  const [fontColour, setFontColour] = useState(!isUpdate ? "Black" : updateFieldData.fontColor);

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let errors = {};
    if (!tabName.trim()) {
      errors.tabName = "Tab name is required";
    }
    if (!fontSize) {
      errors.fontSize = "Font size is required";
    }
    if (!fontFamily.trim()) {
      errors.fontFamily = "Font family is required";
    }
    if (!fontColour.trim()) {
      errors.fontColour = "Font colour is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    dispatch(setIsLoading(true));
    const data = {
      containerType: 0,
      parentContainerId: "00000000-0000-0000-0000-000000000000",
      formVersionId: version_id,
      fontSize: fontSize.toString(),
      fontFamily: fontFamily,
      fontColor: fontColour,
      containerName: tabName,
    };

    try {
      const response = await axios.post('/Controls/CreateContainer', JSON.stringify(data));

      if (response.data) {
        setter(!getter);
        let responseData = response.data;
        toast.success(responseData.notificationMessage);
        resetForm();
      } else {
        console.error('Failed to save tab');
        toast.error("Failed to save tab!");
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      console.error('An error occurred while saving the tab:', error);
      toast.error("Something went wrong!");
      dispatch(setIsLoading(false));
    }
  };

  const handleUpdate = async () => {
    if (!validateFields()) return;

    const data = {
      containerId: updateFieldData.id,
      containerType: 0,
      parentContainerId: "00000000-0000-0000-0000-000000000000",
      formVersionId: version_id,
      fontSize: fontSize.toString(),
      fontFamily: fontFamily,
      fontColor: fontColour,
      containerName: tabName,
    };

    try {
      const response = await axios.post('/Controls/UpdateContainer', JSON.stringify(data));

      if (response.data) {
        console.log('Tab saved successfully');
        let responseData = response.data;
        resetForm();
        toast.success(responseData.notificationMessage);
        dispatch(setIsLoading(false));
        document.getElementById("NewTabDialogClose").click();
      } else {
        console.error('Failed to save tab');
        toast.error("Failed to save tab!");
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      console.error('An error occurred while saving the tab:', error);
      toast.error("Something went wrong!");
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div>
      <DialogTitle>{!isUpdate ? "Add " : "Edit "}Tab</DialogTitle>
      <br />
      <div className="grid grid-cols-2 gap-8 gap-y-4">
        <div className="col-span-2">
          <label htmlFor="tabName" className="text-xs font-semibold">
            Tab Name
          </label>
          <Input
            name="tabName"
            placeholder="Type Here"
            className="p-4 h-[48px]"
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
          />
          {errors.tabName && <p className="text-red-500 text-xs">{errors.tabName}</p>}
        </div>

        <div>
          <label htmlFor="fontFamily" className="text-xs font-semibold">
            Font Family
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontFamily(e)}
            defaultValue={fontFamily}
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
          {errors.fontFamily && <p className="text-red-500 text-xs">{errors.fontFamily}</p>}
        </div>

        <div>
          <label htmlFor="fontSize" className="text-xs font-semibold">
            Font Size
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontSize(Number(e))}
            defaultValue={fontSize}
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
          {errors.fontSize && <p className="text-red-500 text-xs">{errors.fontSize}</p>}
        </div>

        <div>
          <label htmlFor="fontColour" className="text-xs font-semibold">
            Font Colour
          </label>
          <Select
            className="w-full"
            onValueChange={(e) => setFontColour(e)}
            defaultValue={fontColour}
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
          {errors.fontColour && <p className="text-red-500 text-xs">{errors.fontColour}</p>}
        </div>
      </div>
      <div className="flex flex-row-reverse gap-4 py-1 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={!isUpdate ? handleSubmit : handleUpdate}
          disabled={loading}
        >
          {!isUpdate ? "Add " : "Save "} Field
        </Button>
        <DialogClose id='NewTabDialogClose' className="bg-[#ababab] px-4 hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          Cancel
        </DialogClose>
      </div>
    </div>
  );
}
