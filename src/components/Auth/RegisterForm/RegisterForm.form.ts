import * as Yup from "yup";

export interface FormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
}

const usernameValidation = Yup.string().required("Username is required");
const emailValidation = Yup.string().email("Invalid email").required("Email is required");
const passwordValidation = Yup.string().required("Password is required");
const repeatPasswordValidation = Yup.string()
  .required("Repeat Password is required")
  .oneOf([Yup.ref("password")], "Passwords must match");

export const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  repeatPassword: repeatPasswordValidation,
  role: Yup.string().required("Role is required"),
});

export const initialValues: FormValues = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  role: "ROLE_CLIENT",
};
