import { baseApi } from "./baseApi";

export type DeleteProductRawMaterial = {
  productId: string;
  rawMaterialId: string;
};

export type CreateProductRawMaterial = {
  productId: string;
  rawMaterialId: string;
  quantityRequired: string;
};

export type ProductRawMaterial = {
  id: string;
  productId: string;
  rawMaterialId: string;
  quantityRequired: string;
  rawMaterial: {
    id: string;
    code: string;
    name: string;
    stockQuantity: string;
  };
};

export const productRawMaterials = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductRawMaterials: builder.query<
      ProductRawMaterial[],
      { productId: string }
    >({
      query: ({ productId }) => ({
        url: `products/${productId}/raw-materials`,
      }),
      providesTags: (_result, _error, arg) => [
        { type: "ProductRawMaterials", id: arg.productId },
      ],
    }),

    addUpdateProductRawMaterial: builder.mutation<
      CreateProductRawMaterial,
      CreateProductRawMaterial
    >({
      query: (body) => ({
        url: `products/${body.productId}/raw-materials`,
        method: "POST",
        body: {
          rawMaterialId: body.rawMaterialId,
          quantityRequired: body.quantityRequired,
        },
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "ProductRawMaterials", id: arg.productId },
        "ProductionPlan",
      ],
    }),

    deleteProductRawMaterial: builder.mutation<
      { deleted: boolean },
      DeleteProductRawMaterial
    >({
      query: ({ productId, rawMaterialId }) => ({
        url: `products/${productId}/raw-materials/${rawMaterialId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, _error, arg) =>
        result?.deleted
          ? [
              { type: "ProductRawMaterials", id: arg.productId },
              "ProductionPlan",
            ]
          : [],
    }),
  }),
});

export const {
  useGetProductRawMaterialsQuery,
  useAddUpdateProductRawMaterialMutation,
  useDeleteProductRawMaterialMutation,
} = productRawMaterials;
