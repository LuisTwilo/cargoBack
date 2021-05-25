import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { User } from '../model/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    return await this.userService.createUser(user);
  }

  @Get()
  async findAll(@Res() res) {
    try {
      res.send(await this.userService.findAll());
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      res.send(await this.userService.findOne(id));
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: User, @Res() res) {
    try {
      res.send(await this.userService.update(id, user));
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
