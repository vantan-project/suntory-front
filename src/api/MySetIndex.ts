import axios from "axios";
import Cookies from "js-cookie";

export interface MySetIndexResponse {
  success: boolean;
  mySets: Array<{
    id: number;
    name: string;
    isLacking: boolean;
    imageUrl: string | null;
    items: Array<{
      drinkId: number;
      drinkName: string;
      imageUrl: string;
      bottleCount: number;
    }>;
  }>;
}

export async function MySetIndex(): Promise<MySetIndexResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/my-sets`;
  const authToken = Cookies.get("authToken");

  return await axios
    .get<MySetIndexResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    });
}
