import fs from "fs";
import { parse } from "csv-parse";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../entities/Category";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];

      const parsedFile = parse();

      stream.pipe(parsedFile);

      parsedFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    const createdCategories = [];

    for await (const category of categories) {
      const categoryAlreadyExists = await this.categoryRepository.findByName(
        category.name
      );

      if (!categoryAlreadyExists) {
        const createdCategory = await this.categoryRepository.create(category);

        createdCategories.push(createdCategory);
      }
    }

    return createdCategories;
  }
}

export { ImportCategoryUseCase };
