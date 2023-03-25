import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entity';

@ObjectType("UserType")
@InputType("UserInput")

export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string | null;

  @Field({ nullable: true })
  phone?: string | null;

  @Field({ nullable: true })
  password?: string | null;

  @Field({ nullable: true })
  address?: string | null;

  @Field(() => [Product], { nullable: true })
  productsForSale?: Product[] | null;

  @Field(() => [Product], { nullable: true })
  productsBought?: Product[] | null;

  @Field(() => [Product], { nullable: true })
  productsRented?: Product[] | null;
}
