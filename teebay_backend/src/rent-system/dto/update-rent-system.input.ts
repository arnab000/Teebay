import { CreateRentSystemInput } from './create-rent-system.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRentSystemInput extends PartialType(CreateRentSystemInput) {
  @Field(() => Int)
  id: number;
}
