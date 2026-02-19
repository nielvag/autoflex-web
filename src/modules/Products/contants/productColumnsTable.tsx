import { createColumnHelper } from "@tanstack/react-table";
import DeleteProductButton from "../components/DeleteProductButton";
import EditProductButton from "../components/EditProductButton";
import DetailsProductButton from "../components/DetailsProductButton";
import type { Product } from "../../../stores/api/products.endpoints";

const columnHelper = createColumnHelper<Product>();

export const productsColumnsTable = [
  columnHelper.accessor("code", {
    header: () => <span className="flex">Código</span>,
    cell: ({ getValue }) => <div data-testid="product-code">{getValue()}</div>,
  }),
  columnHelper.accessor("name", {
    header: () => <span className="flex">Nome</span>,
    cell: ({ getValue }) => <div data-testid="product-name">{getValue()}</div>,
  }),
  columnHelper.accessor("price", {
    header: () => <span className="flex">Preço</span>,
    cell: ({ getValue }) => (
      <div data-testid="product-price">{getValue().replace(".", ",")}</div>
    ),
  }),
  columnHelper.display({
    id: "edit",
    size: 20,
    cell: (props) => <EditProductButton productId={props.row.original.id} />,
  }),
  columnHelper.display({
    id: "delete",
    size: 20,
    cell: (props) => <DeleteProductButton product={props.row.original} />,
  }),
  columnHelper.display({
    id: "details",
    size: 20,
    cell: (props) => <DetailsProductButton product={props.row.original} />,
  }),
];
