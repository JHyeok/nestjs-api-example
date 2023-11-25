import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserName {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
