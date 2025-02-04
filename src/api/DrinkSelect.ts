import axios from "axios";
import Cookies from "js-cookie";

export interface DrinkSelectProps {
  search: {
    name: string;
    categoryId: number | null;
  };
}

export interface DrinkSelectResponse {
  success: boolean;
  drinks: Array<{
    id: number;
    name: string;
    imageUrl: string;
  }>;
}

export async function DrinkSelect({
  search,
}: DrinkSelectProps): Promise<DrinkSelectResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/drinks/select`;
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
