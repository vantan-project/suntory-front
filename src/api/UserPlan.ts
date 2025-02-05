import axios from "axios";
import Cookies from "js-cookie";

export interface UserPlanResponse {
  success: boolean;
  plan: {
    customerId: string;
    quantity: number;
    amount: number;
  } | null;
}

export async function UserPlan(): Promise<UserPlanResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users/plan`;
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
