import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';

@Entity('address')
export class Address extends Model {
  @Column()
  streetAddress: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @ManyToOne(() => User, (user) => user.address)
  user: User;
}
