import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSetting_church",
})
export default class backendSetting_church extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.STRING,
  })
  logo: string;

  @Column({
    type: sequelize.STRING,
  })
  streetAddress: string;

  @Column({
    type: sequelize.STRING,
  })
  suiteNumber: string;

  @Column({
    type: sequelize.STRING,
  })
  zipCode: string;

  @Column({
    type: sequelize.STRING,
  })
  city: string;

  @Column({
    type: sequelize.STRING,
  })
  state: string;

  @Column({
    type: sequelize.STRING,
  })
  socialTwitter: string;

  @Column({
    type: sequelize.STRING,
  })
  socialFacebook: string;

  @Column({
    type: sequelize.STRING,
  })
  socialInstagram: string;

  @Column({
    type: sequelize.STRING,
  })
  socialWhatsapp: string;

  @Column({
    type: sequelize.STRING,
  })
  socialTelegram: string;

}
