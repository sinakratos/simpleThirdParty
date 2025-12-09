import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { GoogleStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User, UserSchema } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [GoogleStrategy, AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
