import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "@/lib/axios";
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
import { setIsLoading } from "../../../../redux/store/loading";
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
  const [tableData, setTableData] = useState({});
  const id=useParams()
  const fetchForms = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.get(`/FormInstance/GetFormInstanceListByFormVersionId?FormVersionId=${id.id}`);
      // console.log(response)
      if (response) {
        const data =response.data.data;
        console.log(data)
        setTableData(data)
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error("Error fetching forms:", error);
      toast.error("Unable to get Form");
      dispatch(setIsLoading(false));
    }
  };
  useEffect(() => {
    return () => {
      dispatch(setIsLoading(true));
      fetchForms();
    };
  }, []);


  return (
    <div className="max-w-[1000px] min-h-[83vh] mx-auto p-2">
    <h3 className="pb-3 pt-8 text-[20px] font-[600]">Form Versions</h3>
          <div class="grid grid-cols-2 border rounded-lg bg-[#ffffff]">
          {tableData&&tableData?.formInstanceLists?.map((instance) => (
            <div key={instance.containerId} className="mb-4">
    <Table className="rounded-lg border bg-white overflow-x-scroll">
      <TableHeader>
        <TableRow className="bg-[#e2252e] hover:bg-[#e2252e]">
          {instance.containerName!=null &&
          <TableHead colSpan={Object.keys(instance?.controlsAndInstances).length + 2} className="text-white text-center">
            {instance.containerName===null?"-":instance.containerName}
          </TableHead>
}
        </TableRow>
        <TableRow className="bg-[#e2252e] hover:bg-[#e2252e]">
          {/* <TableHead className="min-w-[100px] text-white">ID</TableHead> */}
          {instance.containerName!=null &&
          <>
          {Object.keys(instance?.controlsAndInstances).map((key) => (
            <TableHead key={key} className="min-w-[100px] text-white">{key}</TableHead>
          ))}
</>}
          {/* <TableHead className="min-w-[100px] text-white">Action</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
      {instance.containerName!=null &&
      <>
        {instance.controlsAndInstances[Object.keys(instance.controlsAndInstances)[0]].map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {/* <TableCell>{rowIndex + 1}</TableCell> */}
            {Object.keys(instance.controlsAndInstances).map((key) => (
              <TableCell key={key}>
                {instance.controlsAndInstances[key][rowIndex] || "N/A"}
              </TableCell>
            ))}
            {/* <TableCell>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Action
              </button>
            </TableCell> */}
          </TableRow>
        ))}
         </> }
      </TableBody>
    </Table>
    
            </div>
          ))}
        
            {/* <div className="col-span-7 grid grid-cols-3">
              <div className="p-6">
                <div className="text-[12px] font-[400] text-[#000000]">Form ID</div>
                <div className="text-[16px] font-[500] text-[#000000]">
                  F-123454
                </div>
              </div>
              <div className="p-6">
                <div className="text-[12px] font-[400] text-[#000000]">
                  Form Name
                </div>
                <div className="text-[16px] font-[500] text-[#000000]">
                  User Sign Up
                </div>
              </div>
              <div className="p-6">
                <div className="text-[12px] font-[400] text-[#000000]">
                  Form Version
                </div>
                <div className="text-[16px] font-[500] text-[#000000]">
                  F-123454
                </div>
              </div>
            </div> */}
            {/* <div className="col-span-5 ">
              <div className="p-6 gap-2 flex">
              <Button variant="outline" className="bg-[white] text-[#e2252e] text-[14px] font-[400] rounded-lg border-red-700" onClick={()=>{navigate("/form-version-table")}}>
              Form Report
                </Button>
                <Button className="bg-[#000000]  text-white text-[14px] font-[400] rounded-lg">
                Form Preview
                </Button>
                <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-[14px] font-[400] text-white rounded-lg">
                Update
                </Button>
              </div>
            </div> */}
          </div>
        </div>
  )
}