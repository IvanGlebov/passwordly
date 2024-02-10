import { Service } from "../passwords/services/saveNewService";

type TransformPairsToServicesProps = Array<{ key: string; content: string }>;
type TransformPairsToServices = (props: TransformPairsToServicesProps) => Omit<Service, "password">[];

const transformPairsToServices: TransformPairsToServices = (pairs) =>
  pairs.map((pair) => {
    const data = JSON.parse(pair.content);
    return { name: pair.key, description: data.description, otherAttributes: data.otherAttributes };
  });
export default transformPairsToServices;
