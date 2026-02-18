import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/icons/pencil.svg?react";

export default function EditRawMaterialButton({
  rawMaterialId,
}: {
  rawMaterialId: string;
}) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/raw-material/${rawMaterialId}`)}>
      <EditIcon className="w-5" />
    </button>
  );
}
