import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/database/src/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();

    console.log('quem vem na req?', req.user)

    if (req.user as User) return req.user;

    throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
  },
);