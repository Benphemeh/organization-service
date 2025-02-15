import { Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../base-model';
import { OrgTable } from '../base-model/table-decorator';

@OrgTable({ tableName: 'logs' })
export default class Log extends BaseModel {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  level: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  message: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  meta: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  timestamp: string;
}
