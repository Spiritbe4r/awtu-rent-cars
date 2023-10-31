import { IGallery } from "./gallery";
import { IVariety } from "./varieties";

export interface IProduct {
    id: string;
    model: string;
    slug: string;
    images: IGallery[];
    brand: string | null;
    mainImage: IGallery;
    rentPricePerDay: number;
    description: string;
    content: string;
    year: number;

    categoryId: string;
    status: string;
    quantity: number;
}
