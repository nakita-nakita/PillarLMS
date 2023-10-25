import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSettingColors",
})
export default class backendSettingColors extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;


  /////////////////////////////////////////////////////////////////////////
  // color 1
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color1: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color1Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color1Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color1Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color1Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color1Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color1Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color1Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color1Dark4: string;





  /////////////////////////////////////////////////////////////////////////
  // color 2
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color2: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color2Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color2Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color2Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color2Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color2Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color2Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color2Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color2Dark4: string;













  /////////////////////////////////////////////////////////////////////////
  // color 3
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color3: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color3Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color3Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color3Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color3Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color3Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color3Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color3Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color3Dark4: string;














  /////////////////////////////////////////////////////////////////////////
  // color 4
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color4: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color4Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color4Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color4Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color4Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color4Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color4Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color4Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color4Dark4: string;
















  /////////////////////////////////////////////////////////////////////////
  // color 5
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color5: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color5Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color5Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color5Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color5Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color5Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color5Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color5Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color5Dark4: string;


























  /////////////////////////////////////////////////////////////////////////
  // color 6
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color6: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color6Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color6Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color6Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color6Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color6Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color6Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color6Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color6Dark4: string;
















  /////////////////////////////////////////////////////////////////////////
  // color 7
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color7: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color7Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color7Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color7Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color7Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color7Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color7Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color7Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color7Dark4: string;













  /////////////////////////////////////////////////////////////////////////
  // color 8
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color8: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color8Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color8Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color8Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color8Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color8Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color8Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color8Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color8Dark4: string;













  /////////////////////////////////////////////////////////////////////////
  // color 9
  // =====================================================================

  // main
  @Column({
    type: sequelize.STRING,
  })
  color9: string;

  // light
  @Column({
    type: sequelize.STRING,
  })
  color9Light1: string;

  @Column({
    type: sequelize.STRING,
  })
  color9Light2: string;

  @Column({
    type: sequelize.STRING,
  })
  color9Light3: string;

  @Column({
    type: sequelize.STRING,
  })
  color9Light4: string;

  // dark
  @Column({
    type: sequelize.STRING,
  })
  color9Dark1: string;

  @Column({
    type: sequelize.STRING,
  })
  color9Dark2: string;

  @Column({
    type: sequelize.STRING,
  })
  color9Dark3: string;

  @Column({
    type: sequelize.STRING,
  })
  color9Dark4: string;


  @Column({
    type: sequelize.BOOLEAN,
  })
  isReady: boolean;
}
