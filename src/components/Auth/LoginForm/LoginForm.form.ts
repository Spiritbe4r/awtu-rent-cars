import * as Yup from 'yup';

interface LoginSchema {
  email: string;
  password: string;
}
export const initialValues: LoginSchema = {

  email: "",
  password: ""

};

export function validationSchema(): Yup.ObjectSchema<LoginSchema> {
  return Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
}

