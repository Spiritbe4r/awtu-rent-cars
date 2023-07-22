import {axiosClient} from "@/client";
import {IAddress} from "@/types";
import {ENV} from "@/utils";
import queryString from "query-string";

const httpClient = axiosClient(`${ENV.API_URL}`);

const getAllAddresses = async (): Promise<IAddress[]> => {
  const url: string = `${ENV.ENDPOINTS.ADDRESS}/user`;

  return await httpClient.get<any>(url, {
    requiresToken: true,
  });
}

const createAddress = async (data: any) => {
  const url = `${ENV.ENDPOINTS.ADDRESS}`;
  return await httpClient.post<any>(url, data, {
    requiresToken: true,
  });
}

const updateAddress = async (data: any, addressId: any) => {
  const url = `${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
  return await httpClient.put<any>(url, data, {
    requiresToken: true,
  });
}

const deleteAddress = async (addressId: any) => {
  const url = `${ENV.ENDPOINTS.ADDRESS}/${addressId}`;
  return await httpClient.delete<any>(url, {
    requiresToken: true,
  });
}

const getAddressById = async (addId: string) => {
  try {
    const filters= queryString.stringify({addId});
    console.log("filters", filters);
    const url = `${ENV.ENDPOINTS.ADDRESS}?${filters}`;

    return await httpClient.get<any>(url, {
      requiresToken: true,
    });
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
