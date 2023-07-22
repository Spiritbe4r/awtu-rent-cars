import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { productCtrl } from "@/api";
import { Loading } from "@/components/Shared";
import styles from "./ProductsDetails.module.scss";
import { IProduct } from "@/types";



interface Props {
  productsOrder: { odProdId: string; odQuantity: number }[];
}

export function ProductsDetails(props: Props) {
  const { productsOrder } = props;
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsTemp: IProduct[] = [];
        for await (const item of productsOrder) {
          const response = await productCtrl.getById(item.odProdId);
          productsTemp.push({ ...response, quantity: item.odQuantity });
        }
        setProducts(productsTemp);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productsOrder]);

  if (loading) return <Loading text="Cargando productos" />;

  return (
    <div>
      {map(products, (product) => (
        <div key={product.id} className={styles.product}>
          <div>
         
            <Image
              src={product.mainImage} // It seems `fn.getUrlImage` is a custom function, please provide its implementation.
              alt={product.title}
            />
            <div>
              <h4>{product.title}</h4>
            </div>
          </div>

          <p className={styles.price}>
            {product.price} x {product.price}€
          </p>
        </div>
      ))}
    </div>
  );
}
