import * as Yup from "yup";

export function initialValues(data:any) {
  return {
    name: data?.name || "",
    path: data?.path || "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El name de la categoria es obligatorio"),
    path: Yup.string().required("El path de la categoria es obligatorio"),
  });
}


