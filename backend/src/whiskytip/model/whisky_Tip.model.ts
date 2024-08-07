import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { UserSignUp } from 'src/login/model/login.model';
import { whiskyTipComment } from './whisky_Tip_Comment.model';

@Table({
  tableName: "whiskyTip",
  timestamps: true,
  paranoid: true
})
export class whiskyTip extends Model {
  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  nick_name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  category: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  tip_title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  tip_content: string;

  @Column({
    type: DataType.STRING(255)
  })
  img: string;

  @HasMany(() => whiskyTipComment, {
    sourceKey: 'id',
    foreignKey: 'tip_ID'
  })
  whiskyTipComments: whiskyTipComment[];

  @BelongsTo(() => UserSignUp, {
    foreignKey: 'nick_name',
    targetKey: 'nick_name'
  })
  user: UserSignUp;
}
