import { Controller, Post, Body, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { Public } from "./public.decorator";
import { RegisterDto } from "./dto/register.dto";
import { AuthGuard } from "./auth.guard";
import { Request as ExpressRequest } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() req: LoginDto) {
    const user = await this.authService.validateUser(req.username, req.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() req: { refresh_token: string }) {
    return this.authService.refresh(req.refresh_token);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async getMe(@Request() req: ExpressRequest) {
    return this.authService.getMe(req.user);
  }
}
