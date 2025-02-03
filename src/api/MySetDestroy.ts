import axios from "axios";
import Cookies from "js-cookie";

export interface MySetDestroyProps {
  id: number;
}

export interface MySetDestroyResponse {
  success: boolean;
  messages: string[];
}

export async function MySetDestroy({
  id,
}: MySetDestroyProps): Promise<MySetDestroyResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/my-sets/${id}`;
  const authToken = Cookies.get("authToken");

  return await axios
    .delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    });
}
