import { IProduct } from "@/types";

export function Description(props:{product: IProduct}) {
  const { product } = props;

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: product?.description }} />
    </div>
  );
}
