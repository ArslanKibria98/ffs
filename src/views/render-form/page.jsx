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
import StarRating from "@/components/ui/StarRating"
import { Rating } from "react-simple-star-rating";
import axios from "@/lib/axios";
import DateTimePicker from 'react-datetime-picker';
// import StarRatings from './react-star-ratings';
// import { Link } from "react-router-dom"
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
let checkBoxValue=[]
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
    //       { controlType: 0, name: "Personal Details", is_Required: true, placeholder: "Enter text here" },
    //       { controlType: 1, name: "DummyButton", is_Required: false, placeholder: "A dummy button" },
    //       { controlType: 2, name: "Range Slider", is_Required: true, placeholder: "Select age range" },
    //       { controlType: 3, name: "File Upload", is_Required: false, placeholder: "Upload File Here" },
    //       { controlType: 5, name: "Phone Number", is_Required: true, placeholder: "+92 300 0000000" },
    //       { controlType: 4, name: "OTP", is_Required: false, placeholder: "" },
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
          ratingComment:"abc"
        }));
      const phoneNumberInstanceInput = Object.keys(values)
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
          timeInput: values[key].toString(),
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
          phoneNumberInstanceInput,
          otpInput,
          ratingInput,checkBoxInput,timeInput
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
        const response = await axios.post("/FormInstance/CreateFormInstance", JSON.stringify(data));
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

  const handleSave = () => {
    console.log("Form Data on Save:", formik.values);
    toast.success("Form saved successfully!");
  };

  return (
    <div className="max-w-[1000px] h-[83vh] mx-auto p-14">
      <form onSubmit={formik.handleSubmit}>
        {formDataApi.length > 0 && (
          <Tabs defaultValue={formDataApi[0].containerName}>
            <TabsList className="w-fit space-x-2 py-1 border bg-gray-200 rounded-lg px-1">
              {formDataApi.map((tab, index) => (
                <TabsTrigger
                  key={index}
                  value={tab?.containerName}
                  className="rounded p-0 px-3 h-8 w-fit"
                >
                  <h5 className="text-sm">
                    {console.log(tab.containerName,"123")}
                    {tab?.containerName || "Tab Name"}
                  </h5>
                </TabsTrigger>
              ))}
            </TabsList>
            {formDataApi?.map((tab, index) => (
              <TabsContent
                key={index}
                value={tab?.containerName}
                className="border bg-white p-4 rounded-xl w-full min-h-[400px]"
              >
                {tab?.controls?.map((field, index) => (
                  <GetRelevantField
                    key={index}
                    control={field}
                    formik={formik}
                  />
                ))}
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
        <div className="flex flex-row-reverse gap-4 py-4 my-4">
          <Button
            type="submit"
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
            disabled={loader}
          >
            Submit
          </Button>
        </div>
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
      <div>
        <p className="text-[12px]">
          {field?.name}
          {field.is_Required ? <span className="text-red-500"> *</span> : ""}
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
      <div>
        <p className="text-[12px]">
          {field.name}
          {field.is_Required ? <span className="text-red-500"> *</span> : ""}
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
      console.log(value,field.name,"12345")
      formik.setFieldValue(field.name, value[0]);
    };

    return (
      <div className="col-span-2 flex flex-col gap-y-2">
        <p className="text-[12px]">
          {field.question}
          {field.is_Required ? <span className="text-red-500"> *</span> : ""}
        </p>
        <div className="flex justify-between w-full gap-3">
          <Slider
            max={100}
            step={1}
            value={[formik.values[field.name] || 0]}
            onValueChange={handleSliderChange}
          />
        </div>
      </div>
    );
  }

  if (field?.controlType === 3) {
    //  File
    return (
      <div>
        <p className="text-[12px]">
          {field?.question}
          {field.is_Required ? <span className="text-red-500"> *</span> : ""}
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
      <div>
        <p className="text-[12px]">
          {field.question}
          {field.is_Required ? <span className="text-red-500"> *</span> : ""}
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
      <div>
        <p className="text-[12px]">
          {field.question}
          {field.is_Required ? <span className="text-red-500"> *</span> : ""}
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
  const handleRating = (rate) => {
    console.log(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);
  if (field?.controlType === 8) {
    const totalStars=5;
    //  rating
    return (
      <div>
        <p className="text-[12px]">
          {field.question}
          {field.is_Required ? <span className="text-red-500"> *</span> : ""}
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
  
  const handleCheckboxChange = (choiceName) => {
    setSelectedChoices((prevSelected) =>
      prevSelected.includes(choiceName)
        ? prevSelected.filter((name) => name !== choiceName)
        : [...prevSelected, choiceName]
    );
  };
  checkBoxValue=selectedChoices
  console.log(checkBoxValue,"-==--")
  if (field?.controlType === 9) {
    const handleCheckboxChange = (choiceName) => {
      const currentChoices = formik.values[field.controlId] || [];
      const updatedChoices = currentChoices.includes(choiceName)
        ? currentChoices.filter((name) => name !== choiceName)
        : [...currentChoices, choiceName];
  
      formik.setFieldValue(field.controlId, updatedChoices);
    };
  
    return (
      <div>
        <p className="text-[12px]">
          {field.question}
          {field.is_Required ? <span className="text-red-500"> *</span> : ''}
        </p>
        <div className="my-4 grid grid-cols-3 items-center">
          {field.choices?.map((choice, index) => (
            <div key={index} className="w-100 flex gap-2 pb-3">
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={(formik.values[field.controlId] || []).includes(choice.choiceName)}
                onChange={() => handleCheckboxChange(choice.choiceName)}
              />
              <label
                htmlFor={`checkbox-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {choice.choiceName}
              </label>
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
        <p className="text-[12px]">
          {control.question}
          {control.is_Required ? (
            <span className="text-red-500"> *</span>
          ) : (
            ''
          )}
        </p>
        <DateTimePicker
          onChange={handleTimeChange}
          value={formik.values[control.controlId] || null}
          disableCalendar={true}
          format={control.timeFormat == 0 ? 'hh:mm a' : 'HH:mm'}
        />
      </div>
    );
  }

  return null;
}