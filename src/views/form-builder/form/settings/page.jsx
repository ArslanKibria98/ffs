import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import localisationData from "../../../../localisation.json";
import toast from "react-hot-toast";

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox2 } from "@/components/ui/checkbox";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "@/lib/axios";

export default function FormSettingsPage() {
  // const router = useRouter()

  const version_id = useSelector((state) => state?.formStore.version_id);

  const availableLanguages = [
    "English",
    "Urdu",
    "Spanish",
    "Hindi",
    "Sindi",
    "Pushto",
    "Arabic",
  ];
  const availableCountries = [
    "Pakistan",
    "India",
    "Uae",
    "America",
    "Qatar",
    "Afghanistan",
    "Iran",
    "Bangladash",
  ];
  const [formAttr, setFormAttr] = useState(null);
  const language = useSelector((state) => state.language.language);
  const navigate = useNavigate();
  const [fieldLabel, setFieldLabel] = useState("");
  const token = useSelector((state) => state?.authStore?.token);
  const [fieldName, setFieldName] = useState("");
  const [fieldPlaceholder, setFieldPlaceholder] = useState("");
  const [fieldPlaceholderFail, setFieldPlaceholderFail] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState("");
  const [defaultCountry, setDefaultCountry] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const handleLanguageChange = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const handleCountryChange = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleSubmit = async () => {
    const formData = {
      formVersionId: version_id,
      formRequiredFieldIndicator: fieldLabel,
      targetUrl: fieldName,
      successMessage: fieldPlaceholder,
      failMessage: fieldPlaceholderFail,
      // isMandatory,
      DefualtLanguage: defaultLanguage,
      defaultCountry: defaultCountry,
      languages: selectedLanguages,
      countries: selectedCountries,
    };

    try {
      const response = await axios.post(
        "/Form/SetFormAttributes",JSON.stringify(formData));

      if (response) {
        let responseData = response.data;
        console.log(responseData, "1---1");
        toast.success(responseData?.notificationMessage);
        // router.push(`/form-builder/form/preview`)
        // navigate(`/form-builder/form/preview`)
        window.location.href = `/form-builder/form/preview`;
      } else {
        let responseData = await response.json();
        toast.success(responseData?.errors[0]);
        toast.error("Failed to submit the form.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  async function getFormAttributes() {
    await axios.get(`/Form/GetFormAttributes`).then((res) => {
      if (res.status == 200) {
        console.log(res);
        setFormAttr(res.data.data)
      } else {toast.error("Unable to get form settings!")}
    })
  }
  useEffect(()=>{
    return ()=> getFormAttributes();
  }, [])
  
  let locData = localisationData.formSetting.en;
  if (language == "en") {
    locData = localisationData.formSetting.en;
  } else if (language == "ar") {
    locData = localisationData.formSetting.ar;
  }
  return (
    <div className="p-6">
      <Tabs defaultValue={"details"}>
        <TabsList className="formBuilderTablist">
          <TabsTrigger
            value={"details"}
            className="px-5 h-10 mb-0 mr-[2px]"
          >
            {locData?.name || "Form Details"}
          </TabsTrigger>
          <TabsTrigger
            value={"language"}
            className="px-5 h-10 mb-0 mr-[2px]"
          >
            {locData?.lSetting || "Language Settings"}
          </TabsTrigger>
          <TabsTrigger
            value={"country"}
            className="px-5 h-10 mb-0 mr-[2px]"
          >
            {locData?.cSetting || "Country Settings"}
          </TabsTrigger>
          <TabsTrigger
            value={"error"}
            className="px-5 h-10 mb-0 mr-[2px]"
          >
            {"Error Settings"}
          </TabsTrigger>
          <TabsTrigger
            value={"layout"}
            className="px-5 h-10 mb-0 mr-[2px]"
          >
            {"Layout Settings"}
          </TabsTrigger>
        </TabsList>
        <div className="border-radius bg-[#ffffff] p-6 min-h-[500px]">
          <TabsContent value={"details"} className="my-0 py-0 w-full">
            <div className="grid grid-cols-2 gap-8 gap-y-4">
              <h5 className="text-xl font-semibold mt-4 col-span-2">
                {locData?.name || "Form Details"}
              </h5>
              <div>
                <label htmlFor="fieldLabel" className="text-xs font-semibold">
                  {locData?.field1 || "Required Field Indicator"}
                </label>
                <Input
                  name="fieldIndicator"
                  placeholder="Enter Field Label"
                  className="p-4 h-[48px]"
                  value={fieldLabel}
                  onChange={(e) => setFieldLabel(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="fieldName" className="text-xs font-semibold">
                  {locData?.field2 || "Target URL"}
                </label>
                <Input
                  name="targetUrl"
                  placeholder="Enter Field Name"
                  className="p-4 h-[48px]"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="fieldPlaceholder"
                  className="text-xs font-semibold"
                >
                  {locData?.field3 || "Success Message"}
                </label>
                <Input
                  name="successMessage"
                  placeholder="Enter Field Placeholder"
                  className="p-4 h-[48px]"
                  value={fieldPlaceholder}
                  onChange={(e) => setFieldPlaceholder(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="fieldPlaceholder"
                  className="text-xs font-semibold"
                >
                  {locData?.field4 || "Fail Message"}
                </label>
                <Input
                  name="failMessage"
                  placeholder="Enter Field Placeholder"
                  className="p-4 h-[48px]"
                  value={fieldPlaceholderFail}
                  onChange={(e) => setFieldPlaceholderFail(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value={"language"} className="my-0 py-0 w-full">
            <div className="grid grid-cols-2 gap-8 gap-y-4">
              <h5 className="text-xl font-semibold mt-4 col-span-2">
                {" "}
                {locData?.lSetting || "Language Settings"}
              </h5>

              <div className="col-span-1">
                <label htmlFor="defaultLanguage" className="text-xs font-semibold">
                  {locData?.dLanguage || "Default Language"}
                </label>
                <Input
                  name="defaultLanguage"
                  placeholder="Enter Default Language"
                  className="p-4 h-[48px]"
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                />
              </div>
              <div className="mb-4 col-span-2 flex items-center space-x-2">
                <Checkbox2 checked={isMandatory} onCheckedChange={setIsMandatory} />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {locData?.allLanguage || "Select all languages?"}
                </label>
              </div>
              <h5 className="text-xl font-semibold mt-4 col-span-2">
                {locData?.sLanguage || "Select Languages"}
              </h5>
              <div className="col-span-2 grid grid-cols-4 gap-4">
                {availableLanguages.map((language, index) => (
                  <div
                    key={index}
                    className="col-span-1 flex items-center space-x-2"
                  >
                    <Checkbox2
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={() => handleLanguageChange(language)}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value={"country"} className="my-0 py-0 w-full">
            <div className="grid grid-cols-2 gap-8 gap-y-4">
              <div className="col-span-2">
                <label
                  htmlFor="tabName"
                  className="text-xl font-semibold mt-4 col-span-2"
                >
                  {locData?.sCountry || "Country Settings"}
                </label>
              </div>
              <div className="col-span-1">
                <label htmlFor="defaultCountry" className="text-xs font-semibold">
                  {locData?.dCountry || "Default Country"}
                </label>
                <Input
                  name="defaultCountry"
                  placeholder="Enter Default Country"
                  className="p-4 h-[48px]"
                  value={defaultCountry}
                  onChange={(e) => setDefaultCountry(e.target.value)}
                />
              </div>
              <div className="mb-4 col-span-2 flex items-center space-x-2">
                <Checkbox2 checked={isMandatory} onCheckedChange={setIsMandatory} />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {locData?.allCountry || "Select all Countries?"}
                </label>
              </div>
              <h5 className="text-xl font-semibold mt-4 col-span-2">
                {locData?.cSetting || "Select Countries"}
              </h5>
              <div className="col-span-2 grid grid-cols-4 gap-4">
                {availableCountries.map((country, index) => (
                  <div
                    key={index}
                    className="col-span-1 flex items-center space-x-2"
                  >
                    <Checkbox2
                      checked={selectedCountries.includes(country)}
                      onCheckedChange={() => handleCountryChange(country)}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {country}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value={"error"} className="my-0 py-0 w-full">
            <div className="grid grid-cols-2 gap-8 gap-y-4">
              <div className="col-span-2">
                <label
                  htmlFor="tabName"
                  className="text-md font-semibold mt-4 col-span-2"
                >
                  {"Error Message Position"}
                </label>
              </div>
              <RadioGroup defaultValue="below" onValueChange={(e)=>console.log(e)} className="col-span-2 grid grid-cols-2">
                <Label htmlFor="option-one" className="cursor-pointer flex items-center space-x-2 border rounded px-3 py-4">
                  <RadioGroupItem value="below" id="option-one" />
                  <Label className="cursor-pointer" htmlFor="option-one">Below Input Fields</Label>
                </Label>
                <Label htmlFor="option-two" className="cursor-pointer flex items-center space-x-2 border rounded px-3 py-4">
                  <RadioGroupItem value="after" id="option-two" />
                  <Label className="cursor-pointer" htmlFor="option-two">Stacked After Form</Label>
                </Label>
              </RadioGroup>
            </div>
          </TabsContent>
          <TabsContent value={"layout"} className="my-0 py-0 w-full">
            <div className="p-10">
              <RadioGroup defaultValue="one" className="gap-28 gap-y-4 grid grid-cols-3">
                <div className="flex flex-col space-x-2 border rounded px-3 py-4">
                  <RadioGroupItem value="one" id="option-one" />
                  {/* <Label htmlFor="option-one">Below Input Fields</Label> */}
                  <img src="/one-column.png" alt="Layout columns" className="w-[96%] py-8" />
                </div>
                <div className="flex flex-col space-x-2 border rounded px-3 py-4">
                  <RadioGroupItem value="two" id="option-two" />
                  {/* <Label htmlFor="option-two">Stacked After Form</Label> */}
                  <img src="/two-column.png" alt="Layout columns" className="w-[96%] py-8" />
                </div>
                <div className="flex flex-col space-x-2 border rounded px-3 py-4">
                  <RadioGroupItem value="multi" id="option-multi" />
                  {/* <Label htmlFor="option-two">Stacked After Form</Label> */}
                  <img src="/multi-column.png" alt="Layout columns" className="w-[96%] py-8" />
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex flex-row-reverse gap-4 py-1 my-4">
        <Button
          className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
          onClick={handleSubmit}
        >
          {locData?.next || "Next"}
        </Button>
        <a href={`/form-builder/form`}>
          <Button className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
          {locData?.prev || "Previous"}
          </Button>
        </a>
      </div>
    </div>
  );
}
