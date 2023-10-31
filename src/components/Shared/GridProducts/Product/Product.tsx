import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import Link from "next/link";
import styles from "./Product.module.scss";
import { IProduct } from "@/types";
import { Util } from "@/utils";

const NOT_FOUND_IMG = "/images/not-found.jpg";

interface ProductProps {
  product: IProduct;
  classProduct:any;
}

export function Product(props:ProductProps) {
  const { product, classProduct } = props;
  const [image, setImage] = useState(NOT_FOUND_IMG);
 // const lowStock = product.stock > 0 && product.stock < 10;

  //console.log("PRODUCTSSS" , JSON.stringify(product));

  useEffect(() => {
    const imageUrl = product.images[0]?.url;
    const finalImage= Util.evaluateExistValue(imageUrl)? imageUrl : NOT_FOUND_IMG;
    setImage(finalImage);

  }, [product]);

  return (
    <div
      className={classNames(styles.container, {
        [classProduct]: classProduct,
      })}
    >

      <Link href={`/product/${product.slug}`}>
        <div className={styles.content}>
         
          <Image className={styles.productImage} src={image} alt={product.model} />
          <h3>{product.model}</h3>
          <p>{product.description}</p>
          <div className={styles.footer}>
            <span> S/.{product.rentPricePerDay}</span>
          </div>

          {/* {lowStock && (
            <p className={styles.lowStock}>
              {`Solo quedan ${product.stock} unidades`}
            </p>
          )} */}
        </div>
      </Link>
    </div>
  );
}
