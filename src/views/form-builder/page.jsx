import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import BoxLoader from "@/components/BoxLoader";
import {
  ChevronDown,
  EyeOff,
  History,
  FolderClosed,
  Pencil,
  Trash2,
} from "lucide-react";
import { QrCode } from "lucide-react";

import toast from "react-hot-toast";

import localisationData from "../../localisation.json";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/store/loading";
import {
  SET_FORM_INFO,
  SET_DEFAULT_CONTAINER_ID,
} from "../../redux/store/form";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function FormBuilder() {
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
  const [forms, setForms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handlePageChange = async (size, newPage) => {
    setPage(newPage);
    setLocalLoading(true);

    try {
      const response = await fetch(
        `http://135.181.57.251:3048/api/Form/GetAllFormsByUserId?UserId=${userId}&PageNumber=${newPage}&PageSize=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data.data);
      if (data?.data?.length > 0) {
        // console.log(data.data)
        setForms(data?.data);
        setLocalLoading(false);
        setTotalPages(data?.pageInfo);
        setTimeout(() => {
          dispatch(setIsLoading(false));
          setLocalLoading(false);
        }, 2000);
      } else {
        toast.error("No forms found for this user!");
        setTimeout(() => {
          dispatch(setIsLoading(false));
          setLocalLoading(false);
        }, 2000);
      }
    } catch (error) {
      toast.error("Server Unavailable!");
      setTimeout(() => {
        dispatch(setIsLoading(false));
        setLocalLoading(false);
      }, 2000);
    }
  };
  const handlePublish = async (version, status) => {
    setLocalLoading(true);
    try {
      const response = await fetch(
        `http://135.181.57.251:3048/api/Form/ChangeFormStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            versionId: version,
            status: status == 2 ? 1 : 2,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data?.notificationMessage) {
        handlePageChange(rowsPerPage, page);
        setLocalLoading(false);
        toast.success(data?.notificationMessage);
      } else {
        toast.error(data?.errors[0]);
      }
    } catch (error) {
      toast.error("Server Unavailable!");
      setTimeout(() => {
        dispatch(setIsLoading(false));
        setLocalLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    return async () => {
      handlePageChange(rowsPerPage, page);
    };
  }, []);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page > 0) pageNumbers.push(page - 1);
      pageNumbers.push(page);
      if (page < totalPages - 1) pageNumbers.push(page + 1);
    }
    return pageNumbers;
  };

  const handleCreateForm = async () => {
    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Form/CreateForm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tenantId: tenantId,
            formName: "",
            userId: userId,
            repositoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          }),
        }
      );
      if (response.ok) {
        let responseData = await response.json();
        // Fetch the updated forms list
        // const updatedForms = await response.json()
        console.log("after response");
        console.log(responseData, "res123");
        localStorage.setItem("formId", responseData.data.formId);

        toast.success(responseData?.notificationMessage);
        console.log("before dispatch");
        dispatch(
          SET_FORM_INFO(
            responseData?.data?.formId,
            responseData?.data?.formVersionId
          )
        );
        dispatch(
          SET_DEFAULT_CONTAINER_ID(responseData?.data?.defaultContainerId)
        );
        console.log("before navigate");
        navigate("/form-builder/form");
        console.log("before loading");
        dispatch(setIsLoading(true));
        setLocalLoading(true);
      } else {
        console.error("Failed to create form");
      }
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };
  const deletFormVersion = async (id) => {
    try {
      const response = await fetch(
        "http://135.181.57.251:3048/api/Form/DeleteFormVersion",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            formVersionId: id,
          }),
        }
      );
      if (response.ok) {
        let responseData = await response.json();
        handlePageChange(rowsPerPage, 1);
        toast.success(responseData?.notificationMessage);
        setLocalLoading(true);
      }
    } catch (error) {
      console.error("Error Deleting form:", error);
    }
  };
  let locData = localisationData.home.en;

  if (language == "en") {
    locData = localisationData.home.en;
  } else if (language == "ar") {
    locData = localisationData.home.ar;
  }
  console.log(rowsPerPage, "rows");
  return (
    <div className="min-h-[82.8vh] p-6 flex flex-col items-center pt-16">
      <div className="w-full flex justify-between items-center my-3">
        <Select className="" defaultValue="folder">
          <SelectTrigger className="max-w-[160px] h-[46px] space-x-1 font-semibold text-md w-fit bg-transparent border-0">
            <img src="/folder.svg" alt="Folder icon" width={24} height={24} />
            <SelectValue
              placeholder={locData?.folder || "Folder"}
              className="px-0 mx-0"
            />
          </SelectTrigger>
          <SelectContent className="p-0">
            <SelectItem
              value="folder"
              className="border-b border-[#f8c8ca] hover:bg-[#ececec]"
            >
              Folder
            </SelectItem>
            <SelectItem
              value="onboarding"
              className="border-b border-[#f8c8ca] hover:bg-[#ececec]"
            >
              Onboarding Folder
            </SelectItem>
            <SelectItem
              value="kyc"
              className="border-b border-[#f8c8ca] hover:bg-[#ececec]"
            >
              KYC Folder
            </SelectItem>
            <SelectItem
              value="kyb"
              className="border-b border-[#f8c8ca] hover:bg-[#ececec]"
            >
              KYB Folder
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-evenly gap-2 items-center">
          <Command className="w-[400px] xl:w-[500px]">
            <CommandInput placeholder={locData?.search || "Search"} />
          </Command>
          <Select className="">
            <SelectTrigger className="max-w-[160px] h-[46px] text-[#838383] border border-[#e6e3ea] bg-[#ececec]">
              <SelectValue placeholder={locData?.filter || "Filter By"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select className="">
            <SelectTrigger className="max-w-[160px] h-[46px] text-[#838383] border border-[#e6e3ea] bg-[#ececec]">
              <SelectValue placeholder={locData?.sort || "Sort By"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleCreateForm}
            className="bg-[#e2252e] hover:bg-[#e2252eec] font-normal text-[16px] h-[45px]"
          >
            + {locData?.createNewForm || "Create New Form"}
          </Button>
        </div>
      </div>
      <div className="w-full rounded-xl bg-white overflow-hidden">
        <Table className="rounded-lg border bg-white overflow-x-scroll">
          <TableHeader>
            <TableRow className="bg-[#e2252e] hover:bg-[#e2252e]">
              <TableHead className="min-w-[100px] text-white">
                {locData?.columns?.formID || "Form ID"}
              </TableHead>
              <TableHead className="min-w-[110px] text-white">
                {locData?.columns?.formName || "Form Name"}
              </TableHead>
              <TableHead className="min-w-[160px] text-white">
                {locData?.columns?.repository || "Repository"}
              </TableHead>
              {/* <TableHead className="min-w-[150px] text-white">{locData?.columns?.languages || "Languages"}</TableHead>
              <TableHead className="min-w-[150px] text-white">{locData?.columns?.countries || "Countries"}</TableHead> */}
              <TableHead className="min-w-[130px] text-white">
                {locData?.columns?.createdBy || "Created By"}
              </TableHead>
              <TableHead className="min-w-[130px] text-white">
                {locData?.columns?.createdDate || "Created Date"}
              </TableHead>
              <TableHead className="min-w-[160px] text-white">
                {locData?.columns?.lastModifiedBy || "Last Modified By"}
              </TableHead>
              <TableHead className="min-w-[160px] text-white">
                {locData?.columns?.lastModifiedDate || "Last Modified Date"}
              </TableHead>
              <TableHead className="text-white">
                {locData?.columns?.version || "Version"}
              </TableHead>
              {/* <TableHead className="text-white">{locData?.columns?.status || "Status"}</TableHead> */}
              <TableHead className="text-white">
                {locData?.columns?.action || "Action"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms &&
              forms?.map((form, index) => (
                <TableRow
                  key={index}
                  className={
                    index % 2 == 0
                      ? "bg-[#ffffff] border-0"
                      : "bg-[#f5f5f5] border-0"
                  }
                >
                  <TableCell className="font-mono">
                    F-
                    {form?.formVersionId?.substring(0, 5).toUpperCase() || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {form?.formName || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {form?.repositoryName || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  {/* <TableCell>{form?.languages?.join(', ') || (<span className="text-xs text-gray-500">N/A</span>)}</TableCell>
                <TableCell>{form?.countries?.join(', ') || (<span className="text-xs text-gray-500">N/A</span>)}</TableCell> */}
                  <TableCell>
                    {form.createdBy || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {form.createdDate || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {form.lastModifiedBy || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {form.lastModifiedDate || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    V{" "}
                    {form.versionNumber || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  {/* <TableCell>{((form.status == "Publish" || form.status == "Published" || form.status == true) ? locData?.formStatus[0] : locData?.formStatus[0]) || form.status || "N/A"}</TableCell> */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-[#4e4e4e] mx-auto flex justify-between gap-2 rounded font-thin text-white p-[2px] pl-2">
                        {locData?.columns?.action || "Action"}
                        <ChevronDown className="h-5 " />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-0">
                        <DropdownMenuItem
                          className="focus:bg-[#fff0f0] cursor-pointer"
                          onClick={() => {
                            window.open(`/render-form/${form?.formVersionId}`);
                          }}
                        >
                          <QrCode className="h-4" />
                          &nbsp;&nbsp;
                          {locData?.dropdown?.live || "Live"}
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator className="bg-gray-300 p-0 m-0"/> */}
                        <DropdownMenuItem
                          className="focus:bg-[#fff0f0] cursor-pointer"
                          onClick={() => {
                            handlePublish(form.formVersionId, form.status);
                          }}
                        >
                          <EyeOff className="h-4" />
                          &nbsp;&nbsp;
                          {form.status == 0
                            ? locData?.dropdown?.draft || "Draft"
                            : form.status == 1
                              ? locData?.dropdown?.publish || "Publish"
                              : locData?.dropdown?.unPublish || "UnPublish"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-300 p-0 m-0" />
                        <DropdownMenuItem
                          className="focus:bg-[#fff0f0] cursor-pointer"
                          onClick={() => {
                            navigate(`/form-versions/${form.formId}/${form.formVersionId}`);
                          }}
                        >
                          <History className="h-4" />
                          &nbsp;&nbsp;
                          {locData?.dropdown?.versions || "Versions"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-[#fff0f0] cursor-pointer">
                          <FolderClosed className="h-4" />
                          &nbsp;&nbsp;
                          {locData?.dropdown?.folder || "Folder"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-300 p-0 m-0" />
                        <DropdownMenuItem
                          onClick={() => {
                            dispatch(
                              SET_FORM_INFO(form?.formId, form?.formVersionId)
                            );
                            dispatch(setIsLoading(true));
                            navigate("/form-builder/form");
                          }}
                          className="focus:bg-[#fff0f0] cursor-pointer"
                        >
                          <Pencil className="h-4" />
                          &nbsp;&nbsp;
                          {locData?.dropdown?.edit || "Edit"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-300 p-0 m-0" />
                        <DropdownMenuItem
                          className="focus:bg-[#fff0f0] cursor-pointer"
                          onClick={() => {
                            deletFormVersion(form?.formVersionId);
                          }}
                        >
                          <Trash2 className="h-4" />
                          &nbsp;&nbsp;
                          {locData?.dropdown?.delete || "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
          {(loading || localLoading) && forms.length < 1 ? (
            <TableCaption>
              <BoxLoader />
            </TableCaption>
          ) : (
            ""
          )}
          {!loading && !localLoading && forms.length < 1 ? (
            <TableCaption className="pb-4">
              {locData?.noForms || "No Forms Found for this user!"}
            </TableCaption>
          ) : (
            ""
          )}
        </Table>
        <div className="flex justify-end items-center mt-4">
          {/* <span>
          Rows per page
          </span> */}
          <Select
            className="w-full"
            onValueChange={(e) => {
              handlePageChange(e, page);
              setRowsPerPage(e);
            }}
            value={rowsPerPage}
          >
            <label htmlFor="minLen" className="text-ls font-semibold pr-2">
              {locData?.pagination || "Rows per page"}
            </label>
            <SelectTrigger className="w-16 h-[30px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={10}>10</SelectItem>
              <SelectItem value={15}>15</SelectItem>
              <SelectItem value={25}>25</SelectItem>
              <SelectItem value={50}>50</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => handlePageChange(rowsPerPage, 1)}
            disabled={page <= 1}
            className="px-4 py-2 mx-1 pagination-btn text-gray-800 rounded"
          >
            {`<<`}
          </button>
          <button
            onClick={() => handlePageChange(rowsPerPage, page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 mx-1 pagination-btn rounded"
          >
            {`<`}
          </button>

          {Array.from({ length: 3 }, (_, index) => {
            const pageNumber = page - 1 + index;
            if (pageNumber > 0 && pageNumber <= 4) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(rowsPerPage, pageNumber)}
                  className={`px-4 py-2 mx-1 ${
                    pageNumber === page
                      ? "bg-red-500 text-white"
                      : "pagination-btn text-gray-800"
                  } rounded`}
                >
                  {pageNumber}
                </button>
              );
            } else {
              return null;
            }
          })}

          <button
            onClick={() => handlePageChange(rowsPerPage, page + 1)}
            disabled={forms.length < rowsPerPage}
            className="px-4 py-2 mx-1 pagination-btn text-gray-800 rounded"
          >
            {`>`}
          </button>
          <button
            onClick={() => handlePageChange(rowsPerPage, totalPages)}
            disabled={forms.length < rowsPerPage}
            className="px-4 py-2 mx-1 pagination-btn text-gray-800 rounded"
          >
            {`>>`}
          </button>
        </div>
      </div>
      {/* <p className="text-center">{loading + "  " + localLoading + "  " + forms.length}</p> */}
    </div>
  );
}
