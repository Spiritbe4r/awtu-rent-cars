import { Button, Form, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import styles from "./RegisterForm.module.scss";
import { toast } from "react-toastify";
import { authCtrl } from "@/api";

export function RegisterForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const registerData = {
          username: formValue.username,
          email: formValue.email,
          password: formValue.password,
          role: "ROLE_CLIENT"
        };
        await authCtrl.register(registerData);
        router.push(`/join/confirmation?email=${formValue.email}`);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again later.");
      }
    },
  });

  return (
    <>
    <div className={styles.registrationForm}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input  icon='user' iconPosition='left'
          name="username"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />

        <Form.Input iconPosition='left' icon='at' name="email"
          placeholder="Correo electronico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}>
         
        </Form.Input>
        <Form.Input
         icon='lock'
         iconPosition='left'
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Form.Input
         icon='lock'
         iconPosition='left'
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword}
        />
        <Form.Button type="submit" color='teal' fluid loading={formik.isSubmitting}>
          Crear cuenta
        </Form.Button>
      </Form>

      <p className={styles.login}>Ya tengo una cuenta</p>
      <Button as={Link} href="/join/login" fluid basic>
        Iniciar sesión
      </Button>
      </div>
    </>
  );
}
