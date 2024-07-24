import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import BoxLoader from "@/components/BoxLoader";
import { ChevronDown, EyeOff, History, FolderClosed, Pencil, Trash2 } from "lucide-react"

import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';

export default function FormTable() {
  // const params=useParams()
  // console.log(params,"==--==")
  const navigate = useNavigate();
  const location = window.location.origin;
  const dispatch = useDispatch();
  const language = useSelector((state) => state?.language?.language);
  const userId = useSelector((state) => state?.authStore?.id);
  const token = useSelector((state) => state?.authStore?.token);
  const tenantId = useSelector((state) => state?.authStore?.tenant_id);
  const loading = useSelector((state) => state?.loadingStore?.value);
  const [localLoading, setLocalLoading] = useState(true);
  const [forms, setForms] = useState([])
  useEffect(() => {
    return async () => {
      try {
        const response = await fetch(`http://135.181.57.251:3048/api/Form/GetAllFormsByUserId?UserId=${userId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
          },
         
        }) 
        const data = await response.json()
        // console.log(data.data);
        if (data?.data?.length > 0) {
          // console.log(data.data)
          setForms(data.data)
          setTimeout(()=>{
            dispatch(setIsLoading(false));
            setLocalLoading(false);
          }, 2000)
        } else {
          toast.error("No forms found for this user!");
          setTimeout(()=>{
            dispatch(setIsLoading(false));
            setLocalLoading(false);
          }, 2000)
        }
      } catch (error) {
        toast.error("Server Unavailable!");
        setTimeout(()=>{
          dispatch(setIsLoading(false));
          setLocalLoading(false);
        }, 2000)
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
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify({
            tenantId: tenantId,
            formName: '',
            userId: userId,
            repositoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
          })
        }
      )
      if (response.ok) {
        let responseData = await response.json()
        // Fetch the updated forms list
        // const updatedForms = await response.json()
        console.log("after response")
        console.log(responseData,"res123")
        localStorage.setItem('formId',responseData.data.formId)

        toast.success(responseData?.notificationMessage)
        console.log("before dispatch")
       
        console.log("before navigate")
        navigate("/form-builder/form");
        console.log("before loading")
        dispatch(setIsLoading(true));
        setLocalLoading(true);
      } else {
        console.error('Failed to create form')
      }
    } catch (error) {
      console.error('Error creating form:', error)
    }
  }

  return (
    <div className="min-h-[82.8vh] p-6 flex flex-col items-center pt-16">
        <div className="flex justify-end w-full">
          <Button onClick={handleCreateForm} className="bg-[#e2252e] hover:bg-[#e2252eec] font-normal text-[16px] h-[45px]">
            + {"Create New Form"}
          </Button>
      
        </div>
     
      <div className="w-full rounded-xl bg-white overflow-hidden">
        <Table className="rounded-lg border bg-white overflow-x-scroll">
          <TableHeader>
            <TableRow className="bg-[#e2252e] hover:bg-[#e2252e]">
              <TableHead className="min-w-[100px] text-white">Form ID</TableHead>
              <TableHead className="min-w-[110px] text-white"> First Name</TableHead>
              <TableHead className="min-w-[160px] text-white">{ "Last Name"}</TableHead>
              <TableHead className="min-w-[150px] text-white">{ "Email"}</TableHead>
              <TableHead className="min-w-[150px] text-white">{ "Phone Number"}</TableHead>
              <TableHead className="min-w-[130px] text-white">{ "Date of Birth"}</TableHead>
              <TableHead className="min-w-[130px] text-white">{"Address"}</TableHead>
              <TableHead className="min-w-[160px] text-white">{"Business Name"}</TableHead>
              <TableHead className="min-w-[160px] text-white">{"Business Email"}</TableHead>
              <TableHead className="text-white">{ "Version"}</TableHead>
              <TableHead className="text-white">{"Status"}</TableHead>
             
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms && forms?.map((form, index) => (
              <TableRow key={index} className={index % 2 == 0 ? "bg-[#ffffff] border-0" : "bg-[#f5f5f5] border-0"}>
                <TableCell>{form?.formVersionId?.substring(0, 8) || "N/A"}</TableCell>
                <TableCell>{form?.formName || "N/A"}</TableCell>
                <TableCell>{form?.repositoryName || "N/A"}</TableCell>
                <TableCell>{form?.languages?.join(', ') || "N/A"}</TableCell>
                <TableCell>{form?.countries?.join(', ') || "N/A"}</TableCell>
                <TableCell>{form.createdBy || "N/A"}</TableCell>
                <TableCell>{form.createdDate || "N/A"}</TableCell>
                <TableCell>{form.lastModifiedBy || "N/A"}</TableCell>
                <TableCell>{form.lastModifiedDate || "N/A"}</TableCell>
                <TableCell>{form.versionNumber || "N/A"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-[#4e4e4e] flex justify-between gap-2 rounded font-thin text-white p-[2px] pl-2">
                      Action
                      <ChevronDown className="h-5 " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-0">
                    
            
                      <DropdownMenuItem className="focus:bg-[#fff0f0] cursor-pointer">
                        <Trash2 className="h-4"/>&nbsp;&nbsp;
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            <TableRow><TableCell></TableCell></TableRow>
          </TableBody>
       
        </Table>
      </div>
      {/* <p className="text-center">{loading + "  " + localLoading + "  " + forms.length}</p> */}
    </div>
  )
}