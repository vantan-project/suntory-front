import axios from "axios";
import Cookies from "js-cookie";

export interface SettingMySetProps {
  mySetId: number;
}

export interface SettingMySetResponse {
  success: boolean;
  messages: string[];
}

export async function SettingMySet({
  mySetId,
}: SettingMySetProps): Promise<SettingMySetResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/settings/my-set`;
  const authToken = Cookies.get("authToken");

  return await axios
    .patch(
      apiUrl,
      { mySetId: mySetId },
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
