import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Users } from 'src/database/src/entities/users.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Users => {
    const req = context.switchToHttp().getRequest();

    if (req.user as Users) return req.user;

    throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
  },
);