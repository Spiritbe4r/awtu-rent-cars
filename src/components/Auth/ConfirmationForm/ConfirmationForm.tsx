import { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { authCtrl } from "@/api";
import { Separator } from "@/components/Shared";
import { initialValues, validationSchema } from "./ConfirmationForm.form";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  code: string;
}

export function ConfirmationForm() {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    formik.setFieldValue("email", query.email as string);
  }, [query]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue: FormValues) => {
      try {
        const request = {
          email: formValue.email,
          code: formValue.code,
        };
        console.log('se hizo la peticion');
        await authCtrl.confirmation(request);
        router.push("/join/login");
      } catch (error) {
        console.log('entro al catch');
        toast('There is an error when attempting to confirm the OTP code.', { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'bottom-right' });
        console.error(error);
      }
    },
  });

  const onResendCode = async () => {
    formik.setFieldError("email", "");

    if (!formik.values.email) {
      formik.setFieldError("email", "Email is required");
      return;
    }
    setLoading(true);
    console.log("Email", formik.values.email)
    await authCtrl.resendCode(formik.values.email);
    setLoading(false);
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email as string}
        />
        <Form.Input
          name="code"
          placeholder="Codigo de confirmación"
          values={formik.values.code}
          onChange={formik.handleChange}
          error={formik.errors.code as string}
        />
        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Activar usuario
        </Form.Button>
      </Form>

      <Separator height={50} />

      <Button fluid basic onClick={onResendCode} loading={loading}>
        Reenviar codigo de verificaión
      </Button>
    </>
  );
}
