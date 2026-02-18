import type { TableProps } from "./types";
import { flexRender } from "@tanstack/react-table";
import LoadingSpinner from "../LoadingSpinner";

export function Table<T>({ table, isLoading }: TableProps<T>) {
  return (
    <>
      {table.getRowCount() > 0 ? (
        <div className="border border-gray-200 rounded-lg overflow-auto">
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead className="w-full bg-black">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className="py-4 px-4 bg-[#F8F8F8] text-base"
                          style={{ width: header.column.getSize() }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="text-black" data-cy="table-body">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const cellContent = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      );
                      return (
                        <td
                          key={cell.id}
                          className="py-4 px-4"
                          style={{ width: cell.column.getSize() }}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xl text-center">Nenhum resultado</p>
          </div>
        </div>
      )}
    </>
  );
}
