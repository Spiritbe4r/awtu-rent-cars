import { IProduct } from "./Product";

export interface ProductListResponse {
    content: IProduct[];
    totalElements: number;
  }