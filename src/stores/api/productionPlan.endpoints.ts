import { baseApi } from "./baseApi";

export interface ProductionPlanItem {
  productId: string;
  productCode: string;
  productName: string;
  unitPrice: string;
  quantity: number;
  totalValue: string;
}

export interface ProductionPlan {
  items: ProductionPlanItem[];
  totalValue: string;
}

export const productionPlan = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductionPlan: builder.query<ProductionPlan, void>({
      query: () => ({
        url: `/production-plan`,
      }),
      providesTags: ["ProductionPlan"],
    }),
  }),
});

export const { useGetProductionPlanQuery } = productionPlan;
