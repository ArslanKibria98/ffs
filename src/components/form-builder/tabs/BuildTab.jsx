import React, { useEffect } from 'react'

import ControlListButton from '@/components/ControlListButton'
import LeadingListButton from '@/components/LeadingListButton'

import { Checkbox } from '@/components/ui/checkbox'
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from '@/components/ui/accordion';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select';

function BuildTab({ controlList, region, setRegion, countryList, LeadingList, controlModalManager, setControlModalManager, selectedRegionOptions,locData }) {
    return (
        <Accordion className='overflow-auto' type="single" defaultValue="item-1" collapsible>
            <AccordionItem value="item-1" className="mb-1">
                <AccordionTrigger className="px-7 data-[state=open]:bg-[#ffeff0] data-[state=closed]:bg-[#fafafa]">
                    
                    {locData?.build.controls.basic||"Basic Controls"}
                </AccordionTrigger>
                <AccordionContent className="p-7 py-5 bg-[#fafafa] border-b border-[#e2e2e2] overflow-auto max-h-[307px]">
                    <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-2'>
                        {controlList && controlList?.map((control, index) => (
                            <ControlListButton 
                                key={index} 
                                index={index} 
                                icon={control?.icon} 
                                title={control?.title} 
                                controlData={control?.data} 
                                controlModalManager={controlModalManager}
                                setControlModalManager={setControlModalManager}
                            />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="mb-1">
                <AccordionTrigger className="px-7 data-[state=open]:bg-[#ffeff0] data-[state=closed]:bg-[#fafafa]">
                    
                    {locData?.build.controls.regional||"Regional Controls"}
                </AccordionTrigger>
                <AccordionContent className="border-b border-[#e2e2e2] max-h-[450px]">
                    <div className='p-7 pt-5 pb-2 bg-[#ffffff] space-y-3'>
                        <Select className="w-full" onValueChange={(e) => { setRegion(e) }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                                {countryList.map((country, index) => (
                                    <SelectItem key={index} value={country.value}>{country.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {region && (
                            <div className='flex justify-between'>
                                <span className='text-[12px] text-[#838383]'>Total Cost</span>
                                <span className='text-[16px]'>$125.43</span>
                            </div>
                        )}
                    </div>
                    {region && (
                        <div className='p-7 py-5 flex flex-col gap-y-2 bg-[#fafafa] border-b border-[#e2e2e2] max-h-[350px] overflow-auto'>
                            {selectedRegionOptions?.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2 border py-3 px-4 bg-[#fff] rounded">
                                    <Checkbox id={item.value} />
                                    <label
                                        htmlFor={item.value}
                                        className="text-[12px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="mb-1">
                <AccordionTrigger className="px-7 data-[state=open]:bg-[#ffeff0] data-[state=closed]:bg-[#fafafa]">
                    
                    {locData?.build.controls.lending||"Lending Tools"}
                </AccordionTrigger>
                <AccordionContent className="p-7 py-5 bg-[#fafafa] border-b border-[#e2e2e2] overflow-auto max-h-[307px]">
                    <div className='flex flex-col gap-x-2 gap-y-3'>
                        {LeadingList.map((leading, index) => (
                            <LeadingListButton key={index} icon={leading.icon} title={leading.title} func={leading.func} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default BuildTab