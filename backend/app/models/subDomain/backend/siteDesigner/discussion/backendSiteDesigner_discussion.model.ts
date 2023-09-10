import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendUser from '../../user/backendUser.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesigner_discussion",
})
export default class backendSiteDesigner_discussion extends Model {

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
  post: string;

  @Column({
    type: sequelize.BOOLEAN,
  })
  hasBeenEdited: boolean;


  @ForeignKey(() => backendUser)
  @Column({
    allowNull: false
  })
  userId: string;
}
