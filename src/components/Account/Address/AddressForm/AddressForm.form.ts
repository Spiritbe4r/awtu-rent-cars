import { IAddress } from "@/types";
import * as Yup from "yup";

export const initialValues = (data?: IAddress) => {
  return {
    title: data?.title ?? "",
    name: data?.name ?? "",
    content: data?.content ?? "",
    city: data?.city ?? "",
    state: data?.state ?? "",
    postalCode: data?.postalCode ?? "",
    phone: data?.phone ?? "",
    userId: data?.userId ?? "",
  };
}

export const validationSchema = () => {
  return Yup.object({
    title: Yup.string().required("Title is required"),
    name: Yup.string().required("Name is required"),
    content: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal code is required"),
    phone: Yup.number().required("Phone number is required"),
  });
}
