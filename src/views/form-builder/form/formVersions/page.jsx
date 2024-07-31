import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger
// } from '@/components/ui/popover'
// import { Calendar } from '@/components/ui/calendar'
// import { CalendarIcon } from 'lucide-react'
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// import { cn } from '@/lib/utils'
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import BoxLoader from "@/components/BoxLoader";
import { useNavigate, useParams } from "react-router-dom";

// import { Link } from "react-router-dom"

export default function FormVersionPage() {
  const navigate=useNavigate();
  const id=useParams()
  const version_id = useSelector((state) => state?.formStore.version_id);
  // const version_id = useSelector((state) => state?.formStore.version_id);

  const [loader, setLoader] = useState(true);

  return (
    <div className="max-w-[1000px] min-h-[83vh] mx-auto p-2">
<h3 className="pb-3 pt-8 text-[20px] font-[600]">Form Versions</h3>
      <div class="col-start-2 grid grid-cols-12 border rounded-lg bg-[#ffffff]">

        <div className="col-span-7 grid grid-cols-3">
          <div className="p-6">
            <div className="text-[12px] font-[400] text-[#000000]">Form ID</div>
            <div className="text-[16px] font-[500] text-[#000000]">
              F-123454
            </div>
          </div>
          <div className="p-6">
            <div className="text-[12px] font-[400] text-[#000000]">
              Form Name
            </div>
            <div className="text-[16px] font-[500] text-[#000000]">
              User Sign Up
            </div>
          </div>
          <div className="p-6">
            <div className="text-[12px] font-[400] text-[#000000]">
              Form Version
            </div>
            <div className="text-[16px] font-[500] text-[#000000]">
              F-123454
            </div>
          </div>
        </div>
        <div className="col-span-5 ">
          <div className="p-6 gap-2 flex">
          <Button variant="outline" className="bg-[white] text-[#e2252e] text-[14px] font-[400] rounded-lg border-red-700" onClick={()=>{navigate(`/form-version-table${id.id}`)}}>
          Form Report
            </Button>
            <Button className="bg-[#000000]  text-white text-[14px] font-[400] rounded-lg">
            Form Preview
            </Button>
            <Button className="bg-[#e2252e] hover:bg-[#e2252e] text-[14px] font-[400] text-white rounded-lg">
            Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
