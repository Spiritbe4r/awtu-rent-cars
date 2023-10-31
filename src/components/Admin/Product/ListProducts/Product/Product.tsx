import { useState, useEffect } from "react";
import { Icon, Image, Table } from "semantic-ui-react";
import { Modal } from "@/components/Shared";
import { ProductForm } from "../../ProductForm";
import { ProductImageForm } from "../../ProductImageForm";
import styles from "./Product.module.scss";
import { productCtrl } from "@/api";

const NOT_FOUND_IMAGE = "/images/not-found.jpg";

export function Product(props:any) {
  const { product, onReload } = props;
  const [image, setImage] = useState(NOT_FOUND_IMAGE);
  const [showConfirm, setShowConfirm] = useState<any | null>(false);
  const [openModal, setOpenModal] = useState<any | null>(false);
  const [modalContent, setModalContent] = useState<null | JSX.Element>(null);

  useEffect(() => {
    const imageUrl = product.images[0]?.url || NOT_FOUND_IMAGE;
    setImage(imageUrl);
  }, [product]);

  const onOpenCloseConfirm = () => setShowConfirm((prevState:any) => !prevState);

  const onDelete = async () => {
    try {
      await productCtrl.delete(product.id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalContent(null);
  };

  const openEditProduct = () => {
    setModalContent(
       <ProductForm onClose={closeModal} onReload={onReload} product={product} />
    );
    setOpenModal(true);
  };

  const openEditImageProduct = () => {
    setModalContent(
      <ProductImageForm
        onClose={closeModal}
        onReload={onReload}
        productId={product.id}
      />
    );
    setOpenModal(true);
  };

  return (
    <>
      <Table.Cell>{product.id}</Table.Cell>
      <Table.Cell>
        <Image className={styles.image} src={image} alt={product.model} />
      </Table.Cell>
      <Table.Cell>{product.model}</Table.Cell>
      <Table.Cell> S/.{product.rentPricePerDay}</Table.Cell>
      <Table.Cell>{product.year}</Table.Cell>
      <Table.Cell>{product.color}</Table.Cell>
      <Table.Cell className={styles.actions}>
        <Icon name="pencil" link onClick={openEditProduct} />
        <Icon name="image" link onClick={openEditImageProduct} />
        <Icon name="trash" link onClick={onOpenCloseConfirm} />
      </Table.Cell>

      <Modal.Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Estas seguro de eliminar el producto (${product.model})?`}
      />

      <Modal.Basic
        show={openModal}
        onClose={closeModal}
        title={`Editar (${product.model})`}
      >
        {modalContent}
      </Modal.Basic>
    </>
  );
}
