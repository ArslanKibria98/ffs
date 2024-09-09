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

export default function FormRender() {
  const version_id = useSelector((state) => state?.formStore.version_id);
  const token = useSelector((state) => state?.authStore?.token);
  const loading = useSelector((state) => state?.loadingStore.value);
  const [defaultTabValue, setDefaultTabVal] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const params = useParams();

  console.log(params.id);
  const [formData, setFormData] = useState(null);
  const [formDataApi, setFormDataApi] = useState([]);

  const fetchForms = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`/Form/GetFormDetailsByVersionId?FormVersionId=${params?.id}`);
      const data = response.data;
      console.log(data, "data");
      if (data.data.formVersionStatus == 2) {
        setFormDataApi(data?.data?.containers);
        setFormData(data?.data);
        setDefaultTabVal(data?.data?.containers[0]?.containerName?.toString() + "");
        setLoader(false);
      } else {
        setLoader(false);
        toast.error("Form is not published yet!");
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const createValidationSchema = () => {
    const schema = {};
    formDataApi.forEach((tab) => {
      tab.controls.forEach((control) => {
        switch (control.controlType) {
          case 0: // Text Box
            schema[control.controlId] = Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required');
            break;
            case 2: // Slider
            schema[control.controlId] = Yup.number()
              .min(0, 'Value must be at least 0')
              .max(100, 'Value can be at most 100')
              .required('Required');
            break;  
          case 4: // OTP
            schema[control.controlId] = Yup.string()
              .length(6, 'OTP must be exactly 6 digits')
              .required('Required');
            break;
          case 5: // Phone Number
            schema[control.controlId] = Yup.string()
              .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
              .required('Required');
            break;
          case 6: // Radio Button
            schema[control.controlId] = Yup.string().required('Required');
            break;
          case 7: // Dropdown
            schema[control.controlId] = Yup.string().required('Required');
            break;
          case 8: // Rating
            schema[control.controlId] = Yup.number()
              .min(1, 'Rating must be at least 1')
              .max(5, 'Rating can be at most 5')
              .required('Required');
            break;
          case 9: // Checkbox
            schema[control.controlId] = Yup.boolean();
            break;
          case 10: // Time
            schema[control.controlId] = Yup.date().required('Required');
            break;
            case 12: // CAPTCHA
    schema[control.controlId] = Yup.string()
      .required('Please complete the CAPTCHA');
    break;
          
          default:
            break;
        }
      });
    });
    return Yup.object().shape(schema);
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: createValidationSchema(),
    onSubmit: async (values) => {
      console.log("Form Data:", values);

      // Process form values here as needed
      // Example:
      const textBoxInput = Object.keys(values)
        .filter((key) =>
          formDataApi.some((tab) =>
            tab.controls.some((control) =>
              control.controlId === key && control.controlType === 0
            )
          )
        )
        .map((key) => ({
          controlId: key.toLowerCase(),
          textBoxInput: values[key],
        }));

      // ... other inputs processing here

      try {
        setLoader(true);
        const data = {
          formVersionId: params.id,
          textBoxInput,
          // Add other processed inputs here
        };
        const response = await axios.post("/FormInstance/CreateFormInstance", JSON.stringify(data));
        const dataRes = response.data;
        console.log(dataRes, "data");
        setLoader(false);
        toast.success(dataRes?.notificationMessage);
      } catch (error) {
        console.error("Error submitting form data:", error);
        toast.error("Failed to submit form.");
        setLoader(false);
      }
    },
  });

  return (
    <div className="max-w-[1000px] h-fit mx-auto p-14">
      <FormRenderer formData={formData} formDataApi={formDataApi} formik={formik} loader={loader} />
    </div>
  );
}
