import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@InputType()
export class updateBoughtStatus {
  @Field(() => Int)
  id: number;


  @Field(() => Int)
  userId: number;

  
}
