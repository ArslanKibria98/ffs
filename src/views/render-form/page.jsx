import React, { useState, useEffect } from "react";

import FormRenderer from "@/components/form-builder/Render/FormRenderer";
import FieldRenderer from "@/components/form-builder/Render/FieldRenderer";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Slider } from "@/components/ui/slider";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { Checkbox2 } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import BoxLoader from "@/components/BoxLoader";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import StarRating from "@/components/ui/StarRating";
// import { Rating } from "react-simple-star-rating";
import axios from "@/lib/axios";
import { v4 as uuidv4 } from "uuid";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

// let checkBoxValue = [];

export default function FormRender() {
  const version_id = useSelector((state) => state?.formStore.version_id);
  const token = useSelector((state) => state?.authStore?.token);
  const loading = useSelector((state) => state?.loadingStore.value);
  const [defaultTabValue, setDefaultTabVal] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const params = useParams();

  console.log(params.id);
  const [formData, setFormData] = useState(null)
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
        `/Form/GetFormDetailsByVersionId?FormVersionId=${params?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Request-Id": uuidv4(),
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data, "data");
      if(data.data.formVersionStatus==2){
        setFormDataApi(data?.data?.containers);
        setFormData(data?.data);
        setDefaultTabVal(formDataApi[0]?.containerName?.toString() + "");
        setLoader(false);
      }
      else{
        setLoader(false);
        toast.error("Form is not published yet!")
      }
      
    } catch (error) {
      console.error("Error fetching forms:", error);
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
          formVersionId: params.id,
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
  // const [isLastTabActive, setIsLastTabActive] = useState(false);

  // Function to handle tab change
  // const handleTabChange = (newTabValue) => {
  //   if (formDataApi.length > 1) {
  //     const lastTabValue = formDataApi[formDataApi.length - 1].containerName;
  //     setIsLastTabActive(newTabValue === lastTabValue);
  //   }
  // };
  // console.log(isLastTabActive,"isLastTabActive")
  return (
    <div className="max-w-[1000px] h-fit mx-auto p-14">
      <FormRenderer formData={formData} formDataApi={formDataApi} formik={formik} loader={loader}/>
      {/* <form onSubmit={formik.handleSubmit}>
        {formDataApi.length > 0 && (
          <Tabs defaultValue={formDataApi[0].containerName}  onValueChange={handleTabChange}>
            <TabsList className="w-fit space-x-2 py-1 border bg-gray-200 rounded-lg px-1">
              {formDataApi.map((tab, index) => (
                <>
                  <TabsTrigger
                    key={index}
                    value={tab?.containerName}
                    className="rounded p-0 px-3 h-8 w-fit"
                  >
                    <h5 className="text-sm">
                      {tab?.containerName || "Tab Name"}
                    </h5>
                  </TabsTrigger>
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
                    <FieldRenderer
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

      </form> */}
    </div>
  );
}
