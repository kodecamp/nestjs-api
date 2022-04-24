import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

  async fetchAllUsers() {
    return this.prismaService.customer.findMany();
  }

  async fetchById(id: number) {
    return this.prismaService.customer.findUnique({
      where: {
        id: id,
      },
    });
  }

  async fetchByIdAndName(id: number, name: string) {
    return this.prismaService.customer.findMany({
      where: {
        id: id,
        name: name,
      },
    });
  }

  async fetchByNativeQuery(id: number, name: string) {
    return this.prismaService.customer.findMany({
      where: {
        id: id,
        name: name,
      },
    });
  }
}
