import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  BadRequestException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { Customer } from './customer.dto';

import { CustomerService } from './customer.service';
import { log } from 'console';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('customers')
export class UserController {
  constructor(private custService: CustomerService) {
    console.log('Constructor : CustomerController');
  }

  @Get()
  @UseGuards(JwtGuard)
  getUsers(@GetUser() user: any) {
    log('User -> ', user);
    return this.custService.fetchAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'user')
  async findById(@GetUser() user: any, @Param('id', ParseIntPipe) id: number) {
    log('user -> ', user);
    if (id < 0) {
      throw new BadRequestException('id can not be negative');
    }
    const cust = await this.custService.fetchById(id);
    log('----------------', cust);
    if (!cust) {
      throw new NotFoundException('data not found');
    }
    return cust;
  }

  @Get(':id')
  async findByIdAndName(
    @Param('id', ParseIntPipe) id: number,
    @Param('name') name: String,
  ) {
    if (id < 0) {
      throw new BadRequestException('id can not be negative');
    }
    const cust = await this.custService.fetchById(id);
    log('----------------', cust);
    if (!cust) {
      throw new NotFoundException('data not found');
    }
    return cust;
  }

  @Get(':id')
  async findByNativeQuery(
    @Param('id', ParseIntPipe) id: number,
    @Param('name') name: String,
  ) {
    if (id < 0) {
      throw new BadRequestException('id can not be negative');
    }
    const cust = await this.custService.fetchById(id);
    log('----------------', cust);
    if (!cust) {
      throw new NotFoundException('data not found');
    }
    return cust;
  }

  @Post('new')
  createUser(@Body() customer: Customer) {
    console.log({ user: customer });

    return { statusCode: 500, msg: 'created successfully' };
  }
}
