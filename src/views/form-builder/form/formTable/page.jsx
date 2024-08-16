import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { setIsLoading } from "../../../../redux/store/loading";
import BoxLoader from "@/components/BoxLoader";
import {
  ChevronDown,
  EyeOff,
  History,
  FolderClosed,
  Pencil,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function FormTable() {
  const navigate = useNavigate();
  const location = window.location.origin;
  const dispatch = useDispatch();
  const language = useSelector((state) => state?.language?.language);
  const userId = useSelector((state) => state?.authStore?.id);
  const token = useSelector((state) => state?.authStore?.token);
  const tenantId = useSelector((state) => state?.authStore?.tenant_id);
  const loading = useSelector((state) => state?.loadingStore?.value);
  const [localLoading, setLocalLoading] = useState(true);
  const [forms, setForms] = useState([]);
  const [tableData, setTableData] = useState({});
  const id = useParams();

  const fetchForms = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axios.get(
        `/FormInstance/GetFormInstanceListByFormVersionId?FormVersionId=${id.id}`
      );
      if (response) {
        const data = response.data.data;
        setTableData(data);
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error("Error fetching forms:", error);
      toast.error("Unable to get Form");
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setIsLoading(true));
    fetchForms();
  }, []);

  // Convert table data to CSV
  const exportToCSV = () => {
    const csvRows = [];

    // Iterate through each form instance and prepare headers and data rows
    tableData.formInstanceLists.forEach((instance) => {
      if (instance.containerName !== null) {
        // Main Header (Container Name)
        csvRows.push([instance.containerName]);

        // Subheaders (keys of controlsAndInstances)
        const subHeaders = Object.keys(instance.controlsAndInstances);
        csvRows.push(subHeaders.join(","));

        // Data Rows
        const numRows = instance.controlsAndInstances[subHeaders[0]].length;
        for (let i = 0; i < numRows; i++) {
          const row = subHeaders.map(
            (key) => instance.controlsAndInstances[key][i] || "N/A"
          );
          csvRows.push(row.join(","));
        }

        // Add an empty line between different instances for clarity
        csvRows.push("");
      }
    });

    // Convert rows to CSV string
    const csvString = csvRows.join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `form_data_${id.id}.csv`);
    a.click();
  };

  return (
    <>
      <div className="w-100 flex justify-between items-center my-3 px-2 pt-6">
        <div className="flex mb-2">
          <div
            className="text-[#EB0D0D] bg-[#F0F0F0] text-[12px] flex justify-center items-center cursor-pointer px-1 font-semibold"
            onClick={() => {
              navigate(-1);
            }}
          >
            {"<-"}
            <span className="ps-1">Back</span>
          </div>
          <label className="text-ls font-semibold px-2">
            User Sign Up - Report
          </label>
        </div>
        <div className="flex justify-evenly gap-2 items-center">
          <Button
            className="bg-[#e2252e] hover:bg-[#e2252eec] font-normal text-[16px] h-[45px]"
            onClick={exportToCSV}
          >
            {"Export As CSV"}
          </Button>
        </div>
      </div>

      <div className="mw-100 min-h-[83vh] mx-auto p-2">
        <div className="flex border rounded-lg bg-[#ffffff]">
          {tableData &&
            tableData?.formInstanceLists?.map((instance) => (
              <div key={instance.containerId} className="mb-4 w-full">
                <Table className="rounded-lg border bg-white overflow-x-scroll overflow-scroll">
                  <TableHeader>
                    <TableRow className="bg-[#e2252e] hover:bg-[#e2252e]">
                      {instance.containerName != null && (
                        <TableHead
                          colSpan={
                            Object.keys(instance?.controlsAndInstances).length +
                            2
                          }
                          className="text-white text-center"
                        >
                          {instance.containerName === null
                            ? "-"
                            : instance.containerName}
                        </TableHead>
                      )}
                    </TableRow>
                    <TableRow className="bg-[#e2252e] hover:bg-[#e2252e]">
                      {instance.containerName != null && (
                        <>
                          {Object.keys(instance?.controlsAndInstances).map(
                            (key) => (
                              <TableHead
                                key={key}
                                className="min-w-[100px] text-white"
                              >
                                {key}
                              </TableHead>
                            )
                          )}
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instance.containerName != null && (
                      <>
                        {instance.controlsAndInstances[
                          Object.keys(instance.controlsAndInstances)[0]
                        ].map((_, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {Object.keys(instance.controlsAndInstances).map(
                              (key) => (
                                <TableCell key={key}>
                                  {instance.controlsAndInstances[key][
                                    rowIndex
                                  ] || "N/A"}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
