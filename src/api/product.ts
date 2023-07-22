import { axiosClient } from "@/client";
import { ProductListResponse } from "@/types";
import { ENV, authFetch } from "@/utils";

import queryString from "query-string";

const apiClient = axiosClient();

async function getAllProducts(page = 1, pageSize = 10, search = "") {
  try {
    const filters = buildFilters(page, pageSize, search);

    const response = await apiClient.get<ProductListResponse>(`${ENV.ENDPOINTS.PRODUCT}?${filters}`);
    console.log("RESPONSE FILTER",JSON.stringify(response));

    return response;
  } catch (error) {
    throw error;
  }
}

async function createProduct(data: any) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}`;

    const response = await apiClient.post(url,data,{
      requiresToken: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(data: any, productId: string) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCT}/${productId}`;
    

    await apiClient.put(url,data,{
      requiresToken: true,
    })

   

    return true;
  } catch (error) {
    throw error;
  }
}

async function updateImage(productId: string, data: FormData) {
  try {
    const url = `${ENV.ENDPOINTS.PRODUCT}/upload/${productId}`;

    await apiClient.post<any>(url, data, {

      requiresToken: true
    });

    return true;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productId: any) {
  try {
    const url = `${ENV.ENDPOINTS.PRODUCT}/${productId}`;


    const response = await apiClient.delete(url,{
      requiresToken: true
    });


    return response;
  } catch (error) {
    throw error;
  }
}

async function getProductsByCategorySlug(categSlug: string, page = 1, pageSize = 10) {
  try {
    const categoryFilter = `categSlug=${categSlug}`;
    const paginationFilter = `page=${page}&pageSize=${pageSize}`;
    const filters = `${categoryFilter}&${paginationFilter}`;

    const url = `${ENV.ENDPOINTS.PRODUCT}/category?${filters}`;
    console.log("Filters: " + JSON.stringify(filters));

    const response = await apiClient.get<ProductListResponse>(url);

    return response;
  } catch (error) {
    throw error;
  }
}

async function getProductBySlug(slug: any) {
  try {
    const filters = `slug=${slug}`;
    const url = `${ENV.ENDPOINTS.PRODUCT}/detail?${filters}`;

    const response = await apiClient.get(url);
    console.log("PRODUCT BY SLUG", JSON.stringify(response));
    return response;
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId: string) {
  try {
    //const filters = `prodId=${productId}`;
  
    const url = `${ENV.ENDPOINTS.PRODUCT}/${productId}`;

    const response = await apiClient.get(url);
    console.log("PRODUCT BY ID", JSON.stringify(response));
    return response;
  } catch (error) {
    throw error;
  }
}

function buildFilters(page: number, pageSize: number, search: string): string {
  const filters = queryString.stringify({ page, pageSize, search });

  return filters;
}

export const productCtrl = {
  getAll: getAllProducts,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
  updateImage,
  getByCategorySlug: getProductsByCategorySlug,
  getBySlug: getProductBySlug,
  getById: getProductById,
};
