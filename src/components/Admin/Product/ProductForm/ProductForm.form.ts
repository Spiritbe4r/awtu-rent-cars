import * as Yup from "yup";

export interface ProductFormData {
  model: string;
  description: string;
  rentPricePerDay: number;
  content: string;
  plate: string;
  brand: string;
  year: number;
  color: string;
  categoryId: string | null;
  status: string;
  sellerId?: string;
  location: any;
}


export function initialValues(data: ProductFormData) {
  return {
    model: data?.model ?? "",
    description: data?.description ?? "",
    rentPricePerDay: data?.rentPricePerDay ?? "",
    color: data?.color ?? "",
    content: data?.content ?? "",
    plate: data?.plate ?? "",
    year: data?.year ?? "",
    categoryId: data?.categoryId ?? null,
    status: "PUBLISH",
    sellerId: data?.sellerId,
    location: data?.location ?? {
      latitude: 0,
      longitude: 0
    },

  };
}

export function validationSchema() {
  return Yup.object({
    model: Yup.string().required("El Modelo del Auto es obligatorio"),
    description: Yup.string().required("La descripción del Auto es obligatoria"),
    rentPricePerDay: Yup.number().required("El precio del Auto es obligatorio"),
    plate: Yup.string().required("La placa del Auto es obligatorio"),
    content: Yup.string().required("El contenido del Producto es obligatoria"),
    categoryId: Yup.string().required("El ID de la categoría del producto es obligatorio"),
  });
}