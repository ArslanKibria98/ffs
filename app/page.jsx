"use client"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const formFlow = () => {
  
  return (
    <div className="min-h-[82.8vh] p-6 flex flex-col items-center pt-16">
      <div className="w-full flex justify-between items-center my-3">
        <div>Folder Dropdown</div>
        <div className="flex justify-evenly gap-2 items-center">
          <span>Search</span>
          <span>Filter</span>
          <Link href={"/form-builder"}>
            <Button className="bg-[#e2252e] hover:bg-[#e2252eec] font-normal text-[16px]">+ Create New Form</Button>
          </Link>
        </div>
      </div>
      <div className="w-full rounded-xl bg-white overflow-hidden">
        <Table className="rounded-lg border bg-white overflow-x-scroll">
          <TableHeader className="">
            <TableRow className="bg-[#e2252e] hover:bg-[#e2252e] ">
              <TableHead className="min-w-[100px] text-white">Form ID</TableHead>
              <TableHead className="min-w-[110px] text-white">Form Name</TableHead>
              <TableHead className="min-w-[160px] text-white">Repository</TableHead>
              <TableHead className="min-w-[150px] text-white">Languages</TableHead>
              <TableHead className="min-w-[150px] text-white">Countries</TableHead>
              <TableHead className="min-w-[130px] text-white">Created By</TableHead>
              <TableHead className="min-w-[130px] text-white">Created Date</TableHead>
              <TableHead className="min-w-[160px] text-white">Last Modified By</TableHead>
              <TableHead className="min-w-[160px] text-white">Last Modified Date</TableHead>
              <TableHead className="text-white">Version</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="">$250.00</TableCell>
              <TableCell className="">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="">$250.00</TableCell>
              <TableCell className="">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default formFlow
