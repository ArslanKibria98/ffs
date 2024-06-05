"use client"
import React from 'react';
import { Switch } from '@mui/material'; 

const SwitchCell = ({ value, onChange }) => {
  return (
    <Switch
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
     
    />
  );
};

export const Configuration_Header = [
  {
    name: "Form ID",
    selector: (row) => row.FormID,
  },
  {
    name: "Form Name",
    selector: (row ) => row.FormName,
  },
  {
    name: "Repository",
    selector: (row) => row.Repository,
  },
  {
    name: "Languages",
    selector: (row) => row.Languages,
  },
  {
    name: "Repository",
    selector: (row) => row.Repository,
  },
  {
    name: "Countries",
    selector: (row) => row.Countries,
  }, {
    name: "Created By",
    selector: (row) => row.CreatedBy,
  },
  {
    name: "Created Date",
    selector: (row) => row.CreatedDate,
  },
  {
    name: "Last Modified By",
    selector: (row) => row.LastModifiedBy,
  },
  {
    name: "Last Modified Date",
    selector: (row) => row.LastModifiedDate,
  },
  
];
