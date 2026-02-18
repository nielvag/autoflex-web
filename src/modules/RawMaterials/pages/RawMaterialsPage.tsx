import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  useGetRawMaterialsQuery,
  type RawMaterial,
} from "../../../stores/api/rawMaterials.endpoints";
import { rawMaterialsColumnsTable } from "../constants/rawMaterialsColumnsTable";
import { Table } from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../../assets/icons/plus.svg?react";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function RawMaterialsPage() {
  const { data, isLoading } = useGetRawMaterialsQuery();
  const navigate = useNavigate();

  const table = useReactTable<RawMaterial>({
    columns: rawMaterialsColumnsTable,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between flex-wrap mb-6 px-8 py-4 border-b border-b-gray-200">
        <h1 className="text-lg font-bold">Matérias-primas</h1>
        <button
          className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-gray-200"
          onClick={() => navigate("/new-raw-material")}
        >
          <PlusIcon className="w-3.5" />
          Nova Matéria-prima
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="px-4 w-full">
          <Table table={table} />
        </div>
      )}
    </div>
  );
}
