import axios from "axios";
import Cookies from "js-cookie";

export interface UserMySetResponse {
  success: boolean;
  mySet: {
    name: string;
    isLacking: boolean;
    imageUrl: string | null;
    items: Array<{
      drinkName: string;
      bottleCount: number;
    }>;
  };
}

export async function UserMySet(): Promise<UserMySetResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/my-set`;
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
