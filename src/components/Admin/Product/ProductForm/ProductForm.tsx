import { useState, useEffect } from "react";
import { Form, Label, Radio } from "semantic-ui-react";
import { map } from "lodash";
import { Editor } from "@tinymce/tinymce-react";
import { Field, useField, useFormik } from "formik";
import { categoryCtrl, productCtrl } from "@/api";
import { Separator } from "@/components/Shared";
import { initialValues, validationSchema } from "./ProductForm.form";
interface Category {
  key: any;
  value: any;
  text: any;
}

export function ProductForm(props: any) {
  const { onClose, onReload, product } = props;
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
        const result = map(response, (item: any) => ({
          key: item.id,
          value: item.id,
          text: item.name,
        }));
        setCategories(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (product) {
          await productCtrl.update(formValue, product.id);
        } else {
          await productCtrl.create(formValue);
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
        name="title"
        placeholder="Nombre"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        name="description"
        placeholder="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
      />

      <Editor
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
        initialValue={formik.values.content}
        onBlur={(event) =>
          formik.setFieldValue("content", event.target.getContent())
        }
      />

      <Separator height={20} />
      <Form.Dropdown
        name="category"
        placeholder="Categoria del producto"
        search
        selection
        fluid
        options={categories}
        value={formik.values.category ?? ''}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
      />

<Form.Group inline>
    <div className={`radio-wrapper ${formik.values.status === 'PUBLISH' ? 'active' : ''}`}>
      <Form.Radio
        label="Publicado"
        name="status"
        value="PUBLISH"
        checked={formik.values.status === 'PUBLISH'}
        onChange={() => formik.setFieldValue('status', 'PUBLISH')}
        error={formik.errors.status}
        className={`${formik.errors.status ? 'error' : ''}`}
      />
      
    </div>
    <div className={`radio-wrapper ${formik.values.status === 'DRAFT' ? 'active' : ''}`}>
      <Form.Radio
        label="Borrador"
        name="status"
        value="DRAFT"
        checked={formik.values.status === 'DRAFT'}
        onChange={() => formik.setFieldValue('status', 'DRAFT')}
        error={formik.errors.status}
        className={`${formik.errors.status ? 'error' : ''}`}
      />
     
    </div>
  </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          type="number"
          name="price"
          placeholder="Precio"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
        <Form.Input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          error={formik.errors.stock}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
