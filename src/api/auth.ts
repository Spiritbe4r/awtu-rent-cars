
import { requestUtil } from "@/utils/request";
import { ENV } from "@/utils";
import { useTokenFromStorage } from "@/hooks";
import { IAuthResponse } from "@/types/AuthResponse";
import { deleteFromLocalStorage, saveToLocalStorage } from "@/utils/local-store.util";



async function register(data: any) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH}/register`;

    await requestUtil.apiRequest(url, {
      method: "POST",
      body: data,
    });

    return true;

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

async function resendCode(email: string) {
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH}/otp-resend?email=${email}`;

  return await requestUtil.withErrorHandling<boolean>(async () => {
    return await requestUtil.apiRequest(url);

  });
}

async function confirmation(data: any) {

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH}/check-code`;
  return await requestUtil.withErrorHandling<boolean>(async () => {
    await requestUtil.apiRequest(url, {
      method: "POST",
      body: data,
    });

    return true;

  });
}

async function login(data: any) {

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH}/login`;
  return await requestUtil.withErrorHandling<boolean>(async () => {
    const resp = await requestUtil.apiRequest<IAuthResponse>(url, {
      method: "POST",
      body: data,
    });

    saveToLocalStorage("token", resp.authToken)
    saveToLocalStorage("user", resp.payload)
    return true;

  });
}


async function retriveSession() {
  try {
    const sessionAuthToken = useTokenFromStorage()
    return sessionAuthToken;
  } catch (error) {
    throw error;
  }
}

async function logout() {
  try {

    deleteFromLocalStorage(true);

  } catch (error) {
    throw error;
  }
}

export const authCtrl = {
  register,
  resendCode,
  confirmation,
  login,
  retriveSession,
  logout,
};