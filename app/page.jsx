// "use client"
// import React from 'react'
import TableView from "@/components/table/tableview";
import { Configuration_Header } from "@/components/table/tableheader";


const formFlow = () => {
  const data = [
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Onboarding Folder',
      Languages: 'English',
      Countries: 'Pakistan',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    },
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Loan Originated Folder',
      Languages: 'English',
      Countries: 'English, Arabic',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    },
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Onboarding Folder',
      Languages: 'English',
      Countries: 'Pakistan',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    },
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Onboarding Folder',
      Languages: 'English',
      Countries: 'Pakistan',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    },
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Onboarding Folder',
      Languages: 'English',
      Countries: 'Pakistan',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    },
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Onboarding Folder',
      Languages: 'English',
      Countries: 'Pakistan',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    },
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Onboarding Folder',
      Languages: 'English',
      Countries: 'Pakistan',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    },
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Onboarding Folder',
      Languages: 'English',
      Countries: 'Pakistan',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    },
    {
      FormID: 'F-11222',
      FormName: 'Dummy Form',
      Repository: 'Onboarding Folder',
      Languages: 'English',
      Countries: 'Pakistan',
      CreatedBy: 'User',
      CreatedDate: '20/05/2024',
      LastModifiedBy: 'User',
      LastModifiedDate: '20/05/2024'
    }
  ]
  return (
    <>
      <TableView header={Configuration_Header} data={data} />
    </>
  )
}

export default formFlow
