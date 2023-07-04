import { axiosClient } from "@/client";
import { ENV, authFetch } from "@/utils";
import queryString from "query-string";

const httpClient = axiosClient(`${ENV.API_URL}`);

const getAllAddresses = async (): Promise<any> => {
  const url: string = `${ENV.ENDPOINTS.ADDRESS}`;

  const resp = await httpClient.get<any>(url, {
    requiresToken: true,
  });
  return resp;
}

const createAddress = async (data: any) => {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await authFetch(url, params);

    if (response?.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

const updateAddress = async (data: any, addressId: any) => {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await authFetch(url, params);

    if (response?.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

const deleteAddress = async (addressId: any) => {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
    const params = { method: "DELETE" };

    const response = await authFetch(url, params);

    if (response?.status !== 200) throw response;

    return true;
  } catch (error) {
    throw error;
  }
}

const getAddressById = async (addId: string) => {
  try {
    const filters= queryString.stringify({addId});
    console.log("filters", filters);
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?${filters}`;

    const response = await httpClient.delete<any>(url, {
      requiresToken: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const addressCtrl = {
  getAll: getAllAddresses,
  create: createAddress,
  update: updateAddress,
  delete: deleteAddress,
  getById: getAddressById,
};
