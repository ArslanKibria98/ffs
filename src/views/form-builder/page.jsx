import { useEffect, useState,useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BoxLoader from "@/components/BoxLoader";
import {
  ChevronDown,
  EyeOff,
  History,
  FolderClosed,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronLeft,
  PlusIcon,
  EllipsisVertical,
  LucideTrash2,
  PencilLine,
} from "lucide-react";
import { QrCode } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import localisationData from "../../localisation.json";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/store/loading";
import {
  SET_FORM_INFO,
  SET_DEFAULT_CONTAINER_ID,
} from "../../redux/store/form";
import axios from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";

export default function FormBuilder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const language = useSelector((state) => state?.language?.language);
  const userId = useSelector((state) => state?.authStore?.id);
  const token = useSelector((state) => state?.authStore?.token);
  const tenantId = useSelector((state) => state?.authStore?.tenant_id);
  const loading = useSelector((state) => state?.loadingStore?.value);
  const [folderName, setFolderName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [folderModal, setFolderModal] = useState(false);
  const [sortType, setSortType] = useState(2);
  const [filterType, setFilterType] = useState(null);
  const [folderEditModal, setFolderEditModal] = useState(false);
  const [folderDeleteModal, setFolderDeleteModal] = useState(false);
  const [folderDeleteLoading, setFolderDeleteLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const [repository, setRepository] = useState("all");
  const [repositories, setRepositories] = useState([]);
  const [forms, setForms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const  SortTypes=[{
    label : 'Latest Modified ',
    value : 0
},
{
  label : 'Oldest Modified',
  value : 1
},
{
  label : 'Latest Created',
  value : 2
},
{
  label : 'Oldest Created ',
  value : 3
}
]
const  filterTypes=[{
  label : 'FormId ',
  value : 0
},

{
label : 'FormName ',
value : 1
}
]
  
  const getRepository = async () => {
    setLocalLoading(true);
    try {
      await axios
        .get(`/Repository/GetRepositoriesByUserId?userId=${userId}`)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            console.log(res.data);
            setRepositories(res?.data?.data);
            handlePageChange("all", "", rowsPerPage, page);
          } else {
            throw new Error("Unable to get repositories!");
          }
        });
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };
 
  const handlePageChange = async (repo,search, size, newPage) => {
    setForms([]);
    setPage(newPage);
    setLocalLoading(true);
    // if (repo == "all") {
    //   repo = userId;
    // }
    try {
      const response = await axios.get(
        `http://135.181.57.251:3048/api/Form/GetAllForms?UserId=${userId}&` +
          (repo == "all" ? `` : `Filter.RepositoryId=${repo}&isFilterApplied=true&Filter.filterType=1&`) +
          `PageNumber=${newPage}&PageSize=${size}`+`&sortType=${sortType}`+`${search?`&isFilterApplied=true&Filter.filterType=0&Filter.searchType=${filterType}&Filter.searchQuery=${search}`:``}`
      );
      const data = await response.data;
      console.log(data.data);
      console.log(data?.data?.data);
      if (data?.data?.data?.length > 0) {
        // console.log(data.data)
        setForms(data?.data?.data);
        setLocalLoading(false);
        setTotalPages(data?.data?.pageInfo);
        setTimeout(() => {
          dispatch(setIsLoading(false));
          setLocalLoading(false);
        }, 2000);
      } else {
        toast.error(data?.notificationMessage || "No forms found for this user!");
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
  // useEffect(()=>{
    // return () => {
      
    // };
// }, [sortType])

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
            "Request-Id": uuidv4(),
          },
          body: JSON.stringify({
            versionId: version,
            status: status == 0 ? 1 : 1 ? 2 : 1,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data?.notificationMessage) {
        handlePageChange(repository,"", rowsPerPage, page);
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
    // return async () => {
      getRepository();
    // };
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
      const response = await axios.post(
        "http://135.181.57.251:3048/api/Form/CreateForm",
        JSON.stringify({
          tenantId: tenantId,
          formName: "",
          userId: userId,
          repositoryId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
        })
      );
      if (response) {
        let responseData = await response.data;
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
  const handleCreateRepository = async () => {
    try {
      const response = await axios.post(
        "http://135.181.57.251:3048/api/Repository/CreateRepository",
        JSON.stringify({
          userId: userId,
          repositoryName: folderName,
        })
      );
      if (response?.data?.success) {
        let responseData = await response.data;
        // console.log(response, responseData);
        toast.success(responseData?.notificationMessage);
        setFolderModal(false);
        // console.log("before refetching");
        getRepository();
      } else {
        // console.error("Failed to create form");
        throw new Error(response?.data?.notificationMessage);
      }
    } catch (error) {
      console.error("Error creating form:", error);
      toast.error(error.message);
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
            "Request-Id": uuidv4(),
            "api-version": "1.0",
          },
          body: JSON.stringify({
            formVersionId: id,
          }),
        }
      );
      if (response.ok) {
        let responseData = await response.json();
        handlePageChange(repository,"", rowsPerPage, 1);
        toast.success(responseData?.notificationMessage);
        setLocalLoading(true);
      }
    } catch (error) {
      console.error("Error Deleting form:", error);
    }
  };

  const deleteRepository = async (id) => {
    try {
      setFolderDeleteLoading(true);
      setFolderDeleteModal(true);
      const response = await axios.delete(
        `/Repository/DeleteRepository?repositoryId=${id}`
      );
      if (response?.data?.success) {
        let responseData = await response?.data;
        // handlePageChange("all", rowsPerPage, 1);
        getRepository();
        toast.success(responseData?.notificationMessage);
        setFolderDeleteModal(false);
        setLocalLoading(true);
        setFolderDeleteLoading(false);
      } else {
        if (
          response?.data?.notificationMessage ==
          "Move forms to other repository before deleting it"
        ) {
          setFolderDeleteLoading(false);
          return;
        }
        throw new Error(
          response?.data?.notificationMessage || "Unable to delete Repository!"
        );
      }
    } catch (error) {
      setFolderDeleteModal(false);
      setFolderDeleteLoading(false);
      console.error("Error Deleting form:", error);
      toast.error(error.message);
    }
  };

  let locData = localisationData.home.en;
  if (language == "en") {
    locData = localisationData.home.en;
  } else if (language == "ar") {
    locData = localisationData.home.ar;
  }
  console.log(rowsPerPage, "rows");
  const handleInputChange = (event) => {
    console.log(event.target.value)
    if (filterType == null) {
      toast.error("Please Select the filter By first")
      return;
    }
    const value = event.target.value;
    setSearchValue(event.target.value)
    
    // Clear the previous timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set a new timeout
    timerRef.current = setTimeout(() => {
      console.log('Timeout reached, calling handlePageChange');
      if (filterType == null) {
        // toast.error("Please Select the filter By first");
        return;
      }
      
       if(event.target.value==""){
        handlePageChange("all","",rowsPerPage, page);
       }
       else{
        handlePageChange("all",event.target.value, rowsPerPage, page);
       }
      }, 1000); // 5000 milliseconds = 5 seconds
    
  };
  console.log(filterType)
  return (
    <div className="min-h-[82.8vh] p-6 flex flex-col items-center pt-16">
      <div className="w-full flex justify-between items-center my-3">
        {repositories && repositories.length > 0 ? (
          <Select
            value={repository}
            defaultValue={repository}
            onValueChange={(e) => {
              setRepository(e)
              handlePageChange(e,"", rowsPerPage, page);
            }}
            onClick={()=>{
              setFolderDeleteModal(false);
            }}
          >
            <SelectTrigger 
            className="max-w-[200px] h-[46px] space-x-1 font-semibold flex text-md w-full bg-transparent border-0">
              <img src="/folder.svg" alt="Folder icon" width={24} height={24} />
              <SelectValue
                placeholder={locData?.folder || "Folder"}
                className="px-0 text-left"
              />
            </SelectTrigger>
            <SelectContent className="p-0">
              <Dialog open={folderModal}>
                <DialogTrigger
                  onClick={() => setFolderModal(true)}
                  className="border-0 flex gap-1 border-b border-[#f8c8ca] hover:bg-[#ececec] text-left text-sm w-full m-0 py-2 pl-2 bg-transparent"
                >
                  <PlusIcon className="w-5 h-5 text-[#e2252e]" />
                  Create Folder
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle hidden>Create folder</DialogTitle>
                    <DialogDescription className="text-black">
                      <h2 className="text-xl font-semibold mt-4 col-span-2">
                        Create New Folder
                      </h2>
                      <br />
                      <label className="text-xs font-semibold">
                        Folder Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Type here"
                        className="p-4 h-[48px]"
                        value={folderName}
                        onChange={(e) => {
                          setFolderName(e.target.value);
                        }}
                      />
                    </DialogDescription>
                    <br />
                    <br />
                    <div className="flex flex-row-reverse gap-4 py-1 my-4">
                      <Button
                        className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
                        onClick={handleCreateRepository}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setFolderModal(false)}
                        className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <SelectItem
                value="all"
                className="border-b border-[#f8c8ca] hover:bg-[#ececec] m-0"
              >
                All Folders
              </SelectItem>
              {repositories?.map((repo) => (
                <Popover key={repo.id}>
                  <div className="flex items-center justify-between border-b border-[#f8c8ca] hover:bg-[#ececec] m-0">
                    <SelectItem value={repo.id} className="">
                      {repo.repositoryName}
                    </SelectItem>
                    <PopoverTrigger>
                      <EllipsisVertical className="h-4 w-4" />
                    </PopoverTrigger>
                    <PopoverContent className="p-0 min-w-[120px] w-fit">
                      <Link to={`/repository/edit/${repo?.id}`}>
                        <Button
                          className="text-black text-left rounded-none justify-start border-0 flex items-center gap-2 border-b border-[#f8c8ca] hover:bg-[#ececec] font-normal text-sm w-full m-0 py-2 pl-2 bg-transparent"
                        >
                          <PencilLine className="w-4 h-4" />
                          Edit
                        </Button>
                      </Link>
                      <Dialog open={folderDeleteModal} onOpenChange={setFolderDeleteModal}>
                        <button
                          onClick={() => deleteRepository(repo.id)}
                          className="border-0 flex items-center gap-2 border-b border-[#f8c8ca] hover:bg-[#ececec] text-left text-sm w-full m-0 py-2 pl-2 bg-transparent"
                        >
                          <LucideTrash2 className="w-4 h-4" />
                          Delete
                        </button>
                        <DialogTrigger className="hidden border-0 items-center gap-2 border-b border-[#f8c8ca] hover:bg-[#ececec] text-left text-sm w-full m-0 py-2 pl-2 bg-transparent">
                          <LucideTrash2 className="w-4 h-4" />
                          Delete
                        </DialogTrigger>
                        {folderDeleteModal && (
                          <DialogContent className="p-0">
                            <DialogHeader className="p-0">
                              <DialogTitle hidden>Delete</DialogTitle>
                              <DialogDescription className="text-black">
                                <h2 className="text-xl font-semibold mt-4 col-span-2 p-2 px-4">
                                  {folderDeleteLoading
                                    ? "Delete Folder"
                                    : "Alert"}
                                </h2>
                                <hr />
                                <br />
                                {folderDeleteLoading ? (
                                  <BoxLoader />
                                ) : (
                                  <h5 className="text-xl p-2 px-4">
                                    This folder contains forms and cannot be
                                    deleted. Please move forms to other folders
                                    to complete this action.
                                  </h5>
                                )}
                              </DialogDescription>
                              <br />
                              <hr />
                              <div className="flex flex-row-reverse gap-4 p-2 py-4">
                                <Link to={`/repository/delete/${repo.id}`}>
                                  <Button
                                    className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg h-[48px]"
                                  >
                                    Yes, Move It
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => setFolderDeleteModal(false)}
                                  className="bg-[#ababab] hover:bg-[#9c9c9c] text-white rounded-lg font-light h-[48px]"
                                >
                                  No, Keep It
                                </Button>
                              </div>
                            </DialogHeader>
                          </DialogContent>
                        )}
                      </Dialog>
                    </PopoverContent>
                  </div>
                </Popover>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Skeleton className="max-w-[160px] w-full h-[46px] space-x-1" />
        )}
        <div className="flex justify-evenly gap-2 items-center">
          <Select className="" onValueChange={(e) => {setSortType(e); handlePageChange("all", searchValue,rowsPerPage, page)}}
            value={sortType}>
            <SelectTrigger className="max-w-[160px] h-[46px] text-[#838383] border border-[#e6e3ea] bg-[#ececec]">
              <SelectValue placeholder={locData?.sort || "Sort By"} />
            </SelectTrigger>
            <SelectContent >
              {SortTypes.map((sortType) => (
                <SelectItem  key={sortType.value} value={sortType.value}>
                  {sortType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select className="" onValueChange={(e) => setFilterType(e)}
            value={filterType}>
            <SelectTrigger className="max-w-[160px] h-[46px] text-[#838383] border border-[#e6e3ea] bg-[#ececec]">
              <SelectValue placeholder={locData?.filter || "Filter By"} />
            </SelectTrigger>
            <SelectContent >
                <SelectItem value={null}>
                  Filter By
                </SelectItem>
              {filterTypes.map((sortType) => (
                <SelectItem  key={sortType.value} value={sortType.value}>
                  {sortType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="w-[400px] xl:w-[500px]">
            <div className="relative">
              <Search className="absolute left-2.5 top-[15px] h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-9 w-full h-[46px] text-[#838383] border border-[#e6e3ea] bg-[#ececec]" 
              value={searchValue} onChange={(e)=>{handleInputChange(e)}} />
            </div>
          </div>

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
                  <TableCell>
                    {form.createdBy
                      ? new Date(form.createdBy).toLocaleDateString("en-GB")
                      : new Date(form?.createdAt).toLocaleDateString(
                          "en-GB"
                        ) || <span className="text-xs text-gray-500">N/A</span>}
                  </TableCell>
                  <TableCell>
                    {new Date(form.createdAt).toLocaleDateString("en-GB") || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {form.lastModifiedBy
                      ? new Date(form.createdBy).toLocaleDateString("en-GB")
                      : new Date(form?.createdAt).toLocaleDateString(
                          "en-GB"
                        ) || <span className="text-xs text-gray-500">N/A</span>}
                  </TableCell>
                  <TableCell>
                    {form.lastModifiedDate
                      ? new Date(form.createdBy).toLocaleDateString("en-GB")
                      : new Date(form?.createdAt).toLocaleDateString(
                          "en-GB"
                        ) || <span className="text-xs text-gray-500">N/A</span>}
                  </TableCell>
                  <TableCell>
                    V{" "}
                    {form.versionNumber || (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </TableCell>
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
                        <DropdownMenuItem
                          className="focus:bg-[#fff0f0] cursor-pointer"
                          onClick={() => {
                            handlePublish(form.formVersionId, form.status);
                          }}
                        >
                          <EyeOff className="h-4" />
                          &nbsp;&nbsp;
                          {form.status == 0
                            ? locData?.dropdown?.publish || "Publish"
                            : form.status == 1
                              ? locData?.dropdown?.publish || "Publish"
                              : locData?.dropdown?.unPublish || "UnPublish"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-300 p-0 m-0" />
                        <DropdownMenuItem
                          className="focus:bg-[#fff0f0] cursor-pointer"
                          onClick={() => {
                            navigate(
                              `/form-versions/${form.formId}/${form.formVersionId}`
                            );
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
          <Select
            className="w-full mr-1"
            onValueChange={(e) => {
              handlePageChange(repository,"", e, page);
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

          {/* <button
            onClick={() => handlePageChange(repository, rowsPerPage, 1)}
            disabled={page <= 1}
            className="px-4 py-2 mx-1 pagination-btn text-gray-800 rounded"
          >
            {`<<`}
          </button> */}
          <button
            onClick={() => handlePageChange(repository,"", rowsPerPage, page - 1)}
            disabled={page <= 1}
            className="p-1 mx-1 pagination-btn rounded"
          >
            <ChevronLeft />
          </button>

          {Array.from({ length: 3 }, (_, index) => {
            const pageNumber = page - 1 + index;
            if (pageNumber > 0 && pageNumber <= 4) {
              return (
                <button
                  key={pageNumber}
                  onClick={() =>
                    handlePageChange(repository,"", rowsPerPage, pageNumber)
                  }
                  className={`px-3 py-1 mx-1 ${
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
            onClick={() => handlePageChange(repository,"", rowsPerPage, page + 1)}
            disabled={forms.length < rowsPerPage}
            className="p-1 mx-1 pagination-btn text-gray-800 rounded"
          >
            <ChevronRight />
          </button>
          {/* <button
            onClick={() => handlePageChange(repository, rowsPerPage, totalPages)}
            disabled={forms.length < rowsPerPage}
            className="px-4 py-2 mx-1 pagination-btn text-gray-800 rounded"
          >
            {`>>`}
          </button> */}
        </div>
      </div>
      {/* <p className="text-center">{loading + "  " + localLoading + "  " + forms.length}</p> */}
    </div>
  );
}
