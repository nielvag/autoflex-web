import TrashIcon from "../../../../assets/icons/trash-2.svg?react";
import { useDeleteProductRawMaterialMutation } from "../../../../stores/api/productRawMaterials.endpoints";

export default function DeleteProductRawMaterialButton(props: {
  productId: string;
  rawMaterialId: string;
}) {
  const [deleteProductRawMaterialReq] = useDeleteProductRawMaterialMutation();
  const deleteProductRawMaterial = async () => {
    try {
      await deleteProductRawMaterialReq(props).unwrap();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <button
      aria-label="remover matéria prima do produto"
      onClick={deleteProductRawMaterial}
    >
      <TrashIcon className="text-black w-4" />
    </button>
  );
}
