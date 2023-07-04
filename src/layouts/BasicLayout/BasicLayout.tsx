import { Container } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { Layout } from "@/components/Layout";
import styles from "./BasicLayout.module.scss";
import { Search } from "@/components/Shared";

export function BasicLayout(props:any) {
  const { children } = props;
  const isAdmin  = useAuth();

  return (
    <>
      <div className={styles.border}>
        <Container className={styles.header}>
          <div className={styles.left}>
            <Layout.Logo />
            <Search
              className={styles.search}
              placeholder="Busca lo que necesitas..."
            />
          </div>

          <div>
            {isAdmin && <Layout.AdminButton />}
            <Layout.Account />
            <Layout.Basket />
          </div>
        </Container>
      </div>

      <div className={styles.border}>
        <Container>
          <Layout.CategoriesMenu />
        </Container>
      </div>

      {children}
    </>
  );
}
