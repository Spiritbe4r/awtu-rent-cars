import { useState, useEffect, useCallback, FC } from "react";
import { Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./AvatarForm.form";
import styles from "./AvatarForm.module.scss";
import { userCtrl } from "@/api";

interface FormDataValues {
  file: File | null;
  preview: string | null;
}



export const AvatarForm: FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  console.log("USER STATE: " ,JSON.stringify(user));

  const formik = useFormik<FormDataValues>({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        setLoading(true);
        const formData = new FormData();
        if (formValues.file) {
          formData.append("file", formValues.file);
        }

          await userCtrl.updateAvatar( formData);
          setLoading(false);
        
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (formik.values.file) {
      setAvatar(formik.values.preview);
    } else {
      const imageUrl = user?.profileImage?.url ?? "";
      setAvatar(imageUrl)
    }
  }, [formik.values.file]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
  

  return (
    <div>
      <div className={styles.imageContainer} {...getRootProps()}>
        <input {...getInputProps()} />
        {avatar ? (
          <Image size="small" src={avatar} />
        ) : (
          <div>
            <span>Arrastra la imagen</span>
          </div>
        )}
      </div>

      <Button primary loading={loading} onClick={() => formik.handleSubmit()}>
        Enviar
  
      </Button>
    </div>
  );
}
