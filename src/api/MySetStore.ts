import axios from "axios";
import Cookies from "js-cookie";

export interface MySetStoreProps {
  mySet: {
    name: string;
    items: Array<{
      drinkId: number;
      bottleCount: number;
    }>;
  };
  quantity: number;
}

export interface MySetStoreResponse {
  success: boolean;
  messages: string[];
}

export async function MySetStore({
  mySet,
  quantity,
}: MySetStoreProps): Promise<MySetStoreResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/my-sets`;
  const authToken = Cookies.get("authToken");

  return await axios
    .post(
      apiUrl,
      {
        mySet: mySet,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.warn(error);
      return {
        success: false,
        messages: error.response?.data.messages || ["エラーが発生しました"],
      };
    });
}
