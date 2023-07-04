import { authCtrl } from "@/api";
import { useTokenFromStorage } from "@/hooks";

export async function authFetch(url:any, params?:any) {
  const token = await useTokenFromStorage();
  console.log('Fetching token', token);

  const logout = () => {
    authCtrl.logout();
    window.location.replace("/");
  };

  if (!token) {
    logout();
  } else {
    const paramsTemp = {
      ...params,
      headers: {
        ...params?.headers,
        Authorization: token,
      },
    };

    try {
      return await fetch(url, paramsTemp);
    } catch (error) {
      throw error;
    }
  }
}
