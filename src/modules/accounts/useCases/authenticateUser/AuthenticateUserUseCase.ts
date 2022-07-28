import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const passwordIsCorrect = compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const token = sign({}, "ff8202ecd5b13438450d277b374d917a", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: { name: user.name, email: user.email },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
