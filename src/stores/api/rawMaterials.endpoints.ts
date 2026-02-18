import { baseApi } from "./baseApi";

export type RawMaterial = {
  code: string;
  id: string;
  name: string;
  stockQuantity: string;
};

export const productRawMaterials = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRawMaterials: builder.query<RawMaterial[], void>({
      query: () => ({
        url: `/raw-material`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "RawMaterials" as const,
                id,
              })),
              { type: "RawMaterials", id: "LIST" },
            ]
          : [{ type: "RawMaterials", id: "LIST" }],
    }),

    getRawMaterial: builder.query<RawMaterial, string>({
      query: (id) => ({ url: `/raw-material/${id}`, method: "GET" }),
      providesTags: (result) => [{ type: "RawMaterials", id: result?.id }],
    }),

    createRawMaterial: builder.mutation<RawMaterial, Omit<RawMaterial, "id">>({
      query: (body) => ({ url: "/raw-material", method: "POST", body }),
      invalidatesTags: () => [
        { type: "RawMaterials", id: "LIST" },
        "ProductionPlan",
      ],
    }),

    editRawMaterial: builder.mutation<RawMaterial, Partial<RawMaterial>>({
      query: ({ id, ...body }) => ({
        url: `/raw-material/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "RawMaterials", id: arg.id },
        "ProductionPlan",
      ],
    }),

    deleteRawMaterial: builder.mutation<
      { deleted: boolean; reason?: string },
      string
    >({
      query: (id) => ({ url: `/raw-material/${id}`, method: "DELETE" }),
      invalidatesTags: (res, _err, arg) =>
        res?.deleted
          ? [
              { type: "RawMaterials", id: arg },
              { type: "RawMaterials", id: "LIST" },
              "ProductionPlan",
            ]
          : [],
    }),
  }),
});

export const {
  useGetRawMaterialsQuery,
  useGetRawMaterialQuery,
  useCreateRawMaterialMutation,
  useEditRawMaterialMutation,
  useDeleteRawMaterialMutation,
} = productRawMaterials;
