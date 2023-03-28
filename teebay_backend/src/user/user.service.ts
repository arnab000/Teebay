import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService  ){

  }
    
  async create(createUserInput: CreateUserInput) {
    return await this.prisma.user.create({
      data: {
        name:createUserInput.name,
        email:createUserInput.email,
        phone:createUserInput.phone,
        password:createUserInput.password,
        address:createUserInput.address
      }
    })
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({
      where :{email}
    });
  }

  findOneById(id: number) {
    return this.prisma.user.findUnique({
      where :{id},
      include:{
        productsBought:{
          include:{
            categories:true
          }
        },
        productsRentedSE:{
          include:{
            products:{
              include:{
                categories:true
              }
            }
          }
        }
      }
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
