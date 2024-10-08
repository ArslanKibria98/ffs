import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { deleteApi } from "@/lib/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/redux/store/loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import localisationData from "../../localisation.json";

function TabSection({ tab, index, children, resetForm, updateModalData }) {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.language.language);
  let locData = localisationData.formBuilder.en;
  if (language == "en") {
    locData = localisationData.formBuilder.en;
  } else if (language == "ar") {
    locData = localisationData.formBuilder.ar;
  }

  function resetFormForward() {
    console.log("Forward function in Tab Section");
    resetForm();
  }

  return (
    <div className="">
      {/* Tab Name Box */}
      <div className="">
        <div className="flex gap-1 items-center mb-2">
          <img
            src="/form-layout-icons/draggableIcon.svg"
            alt="Drag Icon"
            height={16}
            width={16}
          />
          <h4>{locData?.tab || "Tab"} {index + 1}</h4>
        </div>

        {/* Tab Name Field Box */}
        <div className="flex gap-1 items-center w-full">
          <div className="w-[16px]"></div>
          <div className="w-full">
            <span className="text-[12px]">{locData?.tabName || "Tab Name"}</span>
            <div className="flex justify-between w-full gap-3">
              <Input
                className="w-[90%]"
                type="text"
                value={tab?.containerName ? tab?.containerName : "--"}
                name=""
                id=""
                readOnly
              />
              <div className="flex justify-evenly gap-1 w-[10%] min-w-[100px]">
                <Dialog>
                  <DialogTrigger>
                    <div
                      className={
                        "inline-flex items-center rounded-md px-4 py-2 h-[40px] w-[50px]" +
                        " bg-[#ffffff] hover:bg-[#efefef] flex flex-col items-center text-[#838383] hover:text-[#ff9d00]"
                      }
                    >
                      <span className="text-[10px]">{locData?.edit || "Edit"}</span>
                      <img
                        src="/form-layout-icons/editIcon.svg"
                        alt="Edit Icon"
                        height={16}
                        width={16}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>{updateModalData}</DialogHeader>
                    <DialogDescription></DialogDescription>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  className="h-[40px] flex flex-col text-[#838383] hover:text-[#ff0200]"
                  onClick={() => {
                    dispatch(setIsLoading(true));
                    deleteApi(tab?.id, resetFormForward, true);
                  }}
                >
                  <span className="text-[10px]">{locData?.delete || "Delete"}</span>
                  <img
                    src="/form-layout-icons/deleteIcon.svg"
                    alt="Delete Icon"
                    height={16}
                    width={16}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* Tab Fields Box */}
      <div className=" mb-10">
        <div className="flex gap-1 items-center mb-2">
          <div className="w-[16px]"></div>
          <h4>{locData?.field || "Fields"}</h4>
        </div>

        {/* Tab Name Field Box */}
        {children}
      </div>
      <Separator className="mb-7" />
    </div>
  );
}

export default TabSection;
