import { useState } from "react";
import ChevroRightIcon from "../../../assets/icons/chevron-right.svg?react";
import ProductDetailsModal from "./ProductDetailsModal/ProductDetailsModal";
import type { Product } from "../../../stores/api/products.endpoints";
export default function DetailsProductButton({
  product,
}: {
  product: Product;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen((prev) => !prev)}>
        <ChevroRightIcon className="w-5" />
      </button>

      <ProductDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
      />
    </>
  );
}
