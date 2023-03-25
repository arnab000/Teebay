import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RentSystemService } from './rent-system.service';
import { RentSystem } from './entities/rent-system.entity';
import { CreateRentSystemInput } from './dto/create-rent-system.input';
import { UpdateRentSystemInput } from './dto/update-rent-system.input';

@Resolver(() => RentSystem)
export class RentSystemResolver {
  constructor(private readonly rentSystemService: RentSystemService) {}

  @Mutation(() => RentSystem)
  createRentSystem(@Args('createRentSystemInput') createRentSystemInput: CreateRentSystemInput) {
    return this.rentSystemService.create(createRentSystemInput);
  }

  @Query(() => [RentSystem], { name: 'rentSystem' })
  findAll() {
    return this.rentSystemService.findAll();
  }

  @Query(() => RentSystem, { name: 'rentSystem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rentSystemService.findOne(id);
  }

  @Mutation(() => RentSystem)
  updateRentSystem(@Args('updateRentSystemInput') updateRentSystemInput: UpdateRentSystemInput) {
    return this.rentSystemService.update(updateRentSystemInput.id, updateRentSystemInput);
  }

  @Mutation(() => RentSystem)
  removeRentSystem(@Args('id', { type: () => Int }) id: number) {
    return this.rentSystemService.remove(id);
  }
}
