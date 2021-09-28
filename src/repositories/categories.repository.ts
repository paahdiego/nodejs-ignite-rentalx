import { Category } from "../models/category.model";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./categories.interface";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO) {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);

    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const found = this.categories.find((element) => element.name === name);
    return found;
  }
}

export { CategoriesRepository };
