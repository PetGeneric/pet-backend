import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../admin/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/database/src/entities/users.entity';
import { Roles } from 'src/database/src/entities/roles.entity';

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

    const userRoles = await this.userService.gerUserRoles(user.id);

    const token = await this.generateJwtToken(user, userRoles);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: userRoles,
        company: user.company,
      },
      token,
    };
  }

  async validateToken(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async generateJwtToken(user: Users, userRoles: Roles[]): Promise<string> {
    return this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: userRoles,
      company: user.company,
    });
  }
}
