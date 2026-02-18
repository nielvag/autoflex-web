import TrashIcon from "../../../assets/icons/trash-2.svg?react";

import {
  useDeleteRawMaterialMutation,
  type RawMaterial,
} from "../../../stores/api/rawMaterials.endpoints";
import { toast } from "react-toastify";

export default function DeleteRawMaterialButton({
  rawMaterial,
}: {
  rawMaterial: RawMaterial;
}) {
  const [removeRawMaterial, { isLoading }] = useDeleteRawMaterialMutation();
  const deleteRawMaterial = async () => {
    try {
      const res = await removeRawMaterial(rawMaterial.id).unwrap();
      if (!res.deleted) toast.error(res.reason || "Algo deu errado.");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <button onClick={deleteRawMaterial} disabled={isLoading}>
      <TrashIcon className="w-5" />
    </button>
  );
}
