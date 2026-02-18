import { createColumnHelper } from "@tanstack/react-table";
import type { ProductionPlanItem } from "../../../stores/api/productionPlan.endpoints";

const columnHelper = createColumnHelper<ProductionPlanItem>();

export const productionPlanColumnsTable = [
  columnHelper.accessor("productCode", {
    header: () => <span className="flex">Código</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
  columnHelper.accessor("productName", {
    header: () => <span className="flex">Nome</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
  columnHelper.accessor("unitPrice", {
    header: () => <span className="flex">Preço unitário</span>,
    cell: ({ getValue }) => <div>{`R$ ${getValue().replace(".", ",")}`}</div>,
  }),
  columnHelper.accessor("quantity", {
    header: () => <span className="flex">Quantidade</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),

  columnHelper.accessor("totalValue", {
    header: () => <span className="flex">Total</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
];
