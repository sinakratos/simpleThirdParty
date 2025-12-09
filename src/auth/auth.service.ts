import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async googleLogin(googleUser: any) {
    const user = await this.userService.findOrCreate(googleUser);

    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }
}
