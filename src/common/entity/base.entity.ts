import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BigintValueTransformer } from './transformer/bigint-value.transformer';

export abstract class BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'bigint', transformer: new BigintValueTransformer() })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
