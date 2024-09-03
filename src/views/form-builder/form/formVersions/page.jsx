import React, { useState, useEffect } from "react";
import { SET_FORM_INFO,SET_DEFAULT_CONTAINER_ID } from "../../../../redux/store/form";
import { Button } from "@/components/ui/button";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import localisationData from "../../../../localisation.json";

export default function FormVersionPage() {
  const dispatch =useDispatch()
  const navigate=useNavigate();
  const id=useParams()
  console.log(id,'id')
  const version_id = useSelector((state) => state?.formStore.version_id);
  
  const language = useSelector((state) => state.language.language);
    
  let locData = localisationData.formVersions.en;
  if (language == "en") {
    locData = localisationData.formVersions.en;
  } else if (language == "ar") {
    locData = localisationData.formVersions.ar;
  }

  const [loader, setLoader] = useState(true);

  return (
    <div className="max-w-[1000px] min-h-[83vh] mx-auto p-2">
<h3 className="pb-3 pt-8 text-[20px] font-[600]">{locData?.fVersions || "Form Versions"}</h3>
      <div class="col-start-2 grid grid-cols-12 border rounded-lg bg-[#ffffff]">

        <div className="col-span-7 grid grid-cols-3">
          <div className="p-6">
            <div className="text-[12px] font-[400] text-[#000000]">{locData?.formId || "Form ID"}</div>
            <div className="text-[16px] font-[500] text-[#000000]">
              F-123454
            </div>
          </div>
          <div className="p-6">
            <div className="text-[12px] font-[400] text-[#000000]">
              {locData?.formName || "Form Name"}
            </div>
            <div className="text-[16px] font-[500] text-[#000000]">
              User Sign Up
            </div>
          </div>
          <div className="p-6">
            <div className="text-[12px] font-[400] text-[#000000]">
              {locData?.version || "Form Version"}
            </div>
            <div className="text-[16px] font-[500] text-[#000000]">
              F-123454
            </div>
          </div>
        </div>
        <div className="col-span-5 ">
          <div className="p-6 gap-2 flex">
            <Button variant="outline" className="bg-[white] text-[#e2252e] text-[14px] font-[400] rounded-lg border-red-700" onClick={()=>{navigate(`/form-version-table/${id.versionId}`)}}>
              {locData?.report || "Form Report"}
            </Button>
            <Button className="bg-[#000000]  text-white text-[14px] font-[400] rounded-lg" onClick={()=>{navigate(`/form-instant-preview/${id.versionId}/0`)}}>
              {locData?.preview || "Form Preview"}
            </Button>
           <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-[14px] font-[400] text-white rounded-lg" onClick={()=>{dispatch(SET_FORM_INFO(id?.formId,id?.versionId))
                       
                       navigate("/form-builder/form");}}  >
              {locData?.update || "Update"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
