import axios from "./axios";
import { toast } from "react-hot-toast";

export async function deleteApi(id, resetForm, forTab) {
    const apiString = forTab ? `/Controls/DeleteContainer?ContainerId=${id}` :
    `/Controls/DeleteControl?controlId=${id}`
    try {
        const response = await axios.delete(apiString).then((data) => {
            console.log(data)
            toast.success("Operation Successful");
            resetForm();
        }).catch((e) => {
            console.error('There was a problem with the request:', error);
            toast.error("Unable to perform task");
            resetForm();
        });
      }
     catch (error) {
      console.error('There was a problem with the deleting:', error);
      toast.error("Unable to perform task");
      resetForm();
    }
}