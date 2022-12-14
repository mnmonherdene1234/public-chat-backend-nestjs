import {
  Controller,
  Body,
  Get,
  UseGuards,
  Req,
  Patch,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { FindDto } from 'src/validations/find.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: any) {
    return this.userService.profile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-username')
  changeUsername(@Req() req: any, @Body('username') username: string) {
    return this.userService.changeUsername(req.user.id, username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(@Req() req: any, @Body('password') password: string) {
    return this.userService.changePassword(req.user.id, password);
  }

  @Get()
  findAll(@Query() readDto: FindDto) {
    return this.userService.findAll(readDto);
  }
}
