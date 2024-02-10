import { Service } from "../saveNewService";

export type ServiceEntry = {
  name: string;
  content: string;
};

type CreateService = (props: Service) => ServiceEntry;
const createService: CreateService = (service) => {
  const content = {
    password: service.password,
    description: service.description,
    otherAttributes: service.otherAttributes,
  };
  return { name: service.name, content: JSON.stringify(content) };
};

export default createService;
