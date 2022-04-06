import { FC, useState } from "react";
import FilterOption from "../../components/FilterOption";
import ServiceCard from "../../components/ServiceCard";
import ServiceForm from "../../components/ServiceForm";
import { FormData } from "../../components/ServiceForm/ServiceForm";

export interface ServiceData extends FormData {
  id: number;
}

const categories = ["todos", "autos", "salud", "hogar"];
const initialData = [
  {
    id: 1,
    name: "Electricidad",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "hogar",
  },
  {
    id: 2,
    name: "Auxilio Mecanico",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "autos",
  },
  {
    id: 3,
    name: "Chofer reemplazo",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "autos",
  },
  {
    id: 4,
    name: "Medico a domicilio",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "salud",
  },
  {
    id: 5,
    name: "Ambulancia",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "salud",
  },
  {
    id: 6,
    name: "Gasfitero",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "hogar",
  },
];

const Home: FC = () => {
  const [updateService, setUpdateService] = useState<ServiceData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [services, setServices] = useState<ServiceData[]>(initialData);

  const deleteService = (id: number) => {
    setServices((services) => services.filter((service) => service.id !== id));

    if (updateService?.id === id) {
      setUpdateService(null);
    }
  };

  const handleService = (id: number | undefined, data: FormData) => {
    if (!id) {
      setServices((services) => [
        { ...data, id: Date.now() + Math.random() },
        ...services,
      ]);
    } else {
      setServices((services) =>
        services.map((service) =>
          service.id == id ? { ...data, id: id } : service
        )
      );

      setUpdateService(null);
    }
  };

  return (
    <div className="px-8">
      <h1 className="text-center p-4 text-xl">Servicios</h1>
      <div className="flex gap-4 mb-4 bg-gray-50 p-2">
        {categories.map((category, index) => (
          <FilterOption
            key={index}
            category={category}
            setCategory={setActiveCategory}
            isActive={category === activeCategory}
          />
        ))}
      </div>
      <div className="grid md:grid-cols-[1fr,300px] gap-4 mb-4">
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 place-content-start">
          {services.length > 0 ? (
            services?.map((service, index) =>
              activeCategory === "todos" ||
              activeCategory === service.category ? (
                <ServiceCard
                  key={index}
                  service={service}
                  setUpdateService={setUpdateService}
                  deleteService={deleteService}
                />
              ) : null
            )
          ) : (
            <div className="p-2 col-span-2 lg:col-span-3">
              No tiene ningún servicio registrado
            </div>
          )}
        </section>
        <ServiceForm
          updateService={updateService}
          setUpdateService={setUpdateService}
          handleService={handleService}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Home;
