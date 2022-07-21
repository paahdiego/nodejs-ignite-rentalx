import { Specification } from "../entities/Specification";

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
}

export { ICreateSpecificationsDTO, ISpecificationsRepository };
