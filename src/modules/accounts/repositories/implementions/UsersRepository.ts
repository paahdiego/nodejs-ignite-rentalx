import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    id,
  }: ICreateUserDto): Promise<User> {
    const createdUser = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    });

    const savedUser = await this.repository.save(createdUser);

    return savedUser;
  }
}

export { UsersRepository };
