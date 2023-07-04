import * as Yup from "yup";

interface changeNameSchema {
  name: string,
  lastName: string,
  username: string,
  email: string

}
export const initialValues = (data: any) => {

  return {
    name: data?.name ?? "",
    lastName: data?.lastName ?? "",
    username: data?.username ?? "",
    email: data?.email ?? "",
  
  }

};

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
  });
}
