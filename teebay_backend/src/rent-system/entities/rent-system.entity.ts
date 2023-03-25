import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType("RentType")
@InputType("RentInput")
export class RentSystem {
  @Field(() => Int)
  id: number;

  @Field(() => User, { nullable: true })
  renter?: User | null;

  @Field(() => Int, { nullable: true })
  renterId?: number | null;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field(() => [Product], { nullable: true })
  products?: Product[] | null;


}
