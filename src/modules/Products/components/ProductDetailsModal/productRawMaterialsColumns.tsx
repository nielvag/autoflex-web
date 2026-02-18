import { createColumnHelper } from "@tanstack/react-table";
import type { ProductRawMaterial } from "../../../../stores/api/productRawMaterials.endpoints";
import DeleteProductRawMaterialButton from "./DeleteProductRawMaterialButton";

const columnHelper = createColumnHelper<ProductRawMaterial>();

export const productsRawMaterialsColumnsTable = [
  columnHelper.accessor("rawMaterial.code", {
    header: () => <span className="flex text-sm">Código</span>,
    cell: ({ getValue }) => <div className="text-sm">{getValue()}</div>,
  }),
  columnHelper.accessor("rawMaterial.name", {
    header: () => <span className="flex text-sm">Nome</span>,
    cell: ({ getValue }) => <div className="text-sm">{getValue()}</div>,
  }),
  columnHelper.accessor("quantityRequired", {
    header: () => <span className="flex text-sm">Quantidade</span>,
    cell: ({ getValue }) => <div className="text-sm">{getValue()}</div>,
  }),
  columnHelper.display({
    id: "details",
    size: 20,
    cell: ({
      row: {
        original: { productId, rawMaterialId },
      },
    }) => (
      <DeleteProductRawMaterialButton
        productId={productId}
        rawMaterialId={rawMaterialId}
      />
    ),
  }),
];
