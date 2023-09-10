import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSetting_colors",
})
export default class backendSetting_colors extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.STRING,
  })
  color1: string;

  @Column({
    type: sequelize.STRING,
  })
  color2: string;

  @Column({
    type: sequelize.STRING,
  })
  color3: string;

  @Column({
    type: sequelize.STRING,
  })
  color4: string;

  //Approved user Password
  @Column({
    type: sequelize.STRING,
  })
  color5: string;

  @Column({
    type: sequelize.STRING,
  })
  lightBackgroundColor: string;

  @Column({
    type: sequelize.STRING,
  })
  lightTextColor: string;

  @Column({
    type: sequelize.STRING,
  })
  darkBackgroundColor: string;

  @Column({
    type: sequelize.STRING,
  })
  darkTextColor: string;

}
