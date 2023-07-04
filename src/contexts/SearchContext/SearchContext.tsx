import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Separator, GridProducts } from "@/components/Shared";
import styles from "./SearchContext.module.scss";
import { productCtrl } from "@/api";
import { IProduct } from "@/types";

export function SearchProvider(props:any) {
  const { children } = props;
  const [products, setProducts] = useState<IProduct[] |null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const { query } = useRouter();

  useEffect(() => {
    if (query.search) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [query.search]);

  useEffect(() => {
    (async () => {
      try {

        const searchQ =  Array.isArray(query?.search)
        ? query.search[0]
        : query?.search ?? "";
       
        const response = await productCtrl.getAll(1, 100000, searchQ);

        setProducts(response.content || []);
        setTotalItems(response.totalElements || 0);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query.search]);

  return (
    <>
      {children}

      {query.search && (
        <div className={styles.container}>
          <div className={styles.infoSearch}>
            <p>Buscando: {query.search}</p>
            <p>{totalItems} resultados</p>
          </div>

          <Separator height={20} />

          <GridProducts
            products={products}
            columns={6}
            classProduct={styles.product}
          />
        </div>
      )}
    </>
  );
}
