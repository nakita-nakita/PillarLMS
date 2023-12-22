import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { sameDocMenuType } from '../../../../schema/subDomain/collaborate/sameDoc/preMain/scripts/SameDoc/adaptersFromMenuAndAnswers.script';
import { SelectionTypeEnum } from '../../backend/setting/backendSettingHeader.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "clientSiteHeader",
})
export default class clientSiteHeader extends Model {

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
  userAnswersJsonB: any;

  @Column({
    type: sequelize.ENUM("BUILT_IN", "PLUGIN", "MARKET"),
  })
  selectionType: SelectionTypeEnum;
  
  @Column({
    type: sequelize.UUID
  })
  selectionId: string;
  
}
