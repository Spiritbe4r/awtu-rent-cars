
import { requestUtil } from "@/utils/request";
import { ENV } from "@/utils";
import { useTokenFromStorage } from "@/hooks";



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

async function resendCode(data: any) {
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH}/otp-resend?email=${data.email}`;

  return await requestUtil.withErrorHandling<boolean>(async () => {
    await requestUtil.apiRequest(url);

    return true;
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
    const resp = await requestUtil.apiRequest(url, {
      method: "POST",
      body: data,
    });
    localStorage.setItem("token", resp.accessToken)

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
    
    // await Auth.signOut();
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