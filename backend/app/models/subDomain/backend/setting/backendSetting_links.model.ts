import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSetting_links",
})
export default class backendSetting_links extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  
  @Column({
    type: sequelize.STRING,
  })
  donationLink: string;

  @Column({
    type: sequelize.STRING,
  })
  virtualServicesLink: string;

  @Column({
    type: sequelize.BOOLEAN,
  })
  defaultMetaPicture: boolean;

  @Column({
    type: sequelize.BOOLEAN,
  })
  defaultMetaTitle: boolean;

  @Column({
    type: sequelize.BOOLEAN,
  })
  defaultMetaDescription: boolean;
}
