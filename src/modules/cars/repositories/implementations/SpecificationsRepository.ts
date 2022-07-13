import { Specification } from "../../models/Specification";
import { ICreateSpecificationsDTO, ISpecificationsRepository } from "./../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{
  
  private specifications: Specification[];

  private static INSTANCE : SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if(!SpecificationsRepository.INSTANCE){
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  
  
  create({ name, description }: ICreateSpecificationsDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);

    return specification;
  }

  findByName(name: string): Specification {
    return this.specifications.find((specification) => specification.name === name);
  }

}

export {SpecificationsRepository}