import * as Yup from "yup";

export function initialValues(data: any) {
  return {
    addTitle: data?.addTitle || "",
    addName: data?.addName || "",
    addAddress: data?.addAddress || "",
    addCity: data?.addCity || "",
    addState: data?.addState || "",
    addPostalCode: data?.addPostalCode || "",
    addPhone: data?.addPhone || "",
  };
}

export function validationSchema() {
  return Yup.object({
    addTitle: Yup.string().required("Title is required"),
    addName: Yup.string().required("Name is required"),
    addAddress: Yup.string().required("Address is required"),
    addCity: Yup.string().required("City is required"),
    addState: Yup.string().required("State is required"),
    addPostalCode: Yup.string().required("Postal code is required"),
    addPhone: Yup.number().required("Phone number is required"),
  });
}
