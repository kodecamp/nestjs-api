import { IsNumber, IsEmail, IsNotEmpty, Max } from 'class-validator';

export class Customer {
  constructor(id: number, name: String, address: String) {}

  @IsNumber()
  @Max(500)
  id: number;

  name: String;

  address: String;
}
