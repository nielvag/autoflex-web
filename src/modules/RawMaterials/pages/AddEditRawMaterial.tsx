import { useForm } from "react-hook-form";

import Button from "../../../components/Button";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import InputNumber from "../../../components/Input/InputNumber";
import InputText from "../../../components/Input/InputText";
import {
  useCreateRawMaterialMutation,
  useEditRawMaterialMutation,
  useGetRawMaterialQuery,
  type RawMaterial,
} from "../../../stores/api/rawMaterials.endpoints";

const schema = yup.object({
  code: yup.string().required(),
  name: yup.string().required(),
  stockQuantity: yup.string().required(),
});

export default function AddEditRawMaterialPage() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const [createRawMaterial, { isLoading: isCreating }] =
    useCreateRawMaterialMutation();
  const [editRawMaterial, { isLoading: isEditing }] =
    useEditRawMaterialMutation();
  const { data: rawMaterials } = useGetRawMaterialQuery(
    params?.id || skipToken,
  );

  const [errorMessage, setErrorMessage] = useState<string>();

  const { register, handleSubmit, reset, setValue, watch } = useForm<
    Omit<RawMaterial, "id">
  >({
    shouldUseNativeValidation: true,
    defaultValues: {
      code: "",
      name: "",
      stockQuantity: "",
    },
    resolver: yupResolver(schema),
  });

  const stockQuantity = watch("stockQuantity");

  useEffect(() => {
    if (rawMaterials) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rawMaterialInputData } = rawMaterials;
      reset(rawMaterialInputData);
    }
  }, [rawMaterials, reset]);

  const onSubmit = async (data: Omit<RawMaterial, "id">) => {
    try {
      if (params.id) {
        await editRawMaterial({
          id: params.id,
          ...data,
        }).unwrap();
      } else {
        await createRawMaterial(data).unwrap();
      }
      navigate("/raw-materials");
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
        {params.id ? "Editar Matéria-prima" : "Cadastrar nova Matéria-prima"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 px-8 py-4"
      >
        <h2 className="text-lg font-medium text-gray-700">Matéria-prima</h2>
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
            label="Quantidade em estoque*"
            decimalScale={3}
            decimalSeparator=","
            value={stockQuantity}
            onValueChange={(values) => {
              setValue("stockQuantity", values.value);
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
