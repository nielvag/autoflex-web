import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "../../../components/Table";
import { productsColumnsTable } from "../contants/productColumnsTable";
import type { Product } from "../types";

export default function ProductsPage() {
  const table = useReactTable<Product>({
    columns: productsColumnsTable,
    data: [
      {
        code: "212",
        id: "123-904k124iok01234",
        name: "Garrafa",
        price: "2.02",
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col">
      <h1>Productos</h1>
      <div>
        <Table table={table} />
      </div>
    </div>
  );
}
