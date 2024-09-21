import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/loginAuthDto.dto';

@Injectable()
export class AuthService {
  login(loginAuthDto: LoginAuthDto) {
    if (
      loginAuthDto?.username === 'admin' &&
      loginAuthDto?.password === 'Admin2024@*'
    ) {
      return {
        success: true,
        message: 'Login successfully',
      };
    } else {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }
  }
}
