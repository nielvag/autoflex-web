import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  type Product,
} from "../../../stores/api/products.endpoints";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function NewProductPage() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Omit<Product, "id">>({
    shouldUseNativeValidation: true,
    defaultValues: {
      code: "",
      name: "",
      price: "",
    },
  });
  const onSubmit = async (data: Omit<Product, "id">) => {
    console.log(data);
    try {
      await createProduct(data);
      navigate("/products");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-semibold mb-3 px-8 py-4 border-b border-b-gray-200">
        Cadastrar novo Produto
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-8 py-4"
      >
        <Input
          label="Código*"
          {...register("code", {
            required: "Código é obrigatório",
          })}
        />
        <Input
          label="Nome*"
          {...register("name", {
            required: "Nome é obrigatório",
          })}
        />
        <Input
          label="Preço*"
          {...register("price", {
            required: "Preço é obrigatório",
          })}
        />

        <Button
          type="submit"
          className="max-w-64"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading && <LoadingSpinner />}
          Enviar
        </Button>
      </form>
    </div>
  );
}
