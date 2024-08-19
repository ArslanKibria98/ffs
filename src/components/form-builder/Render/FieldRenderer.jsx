import React, { useState, useEffect } from "react";

// import { FieldRenderer as GetRelevantField } from "@/components/form-builder/Render/FieldRenderer";
// import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// import { Checkbox2 } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import BoxLoader from "@/components/BoxLoader";
// import { useParams } from "react-router-dom";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StarRating from "@/components/ui/StarRating";
// import { Rating } from "react-simple-star-rating";
// import axios from "@/lib/axios";
import { Label } from "@/components/ui/label";
import DateTimePicker from "react-datetime-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import ReCAPTCHA from 'react-google-recaptcha';
function FieldRenderer({ control, formik }) {
    const [selectedChoices, setSelectedChoices] = useState([]);

    let field = control;
    if (field?.controlType === 0) {
      //  TextBox
      return (
        <div className="h-fit col-span-1 row-span-1">
          <p className="text-[12px]">
            {field?.name}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="flex justify-between w-full gap-3">
            <Input
              className="border-black mt-2"
              type="text"
              name={field.controlId}
              placeholder={field?.placePlaceholder}
              onChange={formik.handleChange}
              value={formik.values[field.controlId] || ""}
            />
          </div>
        </div>
      );
    }
  
    if (field?.controlType === 1) {
      //  Button
      return (
        <div className="h-fit">
          <p className="text-[12px]">
            {field.name}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="flex justify-between w-full gap-3">
            <Button className="border-black mt-2 bg-[#e2252e] hover:bg-[#be1f27]">
              {field?.placeholder}
            </Button>
          </div>
        </div>
      );
    }
  
    if (field?.controlType === 2) {
      // Slider
      const handleSliderChange = (value) => {
        formik.setFieldValue(field.controlId, value[0]);
      };
      return (
        <div className="col-span-1 flex flex-col gap-y-2 h-fit">
          <p className="text-[12px]">
            {field.question}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="flex justify-between w-full gap-3">
            <div>{field.minValue}</div>
            <Slider
              max={field.maxValue || 100}
              min={field.minValue || 0}
              step={1}
              value={[formik.values[field.controlId]]}
              onValueChange={handleSliderChange}
            />
            <div>{field.maxValue}</div>
          </div>
        </div>
      );
    }
  
    if (field?.controlType === 3) {
      //  File
      return (
        <div className=" h-fit">
          <p className="text-[12px]">
            {field?.question}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="grid gap-4 pb-4 text-transparent">
            <Input
              className="border-gray-500 text-transparent placeholder:text-transparent text-center placeholder:text-center border-dotted mt-1 py-6 h-[100px]"
              type="file"
              name={field.name}
              onChange={(event) =>
                formik.setFieldValue(field.name, event.currentTarget.files[0])
              }
            />
          </div>
        </div>
      );
    }
  
    if (field?.controlType === 4) {
      //  Otp
      return (
        <div className=" h-fit">
          <p className="text-[12px]">
            {field.question}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="flex justify-between w-full gap-3 pt-2">
            <InputOTP
              maxLength={4}
              onChange={(value) => formik.setFieldValue(field.controlId, value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      );
    }
  
    if (field?.controlType === 5) {
      //  PhoneNumber
      return (
        <div className=" h-fit col-span-1 row-span-1">
          <p className="text-[12px]">
            {field.question}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="flex justify-between w-full gap-3">
            <Input
              className="border-black mt-2"
              type="text"
              name={field.controlId}
              placeholder={field?.placeholder}
              onChange={formik.handleChange}
              value={formik.values[field.controlId] || ""}
            />
          </div>
        </div>
      );
    }
    if (field?.controlType == 6) {
      // RadioButton
      const [dropdownOptions, setDropdownOptions] = useState([]);
      async function inflateOptions() {
        try {
          const response = await fetch(field.url);
  
          if (response.ok) {
            const responseOptions = await response.json();
            console.log(responseOptions.data, "responseOptions");
            setDropdownOptions(responseOptions.data);
          }
        } catch (e) {
          toast.error(e?.message);
          console.log(e);
        }
      }
      useEffect(() => {
        return () => {
          {
            field?.choices === null && inflateOptions();
          }
        };
      }, []);
      const handleRadioChange = (value) => {
        formik.setFieldValue(field.controlId, value);
      };
  
      return (
        <div className=" h-fit">
          <p className="text-[12px]">
            {field.question}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="my-4 items-center">
            <RadioGroup
              className="grid grid-cols-3 gap-2 w-full"
              onValueChange={handleRadioChange}
              value={formik.values[field.controlId] || ""}
            >
              {field.choices != null &&
                field.choices?.map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={choice.choiceName}
                      id={`radio-${index}`}
                      className="border-red-500"
                    />
                    <Label htmlFor={`radio-${index}`} className="cursor-pointer">
                      {choice.choiceName}
                    </Label>
                  </div>
                ))}
              {field.choices === null &&
                dropdownOptions?.map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={choice[field?.valueField]}
                      id={`radio-${index}`}
                      className="border-red-500"
                    />
                    <Label htmlFor={`radio-${index}`} className="cursor-pointer">
                      {choice[field?.displayValue]}
                    </Label>
                  </div>
                ))}
            </RadioGroup>
          </div>
        </div>
      );
    }
    if (field?.controlType === 7) {
      // Dropdown
      const [dropdownOptions, setDropdownOptions] = useState([]);
    
      const handleDropdownChange = (value) => {
        console.log(value, "1234");
        formik.setFieldValue(field.controlId, value);
      };
    
      async function inflateOptions() {
        try {
          const response = await fetch(field.url);
          if (response.ok) {
            const responseOptions = await response.json();
            setDropdownOptions(responseOptions.data);
          }
        } catch (e) {
          toast.error(e?.message);
          console.error(e);
        }
      }
    
      useEffect(() => {
        if (field?.choices === null) {
          inflateOptions();
        }
      }, [field]);
    
      return (
        <div className="h-fit">
          <p className="text-[12px]">
            {field.question}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="my-3 items-center">
            <Select
              className="w-full"
              value={
                formik.values[field.controlId]
              }
              onValueChange={handleDropdownChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Tab" />
              </SelectTrigger>
              <SelectContent>
                {field.choices !== null &&
                  field.choices.map((choice, index) => (
                    <SelectItem key={index} value={choice.choiceName}>
                      {choice.choiceName}
                    </SelectItem>
                  ))}
                {field.choices === null &&
                  dropdownOptions.map((option, index) => (
                    <SelectItem key={index} value={option[field.valueField]}>
                      {option[field.displayValue]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {formik.touched[field.controlId] && formik.errors[field.controlId] ? (
              <div className="text-red-500 text-sm">
                {formik.errors[field.controlId]}
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    
    if (field?.controlType === 8) {
      // rating
      const totalStars = 5;
      //  rating
      return (
        <div className=" h-fit">
          <p className="text-[12px]">
            {field.question}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="flex w-full gap-3">
            <StarRating
              totalStars={Number(field.ratingValue)}
              fieldName={field.controlId}
              setFieldValue={formik.setFieldValue}
              value={formik.values[field.controlId] || 0}
            />
          </div>
        </div>
      );
    }
  
    if (field?.controlType === 9) { //checkbox
      const handleCheckboxChange = (choiceName) => {
        const currentChoices = formik.values[field.controlId] || [];
        const updatedChoices = currentChoices.includes(choiceName)
          ? currentChoices.filter((name) => name !== choiceName)
          : [...currentChoices, choiceName];
  
        formik.setFieldValue(field.controlId, updatedChoices);
      };
      const [dropdownOptions, setDropdownOptions] = useState([]);
      async function inflateOptions() {
        try {
          const response = await fetch(field.url);
  
          if (response.ok) {
            const responseOptions = await response.json();
            console.log(responseOptions.data, "responseOptions");
            setDropdownOptions(responseOptions.data);
          }
        } catch (e) {
          toast.error(e?.message);
          console.log(e);
        }
      }
      useEffect(() => {
        return () => {
          {
            field?.choices === null && inflateOptions();
          }
        };
      }, []);
      return (
        <div>
          <p className="text-[12px] pb-1">
            {field.question}
            {field.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <div className="my-4 grid grid-cols-3 items-center">
            {field.choices!=null &&field.choices?.map((choice, index) => (
              <div key={index} className="w-100 flex gap-2 pb-3">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={(formik.values[field.controlId] || []).includes(
                    choice.choiceName
                  )}
                  onChange={() => handleCheckboxChange(choice.choiceName)}
                />
                <Label
                  htmlFor={`checkbox-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {choice.choiceName}
                </Label>
              </div>
            ))}
                   {field.choices===null &&dropdownOptions?.map((choice, index) => (
              <div key={index} className="w-100 flex gap-2 pb-3">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={(formik.values[field.controlId] || []).includes(
                    choice[field?.valueField]
                  )}
                  
                  onChange={() => handleCheckboxChange(choice[field?.valueField])}
                />
                <Label
                  htmlFor={`checkbox-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {choice[field.displayValue]}
                </Label>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (control?.controlType == 10) {
      // Time Picker
      const handleTimeChange = (value) => {
        formik.setFieldValue(control.controlId, value);
      };
  
      return (
        <div>
          <p className="text-[12px] pb-1">
            {control.question}
            {control.isRequired ? <span className="text-red-500"> *</span> : ""}
          </p>
          <DateTimePicker
            onChange={handleTimeChange}
            value={formik.values[control.controlId] || null}
            disableCalendar={true}
            format={control.timeFormat == 0 ? "hh:mm a" : "HH:mm"}
          />
        </div>
      );
    }
    const [dateChange, onDateChange] = useState(new Date());
    if (field?.controlType == 11) {  //  calendar
      return (
        <div>
          <p className="text-[12px] pb-1">
            {field.question}
            {field.isRequired ? (
              <span className="text-red-500"> *</span>
            ) : (
              ''
            )}
          </p>
          <DateTimePicker  onChange={onDateChange} value={dateChange} disableClock={true}  />
        </div>
      )
    }
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };
    if (field?.controlType == 12) {  //  captcha
      return (
        <div>
          <p className="text-[12px] pb-1">
            {field.question}
            {field.isRequired ? (
              <span className="text-red-500"> *</span>
            ) : (
              ''
            )}
          </p>
          <div className={`flex justify-${field.alignment==1?"center":field.alignment==2?"end":"start"} pt-2`}>
          <ReCAPTCHA
                sitekey="6LeTGSgqAAAAADsoRumBk2bHNKWD0EpNZjPtzyzR" // replace with your actual site key
                onChange={handleCaptchaChange}
            />
            </div>
        </div>
      )
    }
    return null;
}  

export default FieldRenderer