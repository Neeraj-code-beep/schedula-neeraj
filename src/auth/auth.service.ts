import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const users: User[] = [];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(body: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    const existingUser = users.find((user) => user.email === body.email);

    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user: User = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role,
    };

    users.push(user);

    return {
      message: 'User Registered Successfully',
    };
  }

  async login(body: { email: string; password: string }) {
    const user: User | undefined = users.find((u) => u.email === body.email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      access_token: token,
      role: user.role,
    };
  }
}
