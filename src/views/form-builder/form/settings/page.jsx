import React, { useState } from 'react'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Checkbox2 } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import toast from 'react-hot-toast'
import localisationData from '../../../../localisation.json'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

export default function FormSettingsPage() {
  // const router = useRouter()

  const version_id = useSelector((state) => state?.formStore.version_id)

  const availableLanguages = [
    'English',
    'Urdu',
    'Spanish',
    'Hindi',
    'Sindi',
    'Pushto',
    'Arabic'
  ]
  const availableCountries = [
    'Pakistan',
    'India',
    'Uae',
    'America',
    'Qatar',
    'Afghanistan',
    'Iran',
    'Bangladash'
  ]
  const language = useSelector((state) => state.language.language)
  const [fieldLabel, setFieldLabel] = useState('')
  const [fieldName, setFieldName] = useState('')
  const [fieldPlaceholder, setFieldPlaceholder] = useState('')
  const [fieldPlaceholderFail, setFieldPlaceholderFail] = useState('')
  const [isMandatory, setIsMandatory] = useState(false)
  const [defaultLanguage, setDefaultLanguage] = useState('')
  const [defaultCountry, setDefaultCountry] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  const handleLanguageChange = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    )
  }

  const handleCountryChange = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    )
  }

  const handleSubmit = async () => {
    const formData = {
      formVersionId: 'aaeaf5b0-079f-48fa-c4da-08dc950b4ce7',
      formRequiredFieldIndicator: fieldLabel,
      targetUrl: fieldName,
      successMessage: fieldPlaceholder,
      failMessage: fieldPlaceholderFail,
      // isMandatory,
      DefualtLanguage: defaultLanguage,
      defaultCountry: defaultCountry,
      languages: selectedLanguages,
      countries: selectedCountries
    }

    try {
      const response = await fetch(
        'http://135.181.57.251:3048/api/Form/SetFormAttributes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        }
      )

      if (response.ok) {
        let responseData = await response.json()
        console.log(responseData, '1---1')
        toast.success(responseData?.notificationMessage)
        // router.push(`/form-builder/form/preview`)
        window.location.href = `/form-builder/form/preview`;
      } else {
        let responseData = await response.json()
        toast.success(responseData?.errors[0])
        toast.error('Failed to submit the form.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }
  let locData = localisationData.formSetting.en
  // console.log(locData);

  if (language == 'en') {
    locData = localisationData.formSetting.en
  } else if (language == 'ar') {
    locData = localisationData.formSetting.ar
  }
  return (
    <div className="p-6">
      <div className="border-radius bg-white p-6">
        <div className="grid grid-cols-2 gap-8 gap-y-4">
          <h5 className="text-xl font-semibold mt-4 col-span-2">
            {locData?.name || 'Form Details'}
          </h5>
          <div>
            <label htmlFor="fieldLabel" className="text-xs font-semibold">
              {locData?.field1 || 'Required Field Indicator'}
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
              {locData?.field2 || 'Target URL'}
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
            <label htmlFor="fieldPlaceholder" className="text-xs font-semibold">
              {locData?.field3 || 'Success Message'}
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
            <label htmlFor="fieldPlaceholder" className="text-xs font-semibold">
              {locData?.field4 || 'Fail Message'}
            </label>
            <Input
              name="failMessage"
              placeholder="Enter Field Placeholder"
              className="p-4 h-[48px]"
              value={fieldPlaceholderFail}
              onChange={(e) => setFieldPlaceholderFail(e.target.value)}
            />
          </div>
          <div className="border-t-4 border-rgb(131 131 131)-500 text-xl font-semibold mt-4 col-span-2"></div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">
            {' '}
            {locData?.lSetting || 'Language Settings'}
          </h5>

          <div className="col-span-1">
            <label htmlFor="defaultLanguage" className="text-xs font-semibold">
              {locData?.dLanguage || 'Default Language'}
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
              {locData?.allLanguage || 'Select all languages?'}
            </label>
          </div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">
            {locData?.sLanguage || 'Select Languages'}
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
          <div className="border-t-4 border-rgb(131 131 131)-500 text-xl font-semibold mt-4 col-span-2"></div>
          <div className="col-span-2">
            <label
              htmlFor="tabName"
              className="text-xl font-semibold mt-4 col-span-2"
            >
              {locData?.sCountry || 'Country Settings'}
            </label>
          </div>
          <div className="col-span-1">
            <label htmlFor="defaultCountry" className="text-xs font-semibold">
              {locData?.dCountry || 'Default Country'}
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
              {locData?.allCountry || 'Select all Countries?'}
            </label>
          </div>
          <h5 className="text-xl font-semibold mt-4 col-span-2">
            {locData?.cSetting || 'Select Countries'}
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

        <div className="flex flex-row-reverse gap-4 py-1 my-4">
          <Button
            className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
            onClick={handleSubmit}
          >
            Next
          </Button>
          <a href={`/form-builder/form`}>
            <Button className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]">
              Previous
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
