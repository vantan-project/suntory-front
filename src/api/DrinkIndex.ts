import axios from "axios";
import Cookies from "js-cookie";

export interface DrinkIndexProps {
  search: {
    name: string;
    categoryId: number | null;
  };
}

export interface DrinkIndexResponse {
  success: boolean;
  drinks: Array<{
    categoryId: number;
    categoryName: string;
    items: Array<{
      id: number;
      name: string;
      imageUrl: string;
    }>;
  }>;
}

export async function DrinkIndex({
  search,
}: DrinkIndexProps): Promise<DrinkIndexResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/drinks`;
  const authToken = Cookies.get("authToken");

  return await axios
    .get(apiUrl, {
      params: {
        search: search,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    });
}
