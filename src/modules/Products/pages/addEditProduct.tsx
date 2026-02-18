import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetProductQuery,
  type Product,
} from "../../../stores/api/products.endpoints";
import Button from "../../../components/Button";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import InputNumber from "../../../components/Input/InputNumber";
import InputText from "../../../components/Input/InputText";

const schema = yup.object({
  code: yup.string().required(),
  name: yup.string().required(),
  price: yup.string().required(),
});

export default function AddEditProductPage() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();
  const { data: product } = useGetProductQuery(params?.id || skipToken);

  const [errorMessage, setErrorMessage] = useState<string>();

  const { register, handleSubmit, reset, setValue, watch } = useForm<
    Omit<Product, "id">
  >({
    shouldUseNativeValidation: true,
    defaultValues: {
      code: "",
      name: "",
      price: "",
    },
    resolver: yupResolver(schema),
  });

  const price = watch("price");

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...productInputData } = product;
      reset(productInputData);
    }
  }, [product, reset]);

  const onSubmit = async (data: Omit<Product, "id">) => {
    try {
      if (params.id) {
        await editProduct({
          id: params.id,
          data,
        }).unwrap();
      } else {
        await createProduct(data).unwrap();
      }
      navigate("/products");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("error: ", error?.data?.message);
      setErrorMessage(
        error.data.message ||
          "Algo deu errado. Por favor, verifique os dados ou tente novamente mais tarde",
      );
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-semibold mb-3 px-8 py-4 border-b border-b-gray-200">
        {params.id ? "Editar Produto" : "Cadastrar novo Produto"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 px-8 py-4"
      >
        <h2 className="text-lg font-medium text-gray-700">Produto</h2>
        <div className="flex flex-wrap gap-3 border border-gray-200 p-4 rounded-xl mb-3">
          <InputText
            label="Código*"
            {...register("code", {
              required: "Código é obrigatório",
            })}
          />
          <InputText
            label="Nome*"
            {...register("name", {
              required: "Nome é obrigatório",
            })}
          />
          <InputNumber
            label="Preço*"
            decimalScale={2}
            decimalSeparator=","
            value={price}
            onValueChange={(values) => {
              setValue("price", values.value);
            }}
          />
          {errorMessage && (
            <span className="text-red-800 text-sm">{errorMessage}</span>
          )}
        </div>

        <Button
          type="submit"
          className="max-w-64"
          variant="primary"
          disabled={isCreating}
        >
          {isCreating || (isEditing && <LoadingSpinner />)}
          Enviar
        </Button>
      </form>
    </div>
  );
}
