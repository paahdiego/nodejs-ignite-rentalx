import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase";
import { Request, Response } from "express";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const user_id = request.user.id;

    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const user = await updateUserAvatarUseCase.execute({
      user_id: user_id,
      avatar_file: avatar_file,
    });

    console.log(user);

    return response.status(200).json(user);
  }
}

export { UpdateUserAvatarController };
