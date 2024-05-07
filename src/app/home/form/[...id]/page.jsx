"use client";
import React, { useEffect, useState } from "react";
import FormSettings from "@/Components/formSettings";
import JsonBar from "@/Components/jsonBar";
import ItemsBar from "@/Components/itemsBar";
import LayoutBar from "@/Components/layoutBar";
import { SaveIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { Skeleton } from "@/Components/ui/skeleton";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react"
import axios from "axios";

const FormManager = () => {
  const { data: session, status } = useSession()
  const [loaded, setLoaded] = useState(false);
  const [loadedSave, setLoadedSave] = useState(false);
  const [startTags, setStartTags] = useState(["registeration"]);

  const router = usePathname();
  const [pageFormId, setPageFormId] = useState(router?.split('/')[3]);

  const [startJson, setStartJson] = useState({
    // id: pageFormId,
    // createdAt: "2024-03-18T09:51:04.234Z",
    // updatedAt: "2024-03-18T09:51:04.234Z",
    // name: "demo form",
    // content: {
      formName: "demo form",
      multi_step: false,
      steps: [
        {
          step_name: "Personal",
          onStepComplete: "",
          fields: [],
        },
      ],
      onSubmit: "http://0.0.0.0:3000/some/api",
      successMsg: "Data was saved",
      errorMsg: "Something went wrong",
    // },
    // userEmail: "admin@admin.com"
  });

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tags", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTags(data.data);
        } else {
          const { error } = await response.json();
          console.error(error);
          // Handle the error as needed
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      }
    };
    fetchData();
  }, []);

  // const addForm = async (content) => {
  //   try {
  //     const response = await fetch("/api/forms", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: 1,
  //         formData: { content: content },
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       return data.data;
  //     } else {
  //       const { error } = await response.json();
  //       throw new Error(error);
  //     }
  //   } catch (error) {
  //     console.error("Error adding tag:", error);
  //     throw error;
  //   }
  // };

  // console.warn(session)
  // console.log("session")
  // console.log('currentForm', startJson)

  const saveForm = async () => {
    console.log("attemting save.")
    try {
      setLoadedSave(true);
      const response = await axios.patch(`/api/forms?formId=${pageFormId}`, {
        id: pageFormId,
        name: startJson.formName,
        content: JSON.stringify(startJson),
        userEmail: session?.user?.email
      });

      if (response.data.success) {
        console.log('Form updated successfully:', response.data);
        toast.success('Form Saved Successfully!');

        setLoadedSave(false);
      } else {
        const { error } = await response.json();
        console.error(error);
        toast.error("Unable to save Form.")
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Unable to save Form.")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/forms?formId=${pageFormId}`);

        if (response.ok) {
          const data = await response.json();

          setStartJson(
            JSON.parse(data.data.content)
            // ...data.data,
            // content: JSON.parse(data.data.content)
          )
          setLoaded(true);
        } else {
          const { error } = await response.json();
          console.error(error);
          toast.error("Unable to load Form.")
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Unable to load Form.")
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {loaded ? (
          <FormSettings
            data={startJson}
            update={setStartJson}
            tags={tags}
            tagUpdate={setStartTags}
            dataStatus={loaded}
          />
        ) : (
          <div className='px-4 py-2'>
            <p className='text-lg font-semibold underline'>
              Form Settings
            </p>
            <div className='pt-1'>
              <Skeleton className="h-[125px] w-full rounded-xl  bg-gray-200" />
            </div>
          </div>
        )}

        <br />
      </div>
      <div className="grid grid-cols-8 h-[70vh] text-center">
        <div className="border overflow-y-auto col-span-2">
          Items Bar
          <br />
          {loaded ? (
            <ItemsBar data={startJson} tags={tags} update={setStartJson} />
          ) : (
            <Skeleton className="h-[500px] rounded-xl bg-red-200 m-4" />
          )}
        </div>
        <div className="border overflow-y-auto col-span-3">
          Layout Bar
          <br />
          {loaded ? (
            <LayoutBar data={startJson} update={setStartJson} />
          ) : (
            <Skeleton className="h-[200px] rounded-xl bg-gray-200 m-4" />
          )}
        </div>
        <div className="border overflow-y-auto col-span-3">
          JSON Bar
          <br />
          <div className="text-left">
            {loaded ? (
              <JsonBar json={startJson} name={"Form"} />
            ) : (
              <Skeleton className="h-[400px] rounded-xl bg-gray-200 m-4" />
            )}
          </div>
          {(loaded && !loadedSave) ? (
            <div className="absolute bottom-8 right-8 flex justify-between gap-3">
              <AlertDialog>
                <AlertDialogTrigger className="bg-[blue] text-white shadow-lg hover:bg-[darkblue] duration-100 rounded-2xl p-2">
                  Preview
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Form Name:</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction className="bg-[red] hover:bg-[darkred]">Close</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <button
                onClick={() => {saveForm()}}
                className="flex bg-[red] text-white shadow-lg hover:bg-[darkred] duration-100 rounded-2xl p-2"
                disabled={loadedSave}
              >
                <SaveIcon className="cursor-pointer pr-1" size={24} /> Save Form
              </button>
            </div>
          ) : ("")}
        </div>
      </div>
    </div>
  );
};

export default FormManager;
