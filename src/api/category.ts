import { axiosClient } from "@/client";
import { ENV } from "@/utils";



const httpClient = axiosClient();

const categoryBaseUrl = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORY}`;

async function getAllCategories() {
  try {

    const response = await httpClient.get<any>(categoryBaseUrl);
   

    return response;
  } catch (error) {
    throw error;
  }
}

async function createCategory(data:any) {
  try {

    const response = await httpClient.post<any>(categoryBaseUrl,data);

    return response;
  } catch (error) {
    throw error;
  }
}

async function updateCategory(data:any, categoryId:any) {
  try {
    console.log("data: ", JSON.stringify(data));
    const url = `${categoryBaseUrl}/${categoryId}`;
    const response = await httpClient.put<any>(url,data,{
      requiresToken: true
    });

    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteCategory(categoryId:any) {
  try {
    const url = `${categoryBaseUrl}/${categoryId}`;
    const response = await httpClient.delete<any>(url,{
      requiresToken: true
    })

    return response;
  } catch (error) {
    throw error;
  }
}

export const categoryCtrl = {
  getAll: getAllCategories,
  create: createCategory,
  update: updateCategory,
  delete: deleteCategory,
};
