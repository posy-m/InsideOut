
import { Column, DataType, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "userDB",
    timestamps: true,
    paranoid: false
})
export class UserSignUp extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    })
    id:number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    uid: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    upw: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nick_name:string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isAdmin:boolean

    // @HasMany(() => Q&A, () => wiskey_info, () => wiskey_tip, () => Q&A_comment, () => Q&A_com_comment, () => tip_comment, () => tip_com_comment)
    // userDB : userDB[]
}