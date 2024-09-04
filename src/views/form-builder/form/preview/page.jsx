import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import FormRenderer from '@/components/form-builder/Render/FormRenderer';
import { useFormik } from "formik";
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import localisationData from "../../../../localisation.json";
import axios from '@/lib/axios';
import { Link } from 'react-router-dom';

export default function FormPreviewPage() {
  const token = useSelector((state) => state?.authStore?.token);
  const version_id = useSelector((state) => state?.formStore.version_id);
  const language = useSelector((state) => state.language.language);
    
  let locData = localisationData.formSetting.en;
  if (language == "en") {
    locData = localisationData.formSetting.en;
  } else if (language == "ar") {
    locData = localisationData.formSetting.ar;
  }

  const [loader, setLoader] = useState(true);
  const [formDataApi, setFormDataApi] = useState([])
  
  const fetchForms = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`/Form/GetFormDetailsByVersionId?FormVersionId=${version_id}`)
      const data = await response.data
      console.log(data, 'data')
      setFormDataApi(data?.data?.containers)
      // setForms(data)
      setLoader(false)
    } catch (error) {
      console.error('Error fetching forms:', error)
      setLoader(false)
    }
  }

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
  
  useEffect(() => {
    return () => fetchForms();
  }, [])

  return (
    <div className="max-w-[1000px] mx-auto p-14">
      <FormRenderer formDataApi={formDataApi} formik={formik} loader={loader} preview={true} />

      <div className="flex flex-row-reverse gap-4 py-4 my-4">
        <Link to={`/form-builder/form/save`}>
          <Button
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
          >
            {locData?.next || "Next"}
          </Button>
        </Link>
        <Link to={`/form-builder/form/settings`}>
        <Button
          className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light"
        >
          {locData?.prev || "Previous"}
        </Button>
        </Link>
      </div>
    </div>
  )
}