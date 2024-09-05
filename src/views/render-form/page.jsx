import React, { useState, useEffect } from "react";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as Yup from 'yup';
import axios from "@/lib/axios";
import FormRenderer from "@/components/form-builder/Render/FormRenderer";
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
  const [formDataApi, setFormDataApi] = useState([]);
  const fetchForms = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `/Form/GetFormDetailsByVersionId?FormVersionId=${params?.id}`,
       
      );
      const data =  response.data;
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

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  }); 

  const formik = useFormik({
    initialValues: {},
    validationSchema: {DisplayingErrorMessagesSchema},
    
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
      console.log("ata:", sliderInput);
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
        const response = await axios.post(
          "/FormInstance/CreateFormInstance",
          JSON.stringify(data)
        );
        const dataRes = response.data;
        console.log(dataRes, "data");
        setLoader(false);
        toast.success(dataRes?.notificationMessage);
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("Failed to submit form.");
        setLoader(false);
      }
    },
  });
  return (
    <div className="max-w-[1000px] h-fit mx-auto p-14">
      <FormRenderer formData={formData} formDataApi={formDataApi} formik={formik} loader={loader}/>
    </div>
  );
}
