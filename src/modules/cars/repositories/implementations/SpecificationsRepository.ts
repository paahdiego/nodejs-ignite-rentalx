import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "./../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationsDTO) {
    const specification = this.repository.create({
      name: name,
      description: description,
    });

    return this.repository.save(specification);
  }

  async findByName(name: string) {
    return this.repository.findOne({ name });
  }
}

export { SpecificationsRepository };
