import { useState, useEffect } from "react";
import { addressCtrl } from "@/api";
import { Loading } from "@/components/Shared";
import styles from "./AddressDetails.module.scss";

interface AddressDetailsProps {
  addressId: string;
}

export function AddressDetails(props: AddressDetailsProps) {
  const { addressId } = props;
  const [address, setAddress] = useState<any | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await addressCtrl.getById(addressId);
        setAddress(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddress();
  }, [addressId]);

  if (!address) return <Loading text="Cargando dirección" />;

  return (
    <div className={styles.container}>
      <h4>Dirección de envío:</h4>

      <div className={styles.address}>
        <p className={styles.title}>{address.addTitle}</p>
        <p className={styles.addressInfo}>
          {address.addName}, {address.addAddress}, {address.addState},{" "}
          {address.addCity}, {address.addPostalCode}
        </p>
      </div>
    </div>
  );
}
