import { toast } from "react-toastify";

export const API_BASE_URL =
  "https://us-central1-react-app-e0906.cloudfunctions.net";
// export const API_BASE_URL = "http://localhost:5001/react-app-e0906/us-central1";

export const checkResponse = (response) => {
  let newResponse = {
    success: false,
    data: null,
    message: "",
    error: "",
  };
  try {
    const { data } = response;
    if (response.status === 200) {
      newResponse = {
        success: true,
        data: data.data ?? null,
        message: "",
        error: data.message,
      };
    } else {
      toast.error(data.message);
      newResponse = {
        success: false,
        data: null,
        message: data.message,
        error: data.message,
      };
    }
  } catch (error) {
    const { response: res } = response;
    toast.error(res.data.message);
  }

  return newResponse;
};
