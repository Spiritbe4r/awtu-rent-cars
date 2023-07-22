import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { addressCtrl } from "@/api";
import { initialValues, validationSchema } from "./AddressForm.form";
import { IAddress } from "@/types";

interface AddressFormProps {
  onClose: () => void;
  onReload: () => void;
  address?: IAddress;
}

export function AddressForm(props: AddressFormProps) {
  const { onClose, onReload, address } = props;

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues:IAddress) => {
      try {
        if (address) {
          await addressCtrl.update(formValues, address.id);
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
        name="title"
        placeholder="Titulo de la dirección"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          placeholder="Nombre y apellidos"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          name="content"
          placeholder="Dirección"
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.errors.content}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="state"
          placeholder="Provincia"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.errors.state}
        />
        <Form.Input
          name="city"
          placeholder="Ciudad"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.errors.city}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          placeholder="Código postal"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          placeholder="Teléfono"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
