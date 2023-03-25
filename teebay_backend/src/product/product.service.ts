import { Injectable } from '@nestjs/common';
import { RentSystem } from '@prisma/client';
import { create } from 'domain';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {

  }

  async create(createProductInput: CreateProductInput) {

    return await this.prisma.product.create({
      data: {
        title: createProductInput.title,
        description: createProductInput.description,
        price: createProductInput.price,
        rent: createProductInput.rent,
        seller: {
          connect: {
            id: createProductInput.sellerId
          }
        },
        rentType: createProductInput.rentType,

        categories: {
          connect:
            createProductInput.categories.map(categoryId => ({ id: categoryId }))
        }
      }
    });
  }

  findAll() {
    return this.prisma.product.findMany(
      {
        include: {
          categories: true,
          seller: true// Return all fields
        },
      }
    );
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id }, include: {
        categories: true,
        seller: true // Return all fields
      }
    });
  }

  findAllBySellerId(id: number) {
    return this.prisma.product.findMany({
      where: {
        sellerId: id
      },
      include: {
        categories: true,
        // Return all fields
      }

    })
  }

  updateBoughtStatus(id: number, userId: number) {
    return this.prisma.product.update(
      {
        where: { id },
        data: {
          sold: true,
          buyer: {
            connect: {
              id: userId
            }
          }
        }
      })
  }
  updateRentStatus(id: number, startTime:Date,endTime:Date,userId:number) {
    return this.prisma.product.update(
      {
        where: { id },
        data: {
           renterS:{
            connectOrCreate:{
              where :{
                id:123456
              },
              create:{
                
                startTime:startTime,
                endTime:endTime,
                renter:{
                  connect:{
                    id:userId
                  }
                }



              }
            }

           }
        
      }
      })
}


update(id: number, updateProductInput: UpdateProductInput) {
  return this.prisma.product.update(
    {
      where: { id },
      data: {
        title: updateProductInput.title,
        description: updateProductInput.description,
        price: updateProductInput.price,
        rent: updateProductInput.rent,
        rentType: updateProductInput.rentType,

        categories: {
          set: [],
          connect:
            updateProductInput.categories.map(categoryId => ({ id: categoryId }))
        }
      }
    }
  )
}

remove(id: number) {
  return this.prisma.product.delete({
    where: { id }

  });
}
}
