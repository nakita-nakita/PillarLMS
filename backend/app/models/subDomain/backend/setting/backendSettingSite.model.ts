import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSettingSite",
})
export default class backendSettingSite extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  
  @Column({
    type: sequelize.STRING,
  })
  favicon: string;

  @Column({
    type: sequelize.STRING,
  })
  tab: string;

  @Column({
    type: sequelize.BOOLEAN,
  })
  isReady: boolean;

}

