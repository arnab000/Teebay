import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { updateBoughtStatus } from './dto/update-productBuy.input';
import { UpdateRentStatus } from './dto/update-productRent.inptt';
import { RentSystem } from 'src/rent-system/entities/rent-system.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => [Product], { name: 'productsBySellerId' })
  findAllBySellerId(@Args('id',{type:() =>Int}) id:number) {
    return this.productService.findAllBySellerId(id);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }
  @Mutation(() => Product)
  updateBoughtStatus(@Args('updateBoughtStatus') updateBoughtStatus: updateBoughtStatus) {
    return this.productService.updateBoughtStatus(updateBoughtStatus.id,updateBoughtStatus.userId);
  }
  @Mutation(() => Product)
  updateRentStatus(@Args('startTime') startTime: Date,@Args('productId',{ type: () => Int }) productId: number,@Args("endTime") endTime:Date,@Args('userId',{ type: () => Int }) userId: number) {
    return this.productService.updateRentStatus(productId,startTime,endTime,userId);
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
