import { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { size, map } from "lodash";
import { useRouter } from "next/router";
import { productCtrl } from "@/api";
import { Loading, Pagination, NoResult } from "@/components/Shared";
import { Product } from "./Product";
import { useAuth } from "@/hooks";

const ITEMS_PER_PAGE = 10;

export function ListProducts(props: any) {
  const { reload, onReload } = props;
  const [products, setProducts] = useState<any | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const { isSeller , user} = useAuth();
  const { query } = useRouter();
  console.log("Query", query);
  const page = Number(query.page ?? 0);

  useEffect(() => {
    (async () => {
      try {
        setProducts([]);

        const searchText = Array.isArray(query?.searchAdmin) ? query.searchAdmin[0] : query?.searchAdmin ?? "";
        const search ={
          search: searchText,
          seller: isSeller ? user?.id : undefined
      
        }
        const response = await productCtrl.getAllByUSer(
          page,
          ITEMS_PER_PAGE,
          search
        );
        //console.log("listProducts: ", JSON.stringify(response));

        setProducts(response.content || []);
        setTotalPages(Math.ceil(response.totalElements / ITEMS_PER_PAGE));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload, query.page, query.searchAdmin]);

  if (!products) return <Loading text="Cargando productos" />;

  return (
    <div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Modelo</Table.HeaderCell>
            <Table.HeaderCell>Precio Alquiler</Table.HeaderCell>
            <Table.HeaderCell>Año</Table.HeaderCell>
            <Table.HeaderCell>Color</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {size(products) === 0 && (
            <Table.Cell colSpan="5">
              <NoResult text="No hay productos" />
            </Table.Cell>
          )}

          {map(products, (product: any) => (
            <Table.Row key={product.id}>
              <Product product={product} onReload={onReload} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
