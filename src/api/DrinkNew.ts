import axios from "axios";
import Cookies from "js-cookie";

export interface DrinkNewResponse {
  success: boolean;
  imageUrls: string[];
}

export async function DrinkNew(): Promise<DrinkNewResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/drinks/new`;
  const authToken = Cookies.get("authToken");

  return await axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    });
}
