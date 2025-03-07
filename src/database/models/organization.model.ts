import { Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../base-model';
import { OrgTable } from '../base-model/table-decorator';

@OrgTable({ tableName: 'organization' })
export default class Organization extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  industry: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;
}
