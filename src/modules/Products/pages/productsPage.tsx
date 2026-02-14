import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "../../../components/Table";
import { productsColumnsTable } from "../contants/productColumnsTable";
import type { Product } from "../types";
import { useGetProductsQuery } from "../../../stores/api/products.endpoints";
import Spinner from "../../../assets/icons/spinner.svg?react";
import PlusIcon from "../../../assets/icons/plus.svg?react";

export default function ProductsPage() {
  const { data, isLoading } = useGetProductsQuery();

  const table = useReactTable<Product>({
    columns: productsColumnsTable,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-6 px-8 py-4 border-b border-b-gray-200">
        <h1 className="text-lg font-bold">Produtos</h1>
        <button className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-gray-200">
          <PlusIcon className="w-3.5" />
          Novo Produto
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner className="w-6" aria-label="Carregando" role="status" />
        </div>
      ) : (
        <div className="px-4 w-full">
          <Table table={table} />
        </div>
      )}
    </div>
  );
}
