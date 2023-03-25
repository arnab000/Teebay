import { Injectable } from '@nestjs/common';
import { CreateRentSystemInput } from './dto/create-rent-system.input';
import { UpdateRentSystemInput } from './dto/update-rent-system.input';

@Injectable()
export class RentSystemService {
  create(createRentSystemInput: CreateRentSystemInput) {
    return 'This action adds a new rentSystem';
  }

  findAll() {
    return `This action returns all rentSystem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rentSystem`;
  }

  update(id: number, updateRentSystemInput: UpdateRentSystemInput) {
    return `This action updates a #${id} rentSystem`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentSystem`;
  }
}
