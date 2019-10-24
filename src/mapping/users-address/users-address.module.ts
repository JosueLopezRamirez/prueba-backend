import { Module } from '@nestjs/common';
import { UsersAddressService } from './users-address.service';

@Module({
  providers: [UsersAddressService]
})
export class UsersAddressModule {}
