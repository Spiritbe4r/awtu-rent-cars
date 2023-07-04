import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { categoryCtrl } from "@/api";
import { initialValues, validationSchema } from "./CategoryForm.form";

export function CategoryForm(props:any) {
  const { onClose, onReload, category } = props;

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) {
          await categoryCtrl.update(formValue, category.id);
        } else {
          await categoryCtrl.create(formValue);
        }
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        placeholder="Nombre de la categoria"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="path"
        placeholder="Slug de la categoria"
        value={formik.values.path}
        onChange={formik.handleChange}
        error={formik.errors.path}
      />

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
