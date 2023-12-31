import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import { map, size } from "lodash";
import classNames from "classnames";
import { addressCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { Loading, NoResult } from "@/components/Shared";
import styles from "./Addresses.module.scss";
import {IAddress} from "@/types";

export function Addresses(props:any) {
  const { address, setAddress } = props;
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll();
        setAddresses(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  return (
    <div className={styles.addresses}>
      <h2>Dirección de envio</h2>

      {!addresses && <Loading text="Cargando direcciones" />}

      {addresses && size(addresses) === 0 && (
        <div className={styles.noAddresses}>
          <NoResult text="No tienes ninguna dirección creada" />
          <Button as={Link} href="/account" primary>
            Crear dirección
          </Button>
        </div>
      )}

      {map(addresses, (item:any) => (
        <div
          key={item.id}
          onClick={() => setAddress(item)}
          className={classNames(styles.address, {
            [styles.selected]: item.id === address?.id,
          })}
        >
          <div>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.addressInfo}>
              {item.name}, {item.content}, {item.state}, {item.city}
              , {item.postalCode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
