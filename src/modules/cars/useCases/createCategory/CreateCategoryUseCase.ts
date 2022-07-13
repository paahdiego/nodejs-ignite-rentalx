import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists)
      throw new Error("There is already a category created with this name.");

    return this.categoriesRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
