import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "../types";

const columnHelper = createColumnHelper<Product>();

export const productsColumnsTable = [
  columnHelper.accessor("code", {
    header: () => <span className="flex">Código</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
  columnHelper.accessor("name", {
    header: () => <span className="flex">Nome</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
  columnHelper.accessor("price", {
    header: () => <span className="flex">Preço</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
];
