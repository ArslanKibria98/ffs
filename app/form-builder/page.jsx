"use client"
import React from 'react'
import { Button } from '@/components/ui/button'

function Page() {
  return (
    <div className="container mx-auto">
        <div className="flex flex-row flex-wrap py-4">
          <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
            <div className="sticky top-0 p-4 w-full border">
              <div className="font-bold">Item Bar</div>

              <div className="col-span-12">
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-[#FF0000] text-center ">
                    <Button className="text-white">Build</Button>
                  </div>
                  <div className="bg-[#ABABAB] text-center ">
                    <Button className="text-white">Style</Button>
                  </div>
                </div>
              </div>

              <ul className="flex flex-col overflow-hidden">
                <li>dsgfdh</li>
                <li>dsgfdh</li>
                <li>dsgfdh</li>
                <li>dsgfdh</li>
                <li>dsgfdh</li>
                <li>dsgfdh</li>
                <li>dsgfdh</li>
                <li>dsgfdh</li>
              </ul>
            </div>
          </aside>
          <main
            role="main"
            className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2 border"
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              voluptas rerum inventore labore ipsam aliquam tempore eveniet
              blanditiis molestias quis, eligendi vitae exercitationem optio!
              Rem esse similique unde fugit praesentium?
            </div>
          </main>
        </div>
    </div>
  )
}

export default Page