import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@ObjectType("ProductType")
@InputType("ProductInput")

export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string | null;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  rent: number;

  @Field(() => User, { nullable: true })
  seller?: User | null;

  @Field(() => Int, { nullable: true })
  sellerId?: number | null;

  @Field(() => User, { nullable: true })
  buyer?: User | null;

  @Field(() => Int, { nullable: true })
  buyerId?: number | null;

  @Field(() => [User], { nullable: true })
  renter?: User[] | null;
  
  @Field(() => [User], { nullable: true })
  renterS?: User[] | null;

  @Field(() => Boolean, { nullable: true })
  sold?: boolean | null;



  @Field(() => String, { nullable: true })
  rentType: string;

  @Field(() => [Category])
  categories: Category[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
