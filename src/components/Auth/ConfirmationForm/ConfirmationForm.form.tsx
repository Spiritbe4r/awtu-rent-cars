import * as Yup from "yup";

interface FormValues {
  email: string;
  code: string;
}

export function initialValues(): FormValues {
  return {
    email: "",
    code: "",
  };
}

export function validationSchema(): Yup.ObjectSchema<FormValues> {
  return Yup.object({
    email: Yup.string().email().required(),
    code: Yup.string().required(),
  });
}
