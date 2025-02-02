import axios from "axios";
import Cookies from "js-cookie";

export interface MasterCategoryResponse {
  success: boolean;
  categories: Array<{
    id: number;
    name: string;
  }>;
}

export async function MasterCategory(): Promise<MasterCategoryResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/master/category`;
  const authToken = Cookies.get("authToken");

  return await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    return response.data;
  });
}
