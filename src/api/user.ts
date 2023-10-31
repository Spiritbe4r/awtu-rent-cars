
import { axiosClient } from "@/client";
import { IAuthResponse } from "@/types/AuthResponse";
import { UserResponse } from "@/types/user.response";
import { ENV } from "@/utils/constants";
import { AxiosRequestConfig } from "axios";
import queryString from "query-string";



const apiClient = axiosClient();
async function me() {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/me`;

    const response = await apiClient.get<UserResponse>(url, {
      requiresToken: true
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getAll(page = 1) {
  try {
    const filters = buildFilters(page);
    const url = `${ENV.ENDPOINTS.USERS}?${filters}`;

    const response = await apiClient.get<any>(url, {
      requiresToken: true
    })



    return response;
  } catch (error) {
    throw error;
  }
}

async function updateMe(data: any) {

  try {

    const url = `${ENV.ENDPOINTS.USERS}/profile`;

    const response = await apiClient.put<any>(url, data, {
      requiresToken: true
    })

    return response;
  } catch (error) {
    throw error;
  }
}
async function updateAvatar( data: FormData) {

  const url = `${ENV.ENDPOINTS.USERS}/upload`;

  await apiClient.post<any>(url, data, {

    requiresToken: true
  });

}
function buildFilters(page: number): string {
  const filters = queryString.stringify({ page });

  return filters;
}

export const userCtrl = {
  me,
  getAll,
  updateMe,
  updateAvatar
};
