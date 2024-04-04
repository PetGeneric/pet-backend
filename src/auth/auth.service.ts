import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../admin/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findByEmail(createAuthDto.email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Senha inválida');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.roles,
      company: user.company,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.roles,
        company: user.companyId,
      },
      token,
    };
  }
}
