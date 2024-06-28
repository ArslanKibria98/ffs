"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Command,
  CommandInput,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import toast from "react-hot-toast"

import localisationData from "@/localisation.json"
import { useSelector } from 'react-redux';
import BoxLoader from "@/components/BoxLoader";

const formFlow = () => {
  const language = useSelector((state) => state.language.language);
  const userId = useSelector((state) => state.authStore.id);
  const tenantId = useSelector((state) => state.authStore.tenant_id);
  // console.log(userId)

  const [forms, setForms] = useState([
    {
      formId: "FFS-1",
      formName: "Dummy Name",
      repositoryName: "Repository",
      languages: ["English", "Arabic"],
      countries: ["Pakistan", "KSA"],
      createdBy: "Dummy",
      createdDate: "12/2/24",
      lastModifiedBy: "Dummy",
      lastModifiedDate: "12/2/24",
      versionNumber: "1.0",
      status: "Unpublished"
    },
    {
      formId: "FFS-2",
      formName: "Dummy Name 2",
      repositoryName: "Repository 2",
      languages: ["Arabic", "Turkish"],
      countries: ["KSA", "Turky"],
      createdBy: "Dummy 2",
      createdDate: "2/2/20",
      lastModifiedBy: "Dummy 2",
      lastModifiedDate: "10/2/14",
      versionNumber: "1.4",
      status: "Published"
    },
  ])
  const router=useRouter()

  useEffect(() => {
    return async () => {
      try {
        const response = await fetch(`http://135.181.57.251:3048/api/Form/GetAllForms?UserId=${userId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Request-Id':'eef836f0-1a0d-43e5-8200-b02fe4730ce4'
          },
         
        }) 
        const data = await response.json()
        // console.log(data.data);
        if (data?.data?.length > 0) {
          // console.log(data.data)
          setForms(data.data)
        } else {
          toast.error("No forms found for this user!");
        }
      } catch (error) {
        console.error('Error fetching forms:', error)
      }
    }
  }, [])

  const handleCreateForm = async () => {
    try {
      const response = await fetch(
        'http://135.181.57.251:3048/api/Form/InitiateForm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Request-Id': '081eff6f-0897-467f-9925-e202db311ac4'
          },
          body: JSON.stringify({
            tenantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            formName: '',
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            repositoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
          })
        }
      )
      if (response.ok) {
        let responseData = await response.json()
        // Fetch the updated forms list
        // const updatedForms = await response.json()
        toast.success(responseData.notificationMessage)
        router.push('/form-builder')
      } else {
        console.error('Failed to create form')
      }
    } catch (error) {
      console.error('Error creating form:', error)
    }
  }

  let locData = localisationData.home.en;
  // console.log(locData);

  if (language == "en") {
    locData = localisationData.home.en;
  } else if (language == "ar") {
    locData = localisationData.home.ar;
  }

  return (
    <div className="min-h-[82.8vh] p-6 flex flex-col items-center pt-16">
      <div className="w-full flex justify-between items-center my-3">
     
        <Select className="" defaultValue="folder">
          <SelectTrigger className="max-w-[160px] h-[46px] space-x-1 font-semibold text-md w-fit bg-transparent border-0">
            <Image src="/folder.svg" alt="Folder icon" width={24} height={24} />
            <SelectValue placeholder={locData?.folder || "Folder"} className="px-0 mx-0"/>
          </SelectTrigger>
          <SelectContent className="p-0">
            <SelectItem value="folder" className="border-b border-[#f8c8ca] hover:bg-[#ececec]">Folder</SelectItem>
            <SelectItem value="onboarding" className="border-b border-[#f8c8ca] hover:bg-[#ececec]">Onboarding Folder</SelectItem>
            <SelectItem value="kyc" className="border-b border-[#f8c8ca] hover:bg-[#ececec]">KYC Folder</SelectItem>
            <SelectItem value="kyb" className="border-b border-[#f8c8ca] hover:bg-[#ececec]">KYB Folder</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-evenly gap-2 items-center">
          <Command className="w-[400px] xl:w-[500px]">
            <CommandInput placeholder={locData?.search || "Search"} />
          </Command>
          <Select className="">
            <SelectTrigger className="max-w-[160px] h-[46px] text-[#838383] border border-[#e6e3ea] bg-[#ececec]">
              <SelectValue placeholder={locData?.filter || "Filter By"}/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select className="">
            <SelectTrigger className="max-w-[160px] h-[46px] text-[#838383] border border-[#e6e3ea] bg-[#ececec]">
              <SelectValue placeholder={locData?.sort || "Sort By"}/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
     
          <Button onClick={handleCreateForm} className="bg-[#e2252e] hover:bg-[#e2252eec] font-normal text-[16px] h-[45px]">
            + {locData?.createNewForm || "Create New Form"}
          </Button>
      
        </div>
      </div>
      <div className="w-full rounded-xl bg-white overflow-hidden">
        <Table className="rounded-lg border bg-white overflow-x-scroll">
          <TableHeader>
            <TableRow className="bg-[#e2252e] hover:bg-[#e2252e]">
              <TableHead className="min-w-[100px] text-white">{locData?.columns?.formID || "Form ID"}</TableHead>
              <TableHead className="min-w-[110px] text-white">{locData?.columns?.formName || "Form Name"}</TableHead>
              <TableHead className="min-w-[160px] text-white">{locData?.columns?.repository || "Repository"}</TableHead>
              <TableHead className="min-w-[150px] text-white">{locData?.columns?.languages || "Languages"}</TableHead>
              <TableHead className="min-w-[150px] text-white">{locData?.columns?.countries || "Countries"}</TableHead>
              <TableHead className="min-w-[130px] text-white">{locData?.columns?.createdBy || "Created By"}</TableHead>
              <TableHead className="min-w-[130px] text-white">{locData?.columns?.createdDate || "Created Date"}</TableHead>
              <TableHead className="min-w-[160px] text-white">{locData?.columns?.lastModifiedBy || "Last Modified By"}</TableHead>
              <TableHead className="min-w-[160px] text-white">{locData?.columns?.lastModifiedDate || "Last Modified Date"}</TableHead>
              <TableHead className="text-white">{locData?.columns?.version || "Version"}</TableHead>
              <TableHead className="text-white">{locData?.columns?.status || "Status"}</TableHead>
              <TableHead className="text-white">{locData?.columns?.action || "Action"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms && forms?.map((form, index) => (
              <TableRow key={index} className={index % 2 == 0 ? "bg-[#ffffff] border-0" : "bg-[#f5f5f5] border-0"}>
                <TableCell>{form?.formId?.substring(0, 8) || "N/A"}</TableCell>
                <TableCell>{form?.formName || "N/A"}</TableCell>
                <TableCell>{form?.repositoryName || "N/A"}</TableCell>
                <TableCell>{form?.languages?.join(', ') || "N/A"}</TableCell>
                <TableCell>{form?.countries?.join(', ') || "N/A"}</TableCell>
                <TableCell>{form.createdBy || "N/A"}</TableCell>
                <TableCell>{form.createdDate || "N/A"}</TableCell>
                <TableCell>{form.lastModifiedBy || "N/A"}</TableCell>
                <TableCell>{form.lastModifiedDate || "N/A"}</TableCell>
                <TableCell>{form.versionNumber || "N/A"}</TableCell>
                <TableCell>{((form.status == "Publish" || form.status == "Published" || form.status == true) ? locData?.formStatus[0] : locData?.formStatus[0]) || form.status || "N/A"}</TableCell>
                <TableCell>
                  <Button className="bg-blue-500 text-white">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow><TableCell></TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default formFlow
