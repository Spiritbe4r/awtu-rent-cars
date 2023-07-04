import { useState, useEffect } from "react";
import { productCtrl } from "@/api";

import { Separator } from "@/components/Shared";
import { Container, Image } from "semantic-ui-react";
import styles from "./product.module.scss";

import { BasicLayout } from "@/layouts";
import { Product } from "@/components/Product";
import { IProduct } from "@/types";

const NOT_FOUND_IMG = "/images/not-found.jpg";
interface ProductPageProps {
  product: IProduct;
}
const ProductPage: React.FC<ProductPageProps> = ({ product }) => {

  const [image, setImage] = useState(NOT_FOUND_IMG);

  useEffect(() => {
    const imageUrl = product?.mainImage?.url;
    setImage(imageUrl)
  }, [product]);

  return (
    <BasicLayout>
      <Container>
        <div className={styles.product}>
          <div>
            <Image src={image} alt={product?.title} />
          </div>
          <div>
            <Product.Info product={product} />
          </div>
        </div>

        <Separator height={20} />
        <Product.Description product={product} />
      </Container>

      <Separator height={50} />
    </BasicLayout>
  );
}
export default ProductPage;

export async function getServerSideProps(context:any) {
  const {
    params: { slug },
    query: { search },
  } = context;

  if (search) return { props: { product: "" } };

  try {
    const response = await productCtrl.getBySlug(slug);
    return { props: { product: response } };
  } catch (error) {
    return { props: { notFound: true } };
  }
}
