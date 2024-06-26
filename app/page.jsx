"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast"
const formFlow = () => {
  const [forms, setForms] = useState([])
  const [mounted, setMounted] = useState(false);
  const router=useRouter()
  useEffect(() => {
    // Fetch forms from API
   
    const fetchForms = async () => {
      try {
        const response = await fetch('http://135.181.57.251:3048/api/Form/GetAllForms?UserId=eef836f0-1a0d-43e5-8200-b02fe4730ce4',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Request-Id':'eef836f0-1a0d-43e5-8200-b02fe4730ce4'
          },
         
        }) 
        const data = await response.json()
        setForms(data)
      } catch (error) {
        console.error('Error fetching forms:', error)
      }
    }

    fetchForms()
  }, [])

  const handleCreateForm = async () => {
    try {
      const response = await fetch('http://135.181.57.251:3048/api/Form/InitiateForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Id':'b2c8cc2f-16e3-4447-abdf-e76ee3e5db2a'
        },
        body: JSON.stringify({
          tenantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  formName: "string",
  userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  repositoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }),
      })
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
  return (
    <div className="min-h-[82.8vh] p-6 flex flex-col items-center pt-16">
      <div className="w-full flex justify-between items-center my-3">
     
        <div>Folder Dropdown</div>
        <div className="flex justify-evenly gap-2 items-center">
          <span>Search</span>
          <span>Filter</span>
     
          <Button
         
            onClick={handleCreateForm}
            className="bg-[#e2252e] hover:bg-[#e2252eec] font-normal text-[16px]"
          >
            + Create New Form
          </Button>
      
        </div>
      </div>
      <div className="w-full rounded-xl bg-white overflow-hidden">
        <Table className="rounded-lg border bg-white overflow-x-scroll">
          <TableHeader>
            <TableRow className="bg-[#e2252e] hover:bg-[#e2252e] ">
              <TableHead className="min-w-[100px] text-white">Form ID</TableHead>
              <TableHead className="min-w-[110px] text-white">Form Name</TableHead>
              <TableHead className="min-w-[160px] text-white">Repository</TableHead>
              <TableHead className="min-w-[150px] text-white">Languages</TableHead>
              <TableHead className="min-w-[150px] text-white">Countries</TableHead>
              <TableHead className="min-w-[130px] text-white">Created By</TableHead>
              <TableHead className="min-w-[130px] text-white">Created Date</TableHead>
              <TableHead className="min-w-[160px] text-white">Last Modified By</TableHead>
              <TableHead className="min-w-[160px] text-white">Last Modified Date</TableHead>
              <TableHead className="text-white">Version</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {forms&&forms?.map((form) => (
              <TableRow key={form.id}>
                <TableCell>{form.id}</TableCell>
                <TableCell>{form.name}</TableCell>
                <TableCell>{form.repository}</TableCell>
                <TableCell>{form.languages.join(', ')}</TableCell>
                <TableCell>{form.countries.join(', ')}</TableCell>
                <TableCell>{form.createdBy}</TableCell>
                <TableCell>{form.createdDate}</TableCell>
                <TableCell>{form.lastModifiedBy}</TableCell>
                <TableCell>{form.lastModifiedDate}</TableCell>
                <TableCell>{form.version}</TableCell>
                <TableCell>{form.status}</TableCell>
                <TableCell>
                  <Button className="bg-blue-500 text-white">Edit</Button>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default formFlow
