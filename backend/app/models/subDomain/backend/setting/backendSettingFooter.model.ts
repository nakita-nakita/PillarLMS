import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSettingFooter",
})
export default class backendSettingFooter extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  // GUI
  @Column({
    type: sequelize.STRING,
  })
  webAssetImport: string;

  @Column({
    type: sequelize.JSONB,
  })
  menuJsonB: string;

  @Column({
    type: sequelize.JSONB,
  })
  userAnswersJsonB: string;

  @Column({
    type: sequelize.BOOLEAN,
  })
  isReady: boolean;
}
