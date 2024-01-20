import { Entity, Column, Index, BeforeInsert, OneToMany, JoinColumn } from 'typeorm';
import Model from './model.entity';
import { Address } from './address.entity';

export enum GenderEnumType {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('users')
export class User extends Model {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  dob: Date

  @Column({
    type: 'enum',
    enum: GenderEnumType
  })
  gender: string;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  address: Address[];

}
