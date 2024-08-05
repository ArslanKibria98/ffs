import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Checkbox2 } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import BoxLoader from "@/components/BoxLoader";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StarRating from "@/components/ui/StarRating";
import { Rating } from "react-simple-star-rating";
import axios from "@/lib/axios";
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
// import StarRatings from './react-star-ratings';
// import { Link } from "react-router-dom"
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
let checkBoxValue = [];
export default function FormRender() {
  const version_id = useSelector((state) => state?.formStore.version_id);
  const token = useSelector((state) => state?.authStore?.token);
  const loading = useSelector((state) => state?.loadingStore.value);
  const [defaultTabValue, setDefaultTabVal] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const params = useParams();

  console.log(params.id);
  const [formDataApi, setFormDataApi] = useState([
    //   {
    //     containerName: "Tab Name",
    //     controls: [
    //       { controlType: 0, name: "Personal Details", isRequired: true, placeholder: "Enter text here" },
    //       { controlType: 1, name: "DummyButton", isRequired: false, placeholder: "A dummy button" },
    //       { controlType: 2, name: "Range Slider", isRequired: true, placeholder: "Select age range" },
    //       { controlType: 3, name: "File Upload", isRequired: false, placeholder: "Upload File Here" },
    //       { controlType: 5, name: "Phone Number", isRequired: true, placeholder: "+92 300 0000000" },
    //       { controlType: 4, name: "OTP", isRequired: false, placeholder: "" },
    //     ]
    //   }
  ]);
  const fetchForms = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `http://135.181.57.251:3048/api/Form/GetFormDetailsByVersionId?FormVersionId=${params?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Request-Id": "eef836f0-1a0d-43e5-8200-b02fe4730ce4",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data, "data");
      setFormDataApi(data?.data?.containers);
      setDefaultTabVal(formDataApi[0]?.containerName?.toString() + "");
      setLoader(false);
    } catch (error) {
      console.error("Error fetching forms:", error);
      toast.error("Unable to get form!");
      setLoader(false);
    }
  };
  function formatDate(inputDate) {
    // Parse the input date string
    const date = new Date(inputDate);
  
    // Get the year, month, date, etc.
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  
    // Format the date to the desired string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  
    return formattedDate;
  }
  useEffect(() => {
    fetchForms();
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      console.log("Form Data:", values);
      const textBoxInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 0
              )
            )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          textBoxInput: values[key],
        }));

      const otpInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 4
              )
            )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          otpInput: values[key],
        }));
      const ratingInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 8
              )
            )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          ratingValue: values[key].toString(),
          ratingComment: "abc",
        }));
      const phoneNumberInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 5
              )
            )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          phoneNumber: values[key],
          phoneType: "any",
        }));
      const checkBoxInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 9
              )
            )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          checkBoxInput: values[key].toString(),
        }));
      const radioButtonInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 6
              )
            )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          radioButtonInput: values[key].toString(),
        }));
      const timeInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 10
              )
            )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          timeInput: formatDate(values[key].toString()),
        }));
      const dropdownInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 7
              )
            )
        )

        .map((key) => ({
          controlId: key.toLowerCase(),
          dropdownInput: values[key].toString(),
        }));
      const sliderInput = Object.keys(values)
        .filter(
          (key) =>
            key !== "undefined" &&
            formDataApi.some((tab) =>
              tab.controls.some(
                (control) =>
                  control.controlId === key && control.controlType === 2
              )
            )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          sliderInput: values[key].toString(),
        }));
      // const controlFileInstanceInput = Object.keys(values).filter(key => key !== "undefined" && formDataApi.some(tab => tab.controls.some(control => control.controlId === key && control.controlType === 3))).map(key => ({
      //   "controlId": key.toLowerCase(),
      //   "fileFormat": 0,
      //   "phoneType": "any",

      // }));
      console.log("ata:", sliderInput);
      // toast.success('Form submitted successfully!');
      try {
        setLoader(true);
        const data = {
          formVersionId: version_id,
          textBoxInput,
          phoneNumberInput,
          otpInput,
          ratingInput,
          checkBoxInput,
          timeInput,
          radioButtonInput,
          dropdownInput,
          sliderInput,
        };
        // const response = await fetch(
        //   "http://135.181.57.251:3048/api/FormInstance/CreateFormInstance",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Request-Id": "b561073e-d25b-4057-a1d3-7299129ff0f2",
        //     },
        //     body: JSON.stringify(data),
        //   }
        // );
        const response = await axios.post(
          "/FormInstance/CreateFormInstance",
          JSON.stringify(data)
        );
        const dataRes = response.data;
        console.log(dataRes, "data");
        setLoader(false);
        toast.success(dataRes?.notificationMessage);
        // You can add your POST API call here
        // e.g., postFormData(textBoxInput);
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("Failed to submit form.");
        setLoader(false);
      }
      // You can add your POST API call here
      // e.g., postFormData({ textBoxInput, otpInput });
    },
  });
  const [isLastTabActive, setIsLastTabActive] = useState(false);

  // Function to handle tab change
  const handleTabChange = (newTabValue) => {
    if (formDataApi.length > 1) {
      const lastTabValue = formDataApi[formDataApi.length - 1].containerName;
      setIsLastTabActive(newTabValue === lastTabValue);
    }
  };
  console.log(isLastTabActive,"isLastTabActive")
  return (
    <div className="max-w-[1000px] h-fit mx-auto p-14">
      <form onSubmit={formik.handleSubmit}>
        {formDataApi.length > 0 && (
          <Tabs defaultValue={formDataApi[0].containerName}  onValueChange={handleTabChange}>
            <TabsList className="w-fit space-x-2 py-1 border bg-gray-200 rounded-lg px-1">
              {formDataApi.map((tab, index) => (
                <>
                  {/* {tab.containerName!=null&& */}
                  <TabsTrigger
                    key={index}
                    value={tab?.containerName}
                    className="rounded p-0 px-3 h-8 w-fit"
                  >
                    <h5 className="text-sm">
                      {tab?.containerName || "Tab Name"}
                    </h5>
                  </TabsTrigger>
                  {/* } */}
                </>
              ))}
            </TabsList>
            {formDataApi?.map((tab, index) => (
              <TabsContent
                key={index}
                value={tab?.containerName}
                className="border bg-white p-4 rounded-xl w-full"
              >
                <div className=" grid grid-cols-2 gap-2 gap-y-4">
                  {tab?.controls?.map((field, index) => (
                    <GetRelevantField
                      key={index}
                      control={field}
                      formik={formik}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
        {!loader && formDataApi?.length < 1 ? (
          <div className="p-8 text-center bg-white rounded-lg border text-black">
            <span>No fields in form!</span>
          </div>
        ) : (
          ""
        )}
        {loader && formDataApi?.length < 1 && (
          <div className="p-8 text-center bg-white rounded-lg border">
            <BoxLoader />
          </div>
        )}
        {/* {
          formDataApi.length==formDataApi.length&&
        } */}
        {formDataApi.length >1 ?(
          <>
        {isLastTabActive &&
          <div className="flex flex-row-reverse gap-4 py-4 my-4">
            <Button
              type="submit"
              className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
              disabled={loader}
            >
              Submit
            </Button>
          </div>
         }</>):(<>    <div className="flex flex-row-reverse gap-4 py-4 my-4">
         <Button
           type="submit"
           className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
           disabled={loader}
         >
           Submit
         </Button>
       </div></>)
        }

      </form>
    </div>
  );
}

function GetRelevantField({ control, formik }) {
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
            value={formik.values[field.controlId] || ""}
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
                    {console.log(option[field.displayValue], "1234")}
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
            totalStars={5}
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

  return null;
}
