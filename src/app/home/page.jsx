"use client";
import axios from 'axios';
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
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
} from "@/Components/ui/alert-dialog.jsx"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/Components/ui/hover-card"
import { Skeleton } from "@/Components/ui/skeleton";

import toast from 'react-hot-toast';
import { Trash2, LockKeyholeIcon, Copy } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const [loaded, setLoaded] = useState(false);
    // let session;
    const { data: session, status } = useSession()

    const [formsUpdate, setFormsUpdate] = useState(0);
    const [forms, setForms] = useState([]);
    const [newFormName, setNewFormName] = useState([]);
    // const router = useRouter();

    useEffect(() => {
        // console.log(session?.user?.email)
        const fetchData = async () => {
            try {
                let email = session.user.email;
                const response = await fetch(`/api/forms?email=${email}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data.data);
                    console.log(status);
                    setForms(data.data);
                    setLoaded(true)
                } else {
                    const { error } = await response.json();
                    console.error(error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error as needed
            } finally {
            }
        };

        if (session?.user?.email)
            fetchData();
    }, [status, formsUpdate]);

    const createForm = async (email, formData) => {
        try {
            const response = await axios.post('/api/forms', {
                email,
                formData,
            });

            if (response.data.success) {
                console.log('Form updated successfully:', response.data.data);
                toast.success('Form Created Successfully!');
                // fetchData();
                setFormsUpdate(formsUpdate + 1);
            } else {
                console.error('Error creating form:', response.data.error);
                toast.error("Error creating form.")
            }
        } catch (error) {
            console.error('Error in POST request:', error);
            toast.error("Unable to create Form.")
        }
    }
    let formDataInit = {
        formName: newFormName,
        multi_step: false,
        steps: [
            {
                step_name: "Step 1",
                onStepComplete: "",
                fields: [],
            },
        ],
        onSubmit: "http://0.0.0.0:3000/some/api",
        successMsg: "Data was saved",
        errorMsg: "Something went wrong",
    };

    const deleteForm = async (id) => {
        try {
            const response = await axios.delete(`/api/forms?formId=${id}`);

            if (response.data.success) {
                console.log('Form deleted successfully:', response.data.data);
                toast.success('Form deleted Successfully!');
                // fetchData();
                setFormsUpdate(formsUpdate + 1);
            } else {
                console.error('Error deleting form:', response.data.error);
                toast.error("Error deleting form.")
            }
        } catch (error) {
            console.error('Error in DELETE request:', error);
            toast.error("Unable to Delete Form.")
        }
    }

    const toggleFormStatus = async (id, status) => {
        try {
            const response = await axios.get(`/api/forms/status-change?formId=${id}&email=${session.user.email}&status=${status}`);

            if (response.data.success) {
                console.log('Form updated successfully:', response.data.data);
                toast.success('Form updated Successfully!');
                // fetchData();
                setFormsUpdate(formsUpdate + 1);
            } else {
                console.error('Error updating form:', response.data.error);
                toast.error("Error updating form.")
            }
        } catch (error) {
            console.error('Error in update request:', error);
            toast.error("Unable to update Form.")
        }
    }

    const copyFormApi = async (id, status) => {
        let apiString;
        apiString = "http://localhost:3000/api/forms?formId="+id+"&public="+status;

        // if (status) {
        // } else {
        //     apiString = "http://localhost:3000/api/forms?formId="+id;
        // }
        toast.success(apiString)

        // try {
        //     const response = await axios.get(`/api/forms/status-change?formId=${id}&email=${session.user.email}&status=${status}`);

        //     if (response.data.success) {
        //         console.log('Form updated successfully:', response.data.data);
        //         toast.success('Form updated Successfully!');
        //         // fetchData();
        //         setFormsUpdate(formsUpdate + 1);
        //     } else {
        //         console.error('Error updating form:', response.data.error);
        //         toast.error("Error updating form.")
        //     }
        // } catch (error) {
        //     console.error('Error in update request:', error);
        //     toast.error("Unable to update Form.")
        // }
    }

    return (
        <main className="p-6 h-full overflow-y-hidden">
            <div className="text-xl font-extrabold font-mono underline">
                Your FORMS
            </div>
            {/* {session?.user?.email} */}
            <span className="">({forms.length ?? "Loading..."})</span>
            <div className="py-6 pb-12 text-center overflow-y-auto h-full w-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="flex flex-col justify-between items-center p-2 text-center bg-red-400 h-[180px] duration-200 rounded-xl shadow-lg hover:shadow-xl shadow-gray-300 hover:shadow-gray-400 text-red-200 hover:text-red-100">
                            <p className="text-[70px] font-extrabold">+</p>
                            <p className="font-extrabold pb-4">New Form</p>
                        </button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                <p className="text-red-500">Create New Form</p>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <input type="text" placeholder="Enter Form Name" minLength={4} maxLength={22}
                                    value={newFormName} onChange={(event) => { setNewFormName(event.target.value) }}
                                    className="p-2 my-2 border rounded-lg w-full" required />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => createForm(session?.user?.email, formDataInit)} className="bg-red-500 hover:bg-red-600" disabled={(!newFormName || newFormName == "" || newFormName.length < 4) ? true : false}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {loaded ?
                    (<>{ forms?.map((item, index) => {
                        const parsedContent = JSON.parse(item.content);
                        // console.log(parsedContent)
                        return (
                            <HoverCard key={index}>
                                <HoverCardTrigger href={`/home/form/${item.id}`}>
                                    {/* <a href="#" > */}
                                    <div className='flex flex-col justify-between items-center py-2 text-left bg-red-400 h-[180px] duration-200 rounded-xl shadow-lg hover:shadow-xl shadow-gray-300 hover:shadow-gray-400 text-red-100 hover:text-white'>
                                        <div className='w-full px-2'>
                                            <div className='py-2'>
                                                {parsedContent?.tags ? (<div>
                                                    <strong>Tags: </strong>
                                                </div>) : "No tags"}
                                            </div>
                                            <div className='py-2'>
                                                {parsedContent?.createdAt}
                                            </div>
                                            <div>
                                                <strong>Form Type:</strong> {parsedContent?.multi_step ? "Multi Step" : "Single Step"}
                                            </div>
                                        </div>
                                        <p className="text-center font-extrabold pb-4">{parsedContent?.formName}<span className='text-sm font-light'> - {item.type ? "public" : "private"}</span></p>
                                    </div>
                                    {/* </a> */}
                                </HoverCardTrigger>
                                <HoverCardContent className="w-fit flex gap-3">
                                    <button onClick={() => copyFormApi(item.id, item.type)} className='p-2 border-0 rounded text-yellow-500 hover:text-white bg-white hover:bg-yellow-500 duration-200'>
                                        <Copy />
                                    </button>
                                    {item.type == "false" || item.type == false ? (
                                        <button onClick={() => toggleFormStatus(item.id, true)} className='p-2 border-0 rounded text-green-500 hover:text-white bg-white hover:bg-[green] duration-200'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-keyhole-open"><circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 9.33-2.5"/></svg>
                                        </button>
                                    ) : (
                                        <button onClick={() => toggleFormStatus(item.id, false)} className='p-2 border-0 rounded text-orange-500 hover:text-white bg-white hover:bg-[orange] duration-200'>
                                            <LockKeyholeIcon />
                                        </button>
                                    )}
                                    <button onClick={() => deleteForm(item.id)} className='p-2 border-0 rounded text-red-500 hover:text-white bg-white hover:bg-[red] duration-200'>
                                        <Trash2 />
                                    </button>
                                </HoverCardContent>
                            </HoverCard>
                        );
                    })}</>) : (
                    <Skeleton className="h-[180px] rounded-xl shadow-gray-300 bg-red-200" />
                )}
            </div>
        </main>
    );
}
