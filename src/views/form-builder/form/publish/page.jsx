import React from "react";
import successIcon from "../../../../assets/images/SuccessIcon.svg";
import axios from '@/lib/axios';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"
import { useSelector } from "react-redux";
import localisationData from "../../../../localisation.json";

export default function FormPublishPage() {
  const location = window.location.origin;
  const version_id = useSelector((state) => state?.formStore.version_id);
  const form_Id = useSelector((state) => state?.formStore.form_id);

  const language = useSelector((state) => state.language.language);
    
  let locData = localisationData.renderForm.en;
  if (language == "en") {
    locData = localisationData.renderForm.en;
  } else if (language == "ar") {
    locData = localisationData.renderForm.ar;
  }

  const handlePublish =async (version) => {
    const body={
      versionId: version,
          status:2
    }
    console.log("hello")
    try {
      const response = await axios.post('/Form/ChangeFormStatus', JSON.stringify(body));
      console.log(response);
      if(response?.data?.notificationMessage){
        toast.success(response?.data?.notificationMessage)
      }
      else{
        toast.error(response?.data?.errors[0])
      }
    } catch (error) {
      toast.error("Server Unavailable!");
    }
  };
  return (
    <>
      <div className="px-4 bg-[#FAFAFA] grid grid-cols-1">
        <div className="bg-[white] p-4 flex justify-center mt-8">
          <div className="grid items-center leading-8 text-center mt-8">
            <div className="flex items-center justify-center mb-6">
              <img src={successIcon} />
            </div>
            <div className="font-bold text-4xl">{locData?.thank || "Thank You!"}</div>
            <div>Form ID : {form_Id}</div>
            <div>{locData?.date || "Date"} : 25/03/2024</div>
            <div className="">
              Access URL : {" "}
              <Link
                to={`${location}/render-form/${version_id}`}
                className="underline text-blue-400"
                target="_blank"
              >
                {`${location}/render-form/${version_id}`}
              </Link>
            </div>
            <div className="text-xl mt-3 mx-auto max-w-[550px]">
              {locData?.bClick || "Your draft Form has been created."}
              {" "}<a className="underline text-blue-400" onClick={()=>{handlePublish(version_id)}}>{locData?.click || "Click here"}</a>{" "}
              {locData?.aClick || "to publish your unpublished forms."}
            </div>
            
            <div className="flex flex-row-reverse justify-center gap-4 py-4 my-4">
              <Dialog>
                <DialogTrigger className="px-4 bg-[#e2252e] hover:bg-[#db3139] text-white rounded-lg">
                  {locData?.view || "View HTML Tag"}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      HTML Embedded Tag
                    </DialogTitle>
                    <div>
                      <h6 className="text-xs font-semibold mt-6 mb-2">HTML Code</h6>

                      <div className="w-[90%] border text-gray-700 text-sm p-2">
                      {`<iframe src="${location}/render-form/${version_id}" title="iframe Example 1"></iframe>`}
                      </div>

                    </div>
                  </DialogHeader>
                  <DialogDescription></DialogDescription>
                </DialogContent>
              </Dialog>
              <Link to={`/form-builder`}>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-light">
                  {locData?.back || "Back to Home"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
