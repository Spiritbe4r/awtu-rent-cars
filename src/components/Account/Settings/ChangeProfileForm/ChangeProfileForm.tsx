import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { userCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./ChangeProfileForm.form";

export function ChangeNameForm() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(formValue);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>Cambiar Mis datos Personales</label>

      <Form.Input
        name="name"
        placeholder="Nombre"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastName"
        placeholder="Apellidos"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.errors.lastName}
      />
      <Form.Input
        name="username"
        placeholder="Usuario"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        placeholder="Correo Electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />



      <Form.Button type="submit" loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
