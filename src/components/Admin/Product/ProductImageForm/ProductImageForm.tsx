import React, { useState, useCallback } from "react";
import { Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { productCtrl } from "@/api";
import { initialValues, validationSchema } from "./ProductImageForm.form";
import styles from "./ProductImageForm.module.scss";

export function ProductImageForm(props: any) {
  const { onClose, onReload, productId } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue: any) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", formValue.file);

        await productCtrl.updateImage(productId, formData);

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("file", file);
    formik.setFieldValue("preview", URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpg': ['.jpg'],
      'image/jpeg': ['jpeg'],
    },
    onDrop,
  });

  const getMiniature = () => {
    if (formik.values.file) {
      return formik.values.preview;
    }
    return null;
  };

  return (
    <div>
      <div className={styles.imageContainer} {...getRootProps()}>
        <input {...getInputProps()} />

        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra la nueva imagen</span>
          </div>
        )}
      </div>


      <Button primary fluid onClick={() => formik.handleSubmit()} loading={loading}>
        Enviar
      </Button>

    </div>
  );
}
