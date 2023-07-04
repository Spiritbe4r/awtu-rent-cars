import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { addressCtrl } from "@/api";
import { initialValues, validationSchema } from "./AddressForm.form";

interface AddressFormProps {
  onClose: () => void;
  onReload: () => void;
  address?: any;
}

export function AddressForm(props: AddressFormProps) {
  const { onClose, onReload, address } = props;

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (address) {
          await addressCtrl.update(formValues, address.addId);
        } else {
          await addressCtrl.create(formValues);
        }

        formik.resetForm();
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
        name="addTitle"
        placeholder="Titulo de la dirección"
        value={formik.values.addTitle}
        onChange={formik.handleChange}
        error={formik.errors.addTitle}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="addName"
          placeholder="Nombre y apellidos"
          value={formik.values.addName}
          onChange={formik.handleChange}
          error={formik.errors.addName}
        />
        <Form.Input
          name="addAddress"
          placeholder="Dirección"
          value={formik.values.addAddress}
          onChange={formik.handleChange}
          error={formik.errors.addAddress}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="addState"
          placeholder="Provincia"
          value={formik.values.addState}
          onChange={formik.handleChange}
          error={formik.errors.addState}
        />
        <Form.Input
          name="addCity"
          placeholder="Ciudad"
          value={formik.values.addCity}
          onChange={formik.handleChange}
          error={formik.errors.addCity}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="addPostalCode"
          placeholder="Código postal"
          value={formik.values.addPostalCode}
          onChange={formik.handleChange}
          error={formik.errors.addPostalCode}
        />
        <Form.Input
          name="addPhone"
          placeholder="Teléfono"
          value={formik.values.addPhone}
          onChange={formik.handleChange}
          error={formik.errors.addPhone}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
