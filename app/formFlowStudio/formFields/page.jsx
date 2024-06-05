'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FileUploader } from 'react-drag-drop-files'
import { Button } from '@mui/material'
const page = () => {
   const router = useRouter()
  const [file, setFile] = useState(null)
  const handleChange = (file) => {
    setFile(file)
  }
  const handleSubmitButton = (formField) => {
    console.log(formField, 'formField')
  }
  return (
    <>
     
      <div className="grid grid-cols-12">
        <div className=" p-4 col-span-8 col-start-3 mt-6">
          <h1 className="font-bold text-2xl mb-4">Form Fields</h1>
          <div className="border bg-[#FFFFFF] rounded-xl p-4">
            <h2 className="font-bold text-base mb-5">1- Personal Details</h2>
            <Formik
              initialValues={{}}
              onSubmit={(values) => handleSubmitButton(values)}
            >
              {() => {
                return (
                  <Form>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="form-group form-label-group grid">
                        <label className="pb-1" htmlFor="First Name">
                          First Name *
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          placeholder="Registration Inquiry (Guest)"
                          name="FirstName"
                          id="FirstName"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="FirstName"
                          component="div"
                          className="invalid-feedback text-danger"
                        />
                      </div>
                      <div className="form-group new_password form-label-group grid ">
                        <label className="pb-1" htmlFor="Last Name">
                          Last Name *
                        </label>
                        <Field
                          type="text"
                          placeholder="Enter your Last Name"
                          id="LastName"
                          name="LastName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="LastName"
                          component="div"
                          className="invalid-feedback text-danger"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="form-group form-label-group grid">
                        <label className="pb-1" htmlFor="Email">
                          Email
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          placeholder="Enter Your Email"
                          name="Email"
                          id="Email"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="Email"
                          component="div"
                          className="invalid-feedback text-danger"
                        />
                      </div>
                      <div className="form-group new_password form-label-group grid ">
                        <label className="pb-1" htmlFor="Phone Number">
                          Phone Number
                        </label>
                        <Field
                          type="text"
                          placeholder="Dashboard-User Profiles"
                          id=" PhoneNumber"
                          name=" PhoneNumber"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="PhoneNumber"
                          component="div"
                          className="invalid-feedback text-danger"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="form-group form-label-group grid">
                        <label className="pb-1" htmlFor="  DateofBirth">
                          Date of Birth
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          placeholder="Enter Date of Birth"
                          name="DateofBirth"
                          id="DateofBirth"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="DateofBirth"
                          component="div"
                          className="invalid-feedback text-danger"
                        />
                      </div>
                      <div className="form-group grid ">
                        <label className="pb-1" htmlFor="Address">
                          Address
                        </label>
                        <Field
                          type="text"
                          placeholder="enter address"
                          id="Address"
                          name="Address"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="Address"
                          component="div"
                          className="invalid-feedback text-danger"
                        />
                      </div>
                    </div>
                    <div className="mt-8 ">
                      <h2 className="font-bold text-base mb-5">
                        2- Business Details
                      </h2>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="form-group form-label-group grid">
                          <label className="pb-1" htmlFor="Business Name">
                            Business Name *
                          </label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="Business Name"
                            name="BusinessName"
                            id="BusinessName"
                            autoComplete="off"
                          />
                          <ErrorMessage
                            name=" BusinessName"
                            component="div"
                            className="invalid-feedback text-danger"
                          />
                        </div>
                        <div className="form-group new_password form-label-group grid ">
                          <label className="pb-1" htmlFor="Last Name">
                            Last Name *
                          </label>
                          <Field
                            type="text"
                            placeholder="Enter your Last Name"
                            id="LastName"
                            name="LastName"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="LastName"
                            component="div"
                            className="invalid-feedback text-danger"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="form-group form-label-group grid">
                          <label className="pb-1" htmlFor="Email">
                            Email
                          </label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter Your Email"
                            name="Email"
                            id="Email"
                            autoComplete="off"
                          />
                          <ErrorMessage
                            name="Email"
                            component="div"
                            className="invalid-feedback text-danger"
                          />
                        </div>
                        <div className="form-group new_password form-label-group grid ">
                          <label className="pb-1" htmlFor="Phone Number">
                            Phone Number
                          </label>
                          <Field
                            type="text"
                            placeholder="Dashboard-User Profiles"
                            id=" PhoneNumber"
                            name=" PhoneNumber"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="PhoneNumber"
                            component="div"
                            className="invalid-feedback text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h2 className="font-bold text-base mb-5">
                        3- Attach Files
                      </h2>
                      <div className="grid grid-cols-1">
                        <FileUploader
                          handleChange={handleChange}
                          name="file"
                          className="file-uploader"
                        //   types={fileTypes}
                        />
                      </div>
                    </div>
               
                  </Form>
                )
              }}
            </Formik>
          </div>
          <div className="flex justify-end gap-2 mt-6 ">
          <Button className="bg-[#BEBEBE] rounded-l text-white">
            Previous
          </Button>
          <Button className="bg-[#E2242E] rounded-l text-white" onClick={() => router.push('/formFlowStudio/formName')}>Next</Button>
        </div>
        </div>
      </div>

      
    </>
  )
}

export default page
