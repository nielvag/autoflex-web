import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  useGetProductionPlanQuery,
  type ProductionPlanItem,
} from "../../../stores/api/productionPlan.endpoints";
import { productionPlanColumnsTable } from "../constants/productionPlanColumnsTable";
import { Table } from "../../../components/Table";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function ProductsPage() {
  const { data, isLoading } = useGetProductionPlanQuery();

  const table = useReactTable<ProductionPlanItem>({
    columns: productionPlanColumnsTable,
    data: data?.items || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between flex-wrap mb-6 px-8 py-4 border-b border-b-gray-200">
        <h1 className="text-lg font-bold">Plano de produção</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col px-4 w-full gap-4">
          <Table table={table} />
          <p className="font-medium">
            Total da produção:{" "}
            <span className="font-semibold">
              R$ {data?.totalValue.replace(".", ",")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
