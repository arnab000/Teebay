import { Module } from '@nestjs/common';
import { RentSystemService } from './rent-system.service';
import { RentSystemResolver } from './rent-system.resolver';

@Module({
  providers: [RentSystemResolver, RentSystemService]
})
export class RentSystemModule {}
