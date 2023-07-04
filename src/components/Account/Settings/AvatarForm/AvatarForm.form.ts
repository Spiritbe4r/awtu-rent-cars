import * as Yup from "yup";

interface InitialValues {
  file: null | File;
  preview: null | string;
}

export function initialValues(): InitialValues {
  return {
    file: null,
    preview: null,
  };
}

export function validationSchema(): Yup.ObjectSchema<InitialValues> {
  return Yup.object({
    file: Yup.mixed<File>().required("File is required"),
    preview: Yup.string().nullable(),
  }) as Yup.ObjectSchema<InitialValues>;
}

