import * as Yup from "yup";

export function initialValues() {
  return {
    file: null,
    preview: null,
  };
}

export function validationSchema() {
  return Yup.object({
    file: Yup.string().required("El archivo es requerido"), 
  });
}
