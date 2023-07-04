import * as Yup from "yup";

interface ProductData {
  title: string;
  description: string;
  price: number;
  stock: number;
  content: string;
  category: string | null;
  status: string,
}

export function initialValues(data?: ProductData) {
  return {
    title: data?.title ?? "",
    description: data?.description ?? "",
    price: data?.price ?? "",
    stock: data?.stock ?? "",
    content: data?.content?? "",
    category: data?.category ?? null,
    status: data?.status ?? "PUBLISH",
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required("El título del producto es obligatorio"),
    description: Yup.string().required("La descripción del producto es obligatoria"),
    price: Yup.number().required("El precio del producto es obligatorio"),
    stock: Yup.number().required("El stock del producto es obligatorio"),
    content: Yup.string().required("El contenido del Producto es obligatoria"),
    category: Yup.string().required("El ID de la categoría del producto es obligatorio"),
  });
}