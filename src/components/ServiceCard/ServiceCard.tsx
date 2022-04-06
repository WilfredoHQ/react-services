import { FC } from "react";
import { ServiceData } from "../../pages/Home/Home";

interface ServiceCardProps {
  service: ServiceData;
  setUpdateService: (service: ServiceData) => void;
  deleteService: (id: number) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({
  service,
  setUpdateService,
  deleteService,
}) => {
  return (
    <article className="grid grid-rows-1 border border-gray-300 rounded overflow-hidden">
      <div className="p-4">
        <header>
          <h3 className="font-semibold">{service.name}</h3>
        </header>
        <p>{service.description}</p>
      </div>
      <footer className="p-4 bg-gray-50">
        <button
          onClick={() => setUpdateService(service)}
          className="text-blue-500 mr-4"
        >
          Editar
        </button>
        <button
          onClick={() => deleteService(service.id)}
          className="text-blue-500"
        >
          Eliminar
        </button>
      </footer>
    </article>
  );
};
export default ServiceCard;
