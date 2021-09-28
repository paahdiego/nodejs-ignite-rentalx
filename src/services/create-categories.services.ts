import { ICategoriesRepository } from "../repositories/categories.interface";
import { CategoriesRepository } from "../repositories/categories.repository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists)
      throw new Error("There is already a category created with this name.");

    const createdCategory = this.categoriesRepository.create({
      name,
      description,
    });

    return createdCategory;
  }
}

export { CreateCategoryService };
