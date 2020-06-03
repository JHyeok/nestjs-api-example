import { Injectable } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface'

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  create(dog: Dog) {
    this.dogs.push(dog);
  }

  findAll(): Dog[] {
    return this.dogs;
  }
}
