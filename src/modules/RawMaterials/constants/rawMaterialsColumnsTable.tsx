import { createColumnHelper } from "@tanstack/react-table";
import type { RawMaterial } from "../../../stores/api/rawMaterials.endpoints";
import EditRawMaterialButton from "../components/EditRawMaterialButton";
import DeleteRawMaterialButton from "../components/DeleteRawMaterialButton";

const columnHelper = createColumnHelper<RawMaterial>();

export const rawMaterialsColumnsTable = [
  columnHelper.accessor("code", {
    header: () => <span className="flex">Código</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
  columnHelper.accessor("name", {
    header: () => <span className="flex">Nome</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
  columnHelper.accessor("stockQuantity", {
    header: () => <span className="flex">Quantidade em estoque</span>,
    cell: ({ getValue }) => <div>{getValue()}</div>,
  }),
  columnHelper.display({
    id: "edit",
    size: 20,
    cell: (props) => (
      <EditRawMaterialButton rawMaterialId={props.row.original.id} />
    ),
  }),
  columnHelper.display({
    id: "delete",
    size: 20,
    cell: (props) => (
      <DeleteRawMaterialButton rawMaterial={props.row.original} />
    ),
  }),
];
