import { IGallery } from "./gallery";
import { IVariety } from "./varieties";

export interface IProduct {
    id: string;
    title: string;
    slug: string;
    gallery: IGallery[];
    brand: string | null;
    mainImage: IGallery;
    price: number;
    description: string;
    content: string;
    stock: number;
    varieties: IVariety[];
    category: string;
    status: string;
    nsales: number;
    npoints: number;
    quantity: number;
}
