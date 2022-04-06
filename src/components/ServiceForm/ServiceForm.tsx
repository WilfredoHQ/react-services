import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ServiceData } from "../../pages/Home/Home";

export interface FormData {
  name: string;
  description: string;
  category: string;
}

interface ServiceFormProps {
  handleService: (id: number | undefined, data: FormData) => void;
  updateService: ServiceData | null;
  setUpdateService: (data: ServiceData | null) => void;
  categories: string[];
}

const ServiceForm: FC<ServiceFormProps> = ({
  handleService,
  updateService,
  setUpdateService,
  categories,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { register, setValue, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (updateService) {
      setValue("name", updateService.name);
      setValue("description", updateService.description);
      setValue("category", updateService.category);
    } else {
      reset();
    }
  }, [updateService]);

  return (
    <div className="row-start-1 md:row-start-auto">
      <div className="text-center">
        <button
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="border border-cyan-500 text-cyan-500 rounded px-2 py-1 mb-4 md:hidden"
        >
          {isVisible ? "Ocultar formulario" : "Mostrar formulario"}
        </button>
      </div>
      <section
        className={`border border-gray-300 rounded overflow-hidden md:!block ${
          isVisible ? "" : "hidden"
        }`}
      >
        <div className="p-4">
          <h3 className="mb-2 font-semibold">Servicio</h3>
          <form id="serviceForm" className="grid gap-2 mb-2">
            <label htmlFor="name" className="text-sm">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="border border-gray-300 rounded p-1"
            />
            <label htmlFor="description" className="text-sm">
              Descripción
            </label>
            <textarea
              id="description"
              {...register("description")}
              cols={10}
              rows={2}
              className="border border-gray-300 rounded p-1"
            ></textarea>
            <label htmlFor="category" className="text-sm">
              Categoría
            </label>
            <select
              id="category"
              {...register("category")}
              className="border border-gray-300 rounded p-1"
            >
              {categories.map(
                (category, index) =>
                  index > 0 && (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
              )}
            </select>
          </form>
        </div>
        <div className="p-4 bg-gray-50">
          <button
            onClick={handleSubmit((data) => {
              handleService(updateService?.id, data);
              reset();
            })}
            className="border border-green-500 text-green-500 rounded px-2 py-1 mr-4"
          >
            {!updateService ? "Guardar" : "Actualizar"}
          </button>
          <button
            onClick={() => {
              setUpdateService(null);
              reset();
            }}
            className="border border-red-500 text-red-500 rounded px-2 py-1"
          >
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServiceForm;
