import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "foundationSetting_password",
})
export default class foundationSetting_password extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  
  @Column({
    type: sequelize.INTEGER,
    defaultValue: 6,
  })
  passwordLength: number;

  @Column({
    type: sequelize.BOOLEAN,
  })
  shouldHaveUppercaseLetter: boolean;

  @Column({
    type: sequelize.BOOLEAN,
  })
  shouldHaveLowercaseLetter: boolean;

  @Column({
    type: sequelize.BOOLEAN,
  })
  shouldHaveNumber: boolean;

  @Column({
    type: sequelize.BOOLEAN,
  })
  shouldHaveSymbol: boolean;
}
