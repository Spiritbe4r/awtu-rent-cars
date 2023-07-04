import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { addressCtrl } from "@/api";
import { Modal } from "@/components/Shared";
import { AddressForm } from "../../AddressForm";
import styles from "./Address.module.scss";
import { IAddress } from "@/types";

type AddressProps = {
  address: IAddress;
  onReload: any;
};

export function Address(props: AddressProps) {
  const { address, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await addressCtrl.delete(address.id);
      onReload();
      openCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };
  // countryCode: string,
  // mainAddress: boolean,
  // city: string,
  // region: string,
  // zipCode:  string,
  return (
    <>
      <div className={styles.address}>
        <div>
          <p className={styles.title}>{address.city}</p>
          <p className={styles.addressInfo}>
            {address.city}, {address.city}, {address.region},{" "}
            {address.city}, {address.zipCode}
          </p>
        </div>

        <div className={styles.actions}>
          <Button primary icon onClick={openCloseEdit}>
            <Icon name="pencil" />
          </Button>
          <Button primary icon onClick={openCloseConfirm}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>

      <Modal.Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={onDelete}
        content={`¿Estas seguro de que quieres eliminar al dirección?`}
      />

      <Modal.Basic
        show={showEdit}
        onClose={openCloseEdit}
        title="Editar dirección"
      >
        <AddressForm
          onClose={openCloseEdit}
          onReload={onReload}
          address={address}
        />
      </Modal.Basic>
    </>
  );
}
