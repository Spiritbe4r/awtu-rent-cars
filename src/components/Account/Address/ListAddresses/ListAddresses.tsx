import { useState, useEffect } from "react";
import { size, map } from "lodash";
import { addressCtrl } from "@/api";
import { Loading, NoResult } from "@/components/Shared";
import { Address } from "./Address";
import styles from "./ListAddresses.module.scss";
import { IAddress } from "@/types";

export function ListAddresses(props:any) {
  const { reload, onReload } = props;
  const [addresses, setAddresses] = useState<IAddress[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll();
        console.log("responsegetAll",JSON.stringify(response));
        setAddresses(response);
        return response;
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }, [reload]);

  if (!addresses) {
    return <Loading text="Cargando direcciones" top={100} />;
  }

  return (
    <div>
    {addresses?.length === 0 && <NoResult text="Crea tu primera dirección" />}

    {addresses?.map((address: IAddress) => (
      <Address key={address.id} address={address} onReload={onReload} />
    ))}
  </div>
  );
}
