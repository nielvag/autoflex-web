import TrashIcon from "../../../assets/icons/trash-2.svg?react";
import {
  useDeleteProductMutation,
  type Product,
} from "../../../stores/api/products.endpoints";
export default function DeleteProductButton({ product }: { product: Product }) {
  const [removeProduct, { isLoading }] = useDeleteProductMutation();
  const deleteProduct = async () => {
    try {
      await removeProduct(product.id).unwrap();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <button onClick={deleteProduct} disabled={isLoading}>
      <TrashIcon className="w-5" />
    </button>
  );
}
