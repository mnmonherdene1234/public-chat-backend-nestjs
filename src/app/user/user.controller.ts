import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { FindDto } from 'src/validations/find.dto';

@UseInterceptors(LogInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signup')
  signUp(@Body() signUpDto: UserDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: UserDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: any) {
    return this.userService.profile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change_username')
  changeUsername(@Req() req: any, @Body('username') username: string) {
    return this.userService.changeUsername(req.user.id, username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change_password')
  changePassword(@Req() req: any, @Body('password') password: string) {
    return this.userService.changePassword(req.user.id, password);
  }

  @Get()
  findAll(@Query() readDto: FindDto) {
    return this.userService.findAll(readDto);
  }
}