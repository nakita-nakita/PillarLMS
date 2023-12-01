import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { sameDocMenuType } from '../../../../schema/subDomain/collaborate/sameDoc/preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script';

export enum SelectionTypeEnum {
  BUILT_IN = "BUILT_IN",
  PLUGIN = "PLUGIN",
  MARKET = "MARKET"
}

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSettingHeader",
})
export default class backendSettingHeader extends Model {

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
  menuJsonB: sameDocMenuType;

  @Column({
    type: sequelize.JSONB,
  })
  userAnswersJsonB: any;

  @Column({
    type: sequelize.BOOLEAN,
  })
  isReady: boolean;

  @Column({
    type: sequelize.ENUM("BUILT_IN", "PLUGIN", "MARKET"),
  })
  selectionType: SelectionTypeEnum;
  
  @Column({
    type: sequelize.UUID
  })
  selectionId: string;
  
}
