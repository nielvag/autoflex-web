import { baseApi } from "./baseApi";

export type Product = {
  id: string;
  code: string;
  name: string;
  price: string;
};

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    getProduct: builder.query<Product, string | undefined>({
      query: (id) => `/products/${id}`,

      providesTags: (result) => [{ type: "Products", id: result?.id }],
    }),

    createProduct: builder.mutation<boolean, Omit<Product, "id">>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: [{ type: "Products", id: "LIST" }, "ProductionPlan"],
    }),

    editProduct: builder.mutation<
      Product,
      { id: string; data: Omit<Product, "id"> }
    >({
      query: (payload) => {
        return {
          url: `/products/${payload.id}`,
          method: "PATCH",
          body: payload.data,
        };
      },
      invalidatesTags: (_res, _err, arg) => [
        { type: "Products", id: arg.id },
        "ProductionPlan",
      ],
    }),

    deleteProduct: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "Products", id: arg },
        { type: "Products", id: "LIST" },
        "ProductionPlan",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;
