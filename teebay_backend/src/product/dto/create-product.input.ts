import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@InputType()
export class CreateProductInput {
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

  @Field(() => User, { nullable: true })
  renter?: User | null;

  @Field(() => Int, { nullable: true })
  renterId?: number | null;

  @Field(() => String, { nullable: true })
  rentType: string;

  @Field(() => [String])
  categories: string[]| null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
