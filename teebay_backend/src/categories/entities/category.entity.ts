import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entity';

@ObjectType("categoryType")
@InputType("categoryInput")
export class Category {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Product])
  products: Product[];
}