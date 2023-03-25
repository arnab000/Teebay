import { InputType, Int, Field } from '@nestjs/graphql';
import { RentSystem } from 'src/rent-system/entities/rent-system.entity';
import { Product } from '../../product/entities/product.entity';

@InputType()
export class CreateUserInput {
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

  @Field(() => [RentSystem], { nullable: true })
  productsRentedSE?: RentSystem[] | null;

  


}
