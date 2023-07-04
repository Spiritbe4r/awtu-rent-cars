import { useState, useEffect } from "react";
import { size, map } from "lodash";
import { addressCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { Address } from "./Address";
import styles from "./ListAddresses.module.scss";

export function ListAddresses(props:any) {
  const { reload, onReload } = props;
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll();
        setAddresses(response);
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }, [reload]);

  if (!addresses) {
    return <Loading text="Cargando direcciones" top={100} />;
  }

  return (
    <div className={styles.addresses}>
      {size(addresses) === 0 && <NoResult text="Crea tu primera dirección" />}

      {map(addresses, (address:any) => (
        <Address key={address.id} address={address} onReload={onReload} />
      ))}
    </div>
  );
}
