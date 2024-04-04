import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../admin/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";

@Module({
  imports: [UsersModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants,
    signOptions: { expiresIn: '1d' }
  })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
