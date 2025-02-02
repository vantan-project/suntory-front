import axios from "axios";
import Cookies from "js-cookie";

export interface DrinkDestroyProps {
  id: number;
}

export interface DrinkDestroyResponse {
  success: boolean;
  messages: string[];
}

export function DrinkDestroy({
  id,
}: DrinkDestroyProps): Promise<DrinkDestroyResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/drinks/${id}`;
  const authToken = Cookies.get("authToken");

  return axios
    .delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    });
}
