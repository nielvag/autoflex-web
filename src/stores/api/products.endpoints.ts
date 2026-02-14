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
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productsApi;
