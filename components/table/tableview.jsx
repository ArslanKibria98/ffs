'use client'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
const TableView = ({ header, data }) => {
  const router = useRouter()
  const customStyles = {
    rows: {
      style: {
        minHeight: '44px'
        // background:row % 2 === 0 ? 'transparent' : '#F5F5F5'
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#E2242E',
        color: 'white'
      }
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        fontSize: '12px',
        borderTopLeftRadius: '10px',
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center' // Center the content vertically (if needed)
      }
    },
    getRowProps: (row, rowIndex) => ({
      style: {
        background: rowIndex % 2 === 0 ? 'bg-transparent' : 'bg-[#F5F5F5]'
      }
    })
  }
  const top100Films = [{ title: 'The Shawshank Redemption', year: 1994 }]
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title
  })

  return (
    <>
      <div className="max-auto container mt-20">
        <div className="flex mb-5">
          <div className="font-bold text-xl flex-3 items-center flex">
            Forms Studio
          </div>
          <div className="flex-1 flex justify-end px-3">
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              className="bg-[#ECECEC] rounded-xl border-transparent"
              sx={{ width: 257 }}
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search" />
              )}
            />
          </div>
          <div className="flex-2 flex px-3">
            <Autocomplete
              id="filter-demo"
              options={top100Films}
              className="bg-[#ECECEC] border-transparent rounded-xl"
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              sx={{ width: 157 }}
              renderInput={(params) => (
                <TextField {...params} label="Filter by" />
              )}
            />
          </div>
          <div className="flex-2 flex px-3">
            <Autocomplete
              id="filter-demo"
              options={top100Films}
              className="bg-[#ECECEC] border-transparent rounded-xl"
              getOptionLabel={(option) => option.title}
              filterOptions={filterOptions}
              sx={{ width: 157 }}
              renderInput={(params) => (
                <TextField {...params} label="Sort by" />
              )}
            />
          </div>
          <div className="w-44 items-center flex bg-[#E2242E]  rounded-xl">
            <Button className="text-white" onClick={() => router.push('/formFlowStudio/formSetting')}>create new form</Button>
          </div>
        </div>
        <DataTable
          pagination
          columns={header}
          data={data}
          customStyles={customStyles}
          stripe={true}
          // noDataComponent={noDataComponent}
        />
      </div>
    </>
  )
}

export default TableView
