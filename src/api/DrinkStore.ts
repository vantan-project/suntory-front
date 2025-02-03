import axios from "axios";
import Cookies from "js-cookie";

export interface DrinkStoreProps {
  drink: {
    name: string;
    imageData: File;
    categoryId: number;
  };
}

export interface DrinkStoreResponse {
  success: boolean;
  messages: string[];
}

export async function DrinkStore({
  drink,
}: DrinkStoreProps): Promise<DrinkStoreResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/drinks`;
  const authToken = Cookies.get("authToken");

  const formData = new FormData();
  formData.append("drink[imageData]", drink.imageData);

  return await axios
    .post(
      apiUrl,
      {
        drink: {
          ...drink,
          imageData: formData.get("drink[imageData]"),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
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
