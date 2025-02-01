import axios, { AxiosError } from "axios";

export interface AuthSignUpProps {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

export interface AuthSignUpSuccessResponse {
  success: true;
  authToken: string;
}

export interface AuthSignUpErrorResponse {
  success: false;
  messages: string[];
}

export async function AuthSignUp({
  user,
}: AuthSignUpProps): Promise<AuthSignUpSuccessResponse | AuthSignUpErrorResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`;

  return await axios
    .post<AuthSignUpSuccessResponse | AuthSignUpErrorResponse>(api_url, {
      user: user,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error: AxiosError<AuthSignUpErrorResponse>) => {
      console.log(error);
      return {
        success: false,
        messages: error.response?.data.messages || ["エラーが発生しました"],
      };
    });
}
