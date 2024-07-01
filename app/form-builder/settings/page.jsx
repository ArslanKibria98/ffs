'use client'
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
import { Checkbox2 } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router=useRouter()
  const availableLanguages = ['English', 'Urdu', 'Spanish'];
  const availableCountries = ['Pakistan', 'India'];

  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [fieldPlaceholder, setFieldPlaceholder] = useState('');
  const [fieldPlaceholderFail, setFieldPlaceholderFail] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState('');
  const [defaultCountry, setDefaultCountry] = useState('');
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
      formVersionId: "aaeaf5b0-079f-48fa-c4da-08dc950b4ce7",
      formRequiredFieldIndicator:fieldLabel,
      targetUrl:fieldName,
      successMessage:fieldPlaceholder,
      failMessage:fieldPlaceholderFail,
      // isMandatory,
      DefualtLanguage:defaultLanguage,
      defaultCountry:defaultCountry,
      languages: selectedLanguages,
      countries: selectedCountries
    };

    try {
      const response = await fetch('http://135.181.57.251:3048/api/Form/SetFormAttributes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Id': 'a1336723-9a4b-44d0-8fa3-0239dd6b60e3'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        let responseData=await response.json()
        console.log(responseData,"1---1")
        toast.success(responseData?.notificationMessage)
        router.push("/form-builder/preview")
      } else {
        toast.success(responseData?.errors[0])
        toast.error('Failed to submit the form.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="border-radius bg-white p-6">
        <div className="grid grid-cols-2 gap-8 gap-y-4">
          <h5 className="text-xl font-semibold mt-4 col-span-2">Form Details</h5>
          <div>
            <label htmlFor="fieldLabel" className="text-xs font-semibold">Required Field Indicator</label>
            <Input
              name="fieldIndicator"
              placeholder="Enter Field Label"
              className="p-4 h-[48px]"
              value={fieldLabel}
              onChange={(e) => setFieldLabel(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fieldName" className="text-xs font-semibold">Target URL</label>
            <Input
              name="targetUrl"
              placeholder="Enter Field Name"
              className="p-4 h-[48px]"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fieldPlaceholder" className="text-xs font-semibold">Success Message</label>
            <Input
              name="successMessage"
              placeholder="Enter Field Placeholder"
              className="p-4 h-[48px]"
              value={fieldPlaceholder}
              onChange={(e) => setFieldPlaceholder(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fieldPlaceholder" className="text-xs font-semibold">Fail Message</label>
            <Input
              name="failMessage"
              placeholder="Enter Field Placeholder"
              className="p-4 h-[48px]"
              value={fieldPlaceholderFail}
              onChange={(e) => setFieldPlaceholderFail(e.target.value)}
            />
          </div>
<div className='border-t-4 border-rgb(131 131 131)-500 text-xl font-semibold mt-4 col-span-2'></div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">Language Settings</h5>

          <div className="col-span-1">
            <label htmlFor="defaultLanguage" className="text-xs font-semibold">Default Language</label>
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
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select all languages?</label>
          </div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">Select Languages</h5>
          <div className="col-span-2 grid grid-cols-4 gap-4">
            {availableLanguages.map((language, index) => (
              <div key={index} className="col-span-1 flex items-center space-x-2">
                <Checkbox2
                  checked={selectedLanguages.includes(language)}
                  onCheckedChange={() => handleLanguageChange(language)}
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{language}</label>
              </div>
            ))}
          </div>
          <div className='border-t-4 border-rgb(131 131 131)-500 text-xl font-semibold mt-4 col-span-2'></div>
          <div className="col-span-2">
            <label htmlFor="tabName" className="text-xl font-semibold mt-4 col-span-2">Country Settings</label>
          </div>
          <div className="col-span-1">
            <label htmlFor="defaultCountry" className="text-xs font-semibold">Default Country</label>
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
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select all Countries?</label>
          </div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">Select Countries</h5>
          <div className="col-span-2 grid grid-cols-4 gap-4">
            {availableCountries.map((country, index) => (
              <div key={index} className="col-span-1 flex items-center space-x-2">
                <Checkbox2
                  checked={selectedCountries.includes(country)}
                  onCheckedChange={() => handleCountryChange(country)}
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{country}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row-reverse gap-4 py-1 my-4">
          <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]" onClick={handleSubmit}>
            Next
          </Button>

          <Button className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
            Previous
          </Button>
        </div>
      </div>
    </div>
  );
}
