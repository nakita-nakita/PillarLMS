import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "clientSiteLink",
})
export default class clientSiteLink extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;
  
  @Column({
    type: sequelize.STRING,
  })
  title: string;

  @Column({
    type: sequelize.STRING,
  })
  description: string;

  @Column({
    type: sequelize.STRING,
  })
  image: string;

}
