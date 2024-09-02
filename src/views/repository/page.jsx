import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox2 } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

function DeleteRepository() {
  const params = useParams();
  const userId = useSelector((state) => state?.authStore?.id);
  const [repository, setRepository] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [forms, setForms] = useState([]);
  const [formsToMove, setFormsToMove] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);

  const getRepository = async () => {
    setLocalLoading(true);
    try {
      await axios
        .get(`/Repository/GetRepositoriesByUserId?userId=${userId}`)
        .then((res) => {
          //   console.log(res);
          if (res.data.success) {
            // console.log(res.data);
            setRepository("all");
            setRepositories(res?.data?.data);
          } else {
            throw new Error("Unable to get repositories!");
          }
        });
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };
  const handlePageChange = async (repo) => {
    setLocalLoading(true);
    if (repo == "all") {
      repo = null;
    }
    try {
      const response = await axios.get(
        `http://135.181.57.251:3048/api/Form/GetAllFormsByRepositoryId?RepositoryId=${repo}&PageNumber=1&PageSize=50`
      );
      const data = await response.data;
      // console.log(data.data);
      if (data?.data?.data?.length > 0) {
        setForms(data?.data?.data);
        setLocalLoading(false);
      } else {
        toast.error("No forms found in this repository!");
      }
    } catch (error) {
      toast.error("Server Unavailable!");
    }
  };
  useEffect(() => {
    // console.log(params.id);
    return () => {
      getRepository();
      handlePageChange(params.id);
    };
  }, []);

  function addToMoveArr(type, id) {
    // console.log(type, id);
    if (type) {
        let arr = formsToMove;
        arr.push(id);
        setFormsToMove(arr);
        // console.log(arr);
    } else {
        let arr = []
        formsToMove?.map((form)=>{form != id && arr.push(form)})
        setFormsToMove(arr);
        // console.log(arr);
    }
    // console.log(formsToMove)
    }

    // useEffect(()=>{
    //     console.log(forms.length, formsToMove.length);
    // }, [forms, formsToMove])

  return (
    <div className="p-8 py-14">
      <div className="flex gap-2 items-center">
        <Link to="/form-builder">
            <button className="text-[#ff0200] text-xs bg-[#f0f0f0] px-1 py-[2px] flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back
            </button>
        </Link>
        <span className="font-semibold text-xl">Move Forms to Folders</span>
      </div>
      <br />

      <h4 className="font-semibold">Move to</h4>
      <Select className="">
        <SelectTrigger className="h-[46px] max-w-[700px] placeholder:text-[#838383] border border-[#e6e3ea] bg-[#ffffff]">
          <SelectValue placeholder={"Select Folder"} />
        </SelectTrigger>
        <SelectContent className="bg-[#ffffff]">
          {repositories?.map((repo) => (
            <SelectItem key={repo?.id} value={repo.id}>
              {repo.repositoryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <br />

      <div className="flex gap-2 items-center">
        <span className="font-semibold text-md">Select All Forms to Move</span>
        <Switch
          checked={forms.length == formsToMove.length}
          onCheckedChange={(e) => {
            if (e) {
                setFormsToMove(forms)
            } else {
                setFormsToMove([])
            }
          }}
          className="h-4 w-10 data-[state=checked]:bg-[#ff0200] data-[state=unchecked]:bg-[#939393]"
          className2="data-[state=checked]:bg-[#363435] data-[state=unchecked]:bg-[#e8e8e8]"
        />
      </div>
      <br />

      <div className="grid grid-cols-4 gap-4 min-h-[40vh]">
        {forms && forms.length > 0
          ? forms?.map((form, id) => (
              <div key={id} className="flex items-center space-x-2 h-fit">
                {/* <Checkbox2
                  id={form?.formId}
                  checked={formsToMove.find((fMov) => fMov == form?.formId)}
                  onCheckedChange={(e) => {
                    if (e) {
                        setFormsToMove([...formsToMove, form?.formId]);
                    } else {
                        setFormsToMove(formsToMove.filter((fMov) => fMov !== form?.formId));
                    }       
                  }}
                /> */}
                <input
                    type="checkbox"
                    id={form?.formId}
                    checked={formsToMove.includes(form?.formId)}
                    onChange={(e) => {
                        if (e.target.checked) {
                        setFormsToMove([...formsToMove, form?.formId]);
                        } else {
                        setFormsToMove(formsToMove.filter((fMov) => fMov !== form?.formId));
                        }
                    }}
                    className="cursor-pointer p-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={form?.formId}
                    className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {form?.formName || "Un-named Form"}
                  </label>
                </div>
              </div>
            ))
          : "No forms present"}
      </div>
      <div className="flex flex-row-reverse">
        <Button className="bg-[#ff0200] hover:bg-[#ff0000b9]">Move Forms</Button>
      </div>
    </div>
  );
}

export default DeleteRepository;
