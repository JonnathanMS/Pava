import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './categorieModel';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  description!: string; // todo

  @Column
  price!: number;

  @ForeignKey(() => Category)
  @Column
  category_id!: number;

  @BelongsTo(() => Category)
  category!: Category;
}
