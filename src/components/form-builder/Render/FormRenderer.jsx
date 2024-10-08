import React, { useState, useEffect } from "react";

import FieldRenderer from "./FieldRenderer";
import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
import BoxLoader from "@/components/BoxLoader";
// import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function FormRenderer({ formData=null, formDataApi, formik, loader, preview=false }) {

  let formSettings = formData?.formSettings || null;
  const [isLastTabActive, setIsLastTabActive] = useState(false);
  const handleTabChange = (newTabValue) => {
    if (formDataApi.length > 1) {
      const lastTabValue = formDataApi[formDataApi.length - 1].containerName;
      setIsLastTabActive(newTabValue === lastTabValue);
    }
  };
  // console.log(formData);
  // let iteration = 0;
  return (
    <form onSubmit={formik.handleSubmit}>
      {formDataApi.length > 0 && (
        <Tabs
          defaultValue={formDataApi[0].containerName}
          onValueChange={handleTabChange}
        >
          <TabsList className="w-fit space-x-2 py-1 border bg-gray-200 rounded-lg px-1">
            {formDataApi.map((tab, index) => (
                <TabsTrigger
                  key={index}
                  value={tab?.containerName}
                  className="rounded p-0 px-3 h-8 w-fit"
                >
                  <h5 className="text-sm">
                    {tab?.containerName || "Tab Name"}
                  </h5>
                </TabsTrigger>
            ))}
          </TabsList>
          {formDataApi?.map((tab, index) => (
            <TabsContent
              key={index}
              value={tab?.containerName}
              className="border bg-white p-4 rounded-xl w-full"
            >
              <div className={(formSettings?.formTemplate ? (formSettings?.formTemplate == 1 ? "grid grid-cols-4" : (formSettings?.formTemplate == 2 ? "grid grid-cols-4" : "grid grid-cols-4")) : "grid grid-cols-4") + " gap-2 gap-y-4"}>
                {tab?.controls?.map((field, index) => {

                  return (
                  <div className={(formSettings?.formTemplate == 3 ? (((index+1)%3)==0 ? " col-span-4" : " col-span-2 ") : "col-span-2")}>
                    <FieldRenderer key={index} control={field} formik={formik} />
                  </div>
                )})}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
      {!loader && formDataApi?.length < 1 ? (
        <div className="p-8 text-center bg-white rounded-lg border text-black">
          <span>No fields in form!</span>
        </div>
      ) : (
        ""
      )}
      {loader && formDataApi?.length < 1 && (
        <div className="p-8 text-center bg-white rounded-lg border">
          <BoxLoader />
        </div>
      )}
      {!preview && (formDataApi?.length > 1 ? (
          <>
            {isLastTabActive && (
              <div className="flex flex-row-reverse gap-4 py-4 my-4">
                <Button
                  type="submit"
                  className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
                  disabled={loader}
                >
                  Submit
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="flex flex-row-reverse gap-4 py-4 my-4">
              <Button
                type="submit"
                className="bg-[#e2252e] hover:bg-[#e2252e] text-white rounded-lg"
                disabled={loader}
              >
                Submit
              </Button>
            </div>
          </>
        ))
      }
    </form>
  );
}

export default FormRenderer;
