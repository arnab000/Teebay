import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { RentSystem } from 'src/rent-system/entities/rent-system.entity';

@InputType()
export class UpdateRentStatus {
  @Field(() => Int)
  id?: number;

  

  @Field(() => RentSystem, { nullable: true })
  rentSystem?: RentSystem | null;

 
}
