import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    const createdSpecification = await createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(createdSpecification);
  }
}

export { CreateSpecificationController };
