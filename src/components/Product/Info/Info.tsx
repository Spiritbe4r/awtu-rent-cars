import { useState } from "react";
import { Button } from "semantic-ui-react";
import { useBasket } from "@/hooks";
import styles from "./Info.module.scss";
import { IProduct } from "@/types";
import DropdownOpts from "../Dropdown/DropdownOpts";
import { Separator } from "@/components/Shared";

export function Info(props:{product: IProduct}) {
  const { product } = props;
  const [loading, setLoading] = useState(false);
  const { addBasket } = useBasket();

  const addBasketWrapper = () => {
    setLoading(true);
    addBasket(product?.id);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product?.title}</h1>
      <span className={styles.stock}>
        {`Quedan ${product?.stock} unidade/s`}
      </span>
      <span className={styles.price}>{product?.price} S/.</span>

      <Button
        primary
        className={styles.btnBuy}
        onClick={addBasketWrapper}
        loading={loading}
      >
        Añadir a la Bolsa
      </Button>
      <Separator height="40px"></Separator>
      <DropdownOpts/>
    </div>
  );
}
