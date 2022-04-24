import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
