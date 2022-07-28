import { inject, injectable } from "tsyringe";
import { ICreateUserDto } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";

interface IResponse {
  name: string;
  email: string;
  created_at: Date;
  driver_license: string;
  id: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDto): Promise<IResponse> {
    const passwordhash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordhash,
      driver_license,
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      created_at: createdUser.created_at,
      driver_license: createdUser.driver_license,
    };
  }
}

export { CreateUserUseCase };
