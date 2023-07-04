import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { useBasket } from "@/hooks";
import styles from "./ListProducts.module.scss";

export function ListProducts(props:any) {
  const { products } = props;
  const { changeQuantityItem, deleteItem } = useBasket();

  const options = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

      {map(products, (product) => (
        <div key={product.id} className={styles.product}>
          <Image src={(product.id)} alt={product.title} />

          <div>
            <div className={styles.info}>
              <p>{product.title}</p>
            </div>

            <div className={styles.actions}>
              <Dropdown
                className="number"
                options={options}
                selection
                compact
                value={product.quantity}
                onChange={(_, data:any) =>
                  changeQuantityItem(product.id, data.value)
                }
              />
              <span>{product.price}€</span>
              <Icon
                // name="trash alternate online"
                link
                onClick={() => deleteItem(product.prodID)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
