import axios from "axios";
import Cookies from "js-cookie";

export interface SettingPlanProps {
  planId: number;
}

export interface SettingPlanResponse {
  success: boolean;
  messages: string[];
}

export async function SettingPlan({
  planId,
}: SettingPlanProps): Promise<SettingPlanResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/settings/plan`;
  const authToken = Cookies.get("authToken");

  return await axios
    .patch(
      apiUrl,
      { planId: planId },
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
