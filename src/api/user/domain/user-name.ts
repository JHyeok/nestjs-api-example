import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserName {
  @Expose()
  private firstName: string;

  @Expose()
  private lastName: string;
}
