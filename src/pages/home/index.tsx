import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { BasicLayout } from "@/layouts";
import { GridCategories, GridProducts, Separator} from "@/components/Shared";
import styles from "./home.module.scss";
import { ToastContainer } from "react-toastify";
import { productCtrl } from "@/api";
import { IProduct } from "@/types";
import Footer from "@/components/Shared/Footer/Footer";


export default function HomePage() {
  const [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getAll(1, 100);
      
        setProducts(response.content || []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <BasicLayout>
      <ToastContainer />
      <Separator height={50} />
      <Container>
        <GridCategories />

        <Separator height={50} />

        <h2>Últimos productos</h2>
        <Separator height={10} />
        <GridProducts
          products={products}
          columns={4}
          classProduct={styles.product}
        />
      </Container>
      <Footer/>
    </BasicLayout>
  );
}
