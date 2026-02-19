import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/icons/pencil.svg?react";

export default function EditProductButton({
  productId,
}: {
  productId: string;
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/products/${productId}`)}
      data-testid="edit-product-btn"
    >
      <EditIcon className="w-5" />
    </button>
  );
}
