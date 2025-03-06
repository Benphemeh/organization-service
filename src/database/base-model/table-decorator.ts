import { Model, Table, TableOptions } from 'sequelize-typescript';

export function OrgTable<M extends Model = Model>(
  options: TableOptions<M>,
  // eslint-disable-next-line @typescript-eslint/ban-types
): Function {
  return Table({
    ...options,
    underscored: true,
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at',
  });
}
