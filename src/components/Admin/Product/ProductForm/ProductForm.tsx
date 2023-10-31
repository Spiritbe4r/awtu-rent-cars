import React, { useState, useEffect, useContext } from "react";
import { Form } from "semantic-ui-react";
import { map } from "lodash";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { categoryCtrl, productCtrl } from "@/api";
import { Separator } from "@/components/Shared";
import { ProductFormData, initialValues, validationSchema } from "./ProductForm.form";

import MapModal from "./MapModal";
import { loadFromLocalStorage } from "@/utils/local-store.util";
import { AuthContext } from "@/contexts/AuthContext";
interface Category {
  key: any;
  value: any;
  text: any;
}


export const  ProductForm : React.FC<any> =(props: any)=> {

  const { user } = useContext(AuthContext);

  const options = [];
  for (let year = 2010; year <= 2023; year++) {
    options.push({
      key: year,
      text: year.toString(),
      value: year,
    });
  }

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 }); // Reemplaza esto con la ubicación real

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




  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          const { latitude, longitude } = position.coords;
          // Actualiza los valores de latitude y longitude en el estado del formulario
          setCurrentPosition({ lat: latitude, lng: longitude });

          formik.setValues({
            ...formik.values,
            location: {
              latitude: latitude,
              longitude: longitude
            }
          });
          // Verifica si el modal aún no está abierto
          if (!isMapModalOpen) {
            setIsMapModalOpen(true); // Abre el modal del mapa
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no es compatible en este navegador.');
    }
  };

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (product) {
          formValue.sellerId = user?.id ?? undefined;
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
    <>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="model"
          placeholder="Modelo"
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.errors.model} />
        <Form.Input
          name="description"
          placeholder="Descripcion"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description} />


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
            toolbar: "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
          }}
          initialValue={formik.values.content}
          onBlur={(event) => formik.setFieldValue("content", event.target.getContent())} />

        <Separator height={20} />
        <Form.Dropdown
          name="categoryId"
          placeholder="Categoria del Auto"
          search
          selection
          fluid
          options={categories}
          value={formik.values.categoryId ?? ''}
          error={formik.errors.categoryId}
          onChange={(_, data) => formik.setFieldValue("categoryId", data.value)} />

        {/* <Form.Group inline>
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
    </Form.Group> */}

       
        <Form.Group widths="equal">
          <Form.Input
         
            name="plate"
            placeholder="Placa Vehicular"
            value={formik.values.plate}
            onChange={formik.handleChange}
            error={formik.errors.plate} />

          <Form.Input
            type="text"
            name="color"
            placeholder="Color"
            value={formik.values.color}
            onChange={formik.handleChange}
            error={formik.errors.color} />

        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            type="number"
            name="rentPricePerDay"
            placeholder="Precio de Alquiler"
            value={formik.values.rentPricePerDay}
            onChange={formik.handleChange}
            error={formik.errors.rentPricePerDay} />
          <Form.Dropdown
            search
            selection
            fluid
            placeholder="Fecha de Compra"
            options={options}
            value={formik.values.year ?? ''}
            error={formik.errors.year}
            onChange={(_, data) => formik.setFieldValue("year", data.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Button fluid onClick={requestLocationPermission}>
            Obtener Ubicación del Auto
          </Form.Button>
        </Form.Group>

        <MapModal open={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} position={currentPosition} />

        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Enviar
        </Form.Button>
      </Form></>
  );
}

