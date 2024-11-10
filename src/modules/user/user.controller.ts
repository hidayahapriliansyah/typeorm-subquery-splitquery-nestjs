import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly userService: UserService) { }

  @Get('subquery')
  async getUserLastChatUseSubquery() {
    const result = await this.userService.getUserWithLastChatSubquery();

    return {
      success: true,
      data: result,
    };
  }

  @Get('splitquery')
  async getUserLastChatUseSplitQuery() {
    const result = await this.userService.getUserWithLastChatSplitQuery();

    return {
      success: true,
      data: result,
    };
  }
}
