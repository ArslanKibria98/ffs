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
import { useNavigate, useParams } from "react-router-dom";
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
import ReCAPTCHA from "react-google-recaptcha";
let checkBoxValue = [];
export default function InstantPreview() {
    const navigate=useNavigate()
  const version_id = useSelector((state) => state?.formStore.version_id);
  const token = useSelector((state) => state?.authStore?.token);
  const loading = useSelector((state) => state?.loadingStore.value);
  const [defaultTabValue, setDefaultTabVal] = useState("");
  const [loader, setLoader] = useState(false);
  const [instantData, setInstantData] = useState([]);
  const params = useParams();
  const [initialValues, setInitialValues] = useState({});
  console.log(params);
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
    console.log("hello1")
    try {
        if(params?.instantId=="0"){
            const response = await axios.get(`/Form/GetFormDetailsByVersionId?FormVersionId=${params?.fromId}`);
            const data =response.data;
            console.log(data, "data");
            setFormDataApi(data?.data?.containers);
            const formControls = data?.data?.containers.flatMap(container => container.controls) || [];
            console.log(formControls,"flatmap")
            setDefaultTabVal(formDataApi[0]?.containerName?.toString() + "");
            const initialValues = res?.data?.data&&res?.data?.data?.flatMap(container => container.controlsInForm).reduce((acc, control) => {
              const apiControl = formControls.find(apiControl => apiControl.controlId === control.controlId);
              if (apiControl) {
                acc[control.controlId] = control.controlInput || ""; // Set the initial value from static data
              }
              return acc;
            }, {});
            console.log(initialValues,"inioiii")
            setInitialValues(initialValues);
            
            setLoader(false);
        }
        else{
            const res=await axios.get(`/FormInstance/GetFormByFormInstanceId?formInstanceId=${params?.instantId}`);
            if(res?.data?.data){
              const response = await axios.get(`/Form/GetFormDetailsByVersionId?FormVersionId=${params?.fromId}`);
              const data =response.data;
              console.log(data, "data");
              setFormDataApi(data?.data?.containers);
              const formControls = data?.data?.containers.flatMap(container => container.controls) || [];
              console.log(formControls,"flatmap")
              setDefaultTabVal(formDataApi[0]?.containerName?.toString() + "");
              const initialValues = res?.data?.data&&res?.data?.data?.flatMap(container => container.controlsInForm).reduce((acc, control) => {
                const apiControl = formControls.find(apiControl => apiControl.controlId === control.controlId);
                if (apiControl) {
                  acc[control.controlId] = control.controlInput || ""; // Set the initial value from static data
                }
                return acc;
              }, {});
              console.log(initialValues,"inioiii")
              setInitialValues(initialValues);
              
              setLoader(false);
            } 
      
        }

    } catch (error) {
      console.error("Error fetching forms:", error);
      setLoader(false);
    }
  };
  const fetchInstant = async () => {
    setLoader(true);
    try {
      
      const response = await axios.get(`/FormInstance/GetFormByFormInstanceId?formInstanceId=${params?.instantId}`);
      const data =response.data;
      setInstantData(data?.data)
      console.log("hello")
      fetchForms();
      setLoader(false);
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
  
    return(()=>{
        fetchForms()
    })
    
  }, []);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true, 
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
    <div className="h-fit mx-auto p-8">
        <div className="flex mb-2">
            <div  className="text-[#EB0D0D] bg-[#F0F0F0] text-[12px] flex justify-center items-center cursor-pointer px-1 font-semibold" onClick={()=>{navigate(-1)}}>
                {"<-"} 
                <span className="ps-1">
                    Back
                </span>
            </div>
        <label  className="text-ls font-semibold px-2">
                Preview
                </label>
        </div>
      <form onSubmit={formik.handleSubmit} className={"pt-3"}>
        {formDataApi.length > 0 && (
          <Tabs defaultValue={formDataApi[0].containerName}  onValueChange={handleTabChange}>
            <TabsList className="w-100 formBuilderTablist flex gap-[2px]">
              {formDataApi.map((tab, index) => (
                <>
                  {/* {tab.containerName!=null&& */}
                  <TabsTrigger
                    key={index}
                    value={tab?.containerName}
                    className="p-0 px-3 h-8 w-fit"
                  >
                    <h5 className="text-[14px]">
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
                className=" bg-[#fff] p-4 w-full"
              >
                <div className=" grid grid-cols-2 gap-4 gap-y-4">
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
  if (field?.controlType == 12) {
    //  captcha
    return (
      <div>
        <p className="text-[12px] pb-1">
          {field.question}
          {field.isRequired ? <span className="text-red-500"> *</span> : ""}
        </p>
        <div
          className={`flex justify-${field.alignment == 1 ? "center" : field.alignment == 2 ? "end" : "start"} pt-2`}
        >
          <ReCAPTCHA
            sitekey="6LfwmioqAAAAALGowVAMJb_oGuIvMFQZ9V8pY6E4" // replace with your actual site key
            onChange={handleCaptchaChange}
          />
        </div>
      </div>
    );
  }
  if (field?.controlType === 13) {
    //list
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
      <div style={dropdownOptions.length>=10 ||field.choices != null &&field.choices.length>=10?{maxHeight:"210px",overflow:"auto"}:{}}>
        <p className="text-[12px] pb-1">
          {field.question}
          {field.isRequired ? <span className="text-red-500"> *</span> : ""}
        </p>
        <div className="grid grid-cols-2 items-center">
          {field.choices != null && (
            <ul style={field.choices.length>=10?{display:"contents"}:{}}>
              {field.choices != null &&
                field.choices?.map((choice, index) => (
                  <div key={index} className="w-100 flex gap-2 pb-3">
                    <li
                      key={index}
                    >{`${String.fromCharCode(97 + index)}-${choice.value}`}</li>
                  </div>
                ))}
            </ul>
          )}
          {field.choices === null && (
               <ul style={dropdownOptions.length>=10?{display:"contents"}:{}}>
              {field.choices === null &&
                dropdownOptions?.map((choice, index) => (
                  <div key={index} className="w-100 flex gap-2 pb-3">
                    <li
                      key={index}
                    >{`${String.fromCharCode(97 + index)}-${choice[field.displayValue]}`}</li>
                  </div>
                ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
  return null;
}
