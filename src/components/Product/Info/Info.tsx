import { useState } from "react";
import { Button, Header, Segment, TextArea } from "semantic-ui-react";
import { useBasket } from "@/hooks";
import styles from "./Info.module.scss";
import { IProduct } from "@/types";
import DropdownOpts from "../Dropdown/DropdownOpts";
import { Separator } from "@/components/Shared";

export function Info(props: { product: IProduct }) {
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
    <Segment className={styles.productDetail}>
      <Header as="h1" className={styles.model}>
        {product?.model}
      </Header>
      <p className={styles.year}>{`Comprado el Año ${product?.year}`}</p>

      <p className={styles.price}>{`Alquiler Mensual S/. ${product?.rentPricePerDay}`}</p>


      <Separator height="10px"></Separator>
      <span className={styles.description}>{product.description}</span>

      <Separator height="30px"></Separator>
      <DropdownOpts />

      <Separator height="30px"></Separator>
      <Button
        primary
        fluid
        className={styles.btnBuy}
        onClick={addBasketWrapper}
        loading={loading}
      >
        Añadir a la Bolsa
      </Button>
    </Segment>
  );
}
