import { useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import Select from "../../../../components/Select/Select";
import {
  useAddUpdateProductRawMaterialMutation,
  useGetProductRawMaterialsQuery,
  type ProductRawMaterial,
} from "../../../../stores/api/productRawMaterials.endpoints";
import type { Product } from "../../../../stores/api/products.endpoints";
import { useGetRawMaterialsQuery } from "../../../../stores/api/rawMaterials.endpoints";
import Button from "../../../../components/Button";
import PlusIcon from "../../../../assets/icons/plus.svg?react";
import InputNumber from "../../../../components/Input/InputNumber";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { productsRawMaterialsColumnsTable } from "./productRawMaterialsColumns";
import { Table } from "../../../../components/Table";

interface DetailsModal {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export default function ProductDetailsModal({
  open,
  onClose,
  product,
}: DetailsModal) {
  const { data: productRawMaterials } = useGetProductRawMaterialsQuery({
    productId: product.id,
  });
  const { data: rawMaterials, isLoading } = useGetRawMaterialsQuery();
  const [addProductRawMaterialReq, { isLoading: isLoadingPRM }] =
    useAddUpdateProductRawMaterialMutation();

  const [selectedRawMaterialId, setSelectedRawMaterialId] = useState<string>();
  const [rawMaterialquantity, setRawMaterialQuantity] = useState<string>();

  const table = useReactTable<ProductRawMaterial>({
    columns: productsRawMaterialsColumnsTable,
    data: productRawMaterials || [],
    getCoreRowModel: getCoreRowModel(),
  });

  const addProductRawMaterial = async () => {
    if (!rawMaterialquantity || !selectedRawMaterialId) return;

    try {
      await addProductRawMaterialReq({
        productId: product.id,
        quantityRequired: rawMaterialquantity,
        rawMaterialId: selectedRawMaterialId,
      }).unwrap();
      setRawMaterialQuantity("");
      setSelectedRawMaterialId("");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Detalhes do Produto"
      data-testid="details-product-modal"
    >
      <div className="flex flex-col max-h-[70vh]">
        <ul>
          <li>
            <span className="font-medium">Nome:</span> {product.name}
          </li>
          <li>
            <span className="font-medium">Código:</span> {product.code}
          </li>
          <li>
            <span className="font-medium">Preço:</span> R${" "}
            {product.price.replace(".", ",")}
          </li>
        </ul>

        <div className="w-full border-b border-b-gray-200 my-6" />

        <h2 className="font-semibold mb-3">Matérias-primas</h2>

        <div className="flex flex-col border border-gray-200 p-4 rounded-lg mb-3">
          <h3 className="mb-3 font-medium">
            Adicionar / alterar matérias-primas ao produto
          </h3>
          <div className="flex flex-wrap gap-2">
            <Select
              value={selectedRawMaterialId}
              onChanceValue={setSelectedRawMaterialId}
              options={
                rawMaterials?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              }
              triggerClassName="text-sm h-9.5"
              data-testid="select-raw-material"
            />
            <InputNumber
              className="w-28 text-sm h-9.5"
              placeholder="Quantidade"
              value={rawMaterialquantity}
              onValueChange={(value) => setRawMaterialQuantity(value.value)}
              decimalScale={3}
              decimalSeparator=","
              data-testid="raw-material-quantity-input"
            />
            <Button
              className="flex items-center gap-2 text-sm font-medium"
              variant="primary"
              onClick={addProductRawMaterial}
              disabled={
                !rawMaterialquantity ||
                !selectedRawMaterialId ||
                isLoadingPRM ||
                isLoading
              }
              data-testid="add-product-raw-material"
            >
              <PlusIcon className="w-4" />
              Adicionar / Alterar
            </Button>
          </div>
        </div>

        <Table table={table} />
      </div>
    </Modal>
  );
}
