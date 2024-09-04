// import "../globals.css"
import React, { useEffect } from "react";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SET_USER_INFO } from "../redux/store/auth";
import axios from "@/lib/axios";

export default function AuthHandover() {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.authStore?.id);
  const token =
    params?.token ||
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3OEQ5NkNDNEJFQkVGRTM3RjA5OERFN0YzQTU0NTM5IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MjEzOTQ0NjcsImV4cCI6MTcyMTM5ODA2NywiaXNzIjoiaHR0cHM6Ly9maW5vdmFzZWMueGludGRldi5jb206MzQ0MyIsImF1ZCI6Imh0dHBzOi8vZmlub3Zhc2VjLnhpbnRkZXYuY29tOjM0NDMvcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiMWJhZjEwZjgtNzQ2YS00NTRhLWFkMzctMmI0ZWU1ZTc4YWYyIiwic3ViIjoiODU3ZWYxMWQtODNmZC00ZjMyLTk0ZWItNjYxNThhOWJhM2I3IiwiYXV0aF90aW1lIjoxNzIxMzkwMDc2LCJpZHAiOiJsb2NhbCIsInJvbGUiOiJTdXBlciBBZG1pbiIsInVzZXJJZCI6ImFkbWluIiwiVGVuYW50SWQiOiIzNTI3MTUyYy05YTdlLTRhYTItZTg5MS0wOGRjODE2YmYxMTAiLCJDb21wYW55TmFtZSI6Ik15VG0iLCJQYWNrYWdlRGV0YWlsIjoiTG9hbiBNYW5hZ2VtZW50IFN5c3RlbSIsImp0aSI6IkQ2RUQ5QUIxNkI0NjQxNTI0N0UwREE4NDc3MDNBN0U3Iiwic2lkIjoiOEEwMzEyN0ZERUYzRDgyQUNBODc0QTA2OUM5MzEzNjAiLCJpYXQiOjE3MjEzOTQ0NjcsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJXb3JrZmxvd3MiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.YYRgEElQ-93p4V0V1UocsdFqF_mwz4FR2BpKU2EDiukb_jQNQSdA12zVY72thw7dEK7iT78VN8Y8kcxyd-xHfJYzevb-bwmfeE5TCFZoSaM8roy03JsjWEuPOgvTPPX-dD2F0dDXKAgtk0VLvYg3z6qp2sGks4r0r2g7B6fXyl2-8wgv6oiRacCKyqAmbS0QlQvu1JaC0auJxCFe7LI-y9EXsljZ9dXt9fa1y3m2DNoPdxkYiAcPDBZj46b8VcrOk5XonXU55m5BJ_2JMaEHwbpzYw9GYnBmDf3L9Cn4TohgdNenuY8BjaQjP1n42vF1EZrpEbTKbQhWf2uzR5Wpag";
  Cookies.set("token", token);

  function decodeAccessToken(token) {
    const jwt = token?.split(".");
    const header = JSON.parse(atob(jwt[0]));
    const payload = JSON.parse(atob(jwt[1]));
    return { header, payload };
  }
  const decodedToken = decodeAccessToken(token);
  console.log(decodedToken, "--098765");
  const getUserId = async (id) => {
    try {
      const response = await axios.post(
        `/User/GetUserByIdentityUserId?IdentityUserId=${id}`
      );
      if (response) {
        let responseData = await response.data;
        if (!responseData.success) {
          toast.error(responseData?.notificationMessage);
          // return;
        }
        dispatch(
          SET_USER_INFO({
            email: "dummy@dummy.com",
            role: decodedToken?.payload?.role || "dummy",
            nickname: "dummy",
            id: responseData?.data.id || "A2DEC207-EDFA-4619-BCF1-6DF55A5DD56F",
            tenant_id:
              decodedToken?.payload?.TenantId ||
              "FF2B49B3-57ED-486C-8326-53DF5BA5B5B4",
            // tenant_id: "FF2B49B3-57ED-486C-8326-53DF5BA5B5B4" || 'FF2B49B3-57ED-486C-8326-53DF5BA5B5B4',
            // id: "A2DEC207-EDFA-4619-BCF1-6DF55A5DD56F" || 'A2DEC207-EDFA-4619-BCF1-6DF55A5DD56F',
            token: token,
          })
        );
        navigate("/form-builder");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    console.log("Outside return")
    // return () => {
      // console.log("In return")
      getUserId(decodedToken?.payload?.sub);
    // };
  }, []);

  return (
    <div className="min-h-[82vh] flex flex-col justify-center items-center cursor-wait">
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
