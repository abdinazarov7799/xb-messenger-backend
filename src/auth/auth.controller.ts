import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { Public } from "./public.decorator";

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
  @Post('refresh')
  async refresh(@Body() req: { refresh_token: string }) {
    return this.authService.refresh(req.refresh_token);
  }
}
