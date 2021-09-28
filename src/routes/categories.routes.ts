import { Router } from "express";
import { Category } from "../models/category.model";
import { CategoriesRepository } from "../repositories/categories.repository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists)
    return response
      .status(400)
      .json({ error: "There is already a category created with this name." });

  const createdCategory = categoriesRepository.create({ name, description });

  return response.status(201).json(createdCategory);
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

export { categoriesRoutes };
