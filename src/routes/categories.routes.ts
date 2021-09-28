import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const category = {
    id: uuidv4(),
    name,
    description,
  };

  categories.push(category);

  const index = categories.findIndex((element) => element.name === name);

  return response.status(201).json(categories[index]);
});

export { categoriesRoutes };
