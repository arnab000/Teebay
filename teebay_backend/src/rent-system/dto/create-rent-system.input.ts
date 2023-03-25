import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRentSystemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
